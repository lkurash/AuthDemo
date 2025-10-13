import { getAuthCookieOptions } from '../helpers/cookies.js';
import { EmailInUseError, InvalidCredentialsError, UserNotFoundError } from '../services/errors.js';
import UserService from '../services/userService.js';

export const login = async (req, res) => {
  const userService = new UserService();
  const { email, password } = req.body;

  const result = await userService.login({ email, password });

  if (result.isSuccess) {
    res.cookie('accessToken', result.token, getAuthCookieOptions());
    return res.json({ email: result.user.email });
  }

  if (result.isError) {
    const { error } = result;
    if (error instanceof UserNotFoundError) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (error instanceof InvalidCredentialsError) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  }

  return res.status(500).json({ message: 'Internal server error' });
};

export const register = async (req, res) => {
  const userService = new UserService();
  const { username, password, email } = req.body;

  const result = await userService.register({ username, password, email });
  if (result.isSuccess) {
    res.cookie('accessToken', result.token, getAuthCookieOptions());
    return res.status(201).json({ email: result.user.email });
  }

  if (result.isError) {
    const { error } = result;
    if (error instanceof EmailInUseError) {
      return res.status(409).json({ message: 'Email already in use' });
    }
  }

  return res.status(500).json({ message: 'Internal server error' });
};

export const logout = (req, res) => {
  res.clearCookie('accessToken');
  return res.json({ message: 'Logged out successfully' });
};
