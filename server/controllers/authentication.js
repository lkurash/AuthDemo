import { getAuthCookieOptions } from '../helpers/cookies.js';
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
    const { error, message } = result;
    return res.status(error).json({ message });
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
    const { error, message } = result;
    return res.status(error).json({ message });
  }

  return res.status(500).json({ message: 'Internal server error' });
};

export const logout = (req, res) => {
  res.clearCookie('accessToken');
  return res.json({ message: 'Logged out successfully' });
};
