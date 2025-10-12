import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signToken = (user) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not set');
  }
  const expiresIn = process.env.JWT_EXPIRES_IN || '30m';
  return jwt.sign({ sub: String(user._id), email: user.email }, secret, { expiresIn });
};

export const passwordCompare = (password, hash) => bcrypt.compare(password, hash);

export const hashPassword = (password, saltRounds = 10) => bcrypt.hash(password, saltRounds);

export const isValidEmail = (email) =>
  typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isValidPassword = (password) =>
  typeof password === 'string' &&
  password.trim().length >= 6 &&
  /[A-Za-z]/.test(password) &&
  /\d/.test(password);

export const validateInput = (req, res, next) => {
  const { email, password } = req.body;

  if (!isValidEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  if (!isValidPassword(password)) {
    return res.status(400).json({ message: 'Invalid password' });
  }

  next();
};
