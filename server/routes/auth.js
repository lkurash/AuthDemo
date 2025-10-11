import express from 'express';
import rateLimit from 'express-rate-limit';
import User from '../models/user.js';
import { signToken, passwordCompare, validateInput, hashPassword } from '../helpers/auth.js';

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/login', loginLimiter, validateInput, async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).lean();
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const passwordMatch = await passwordCompare(password, user.passwordHash);
  if (!passwordMatch) return res.status(401).json({ message: 'Invalid credentials' });

  const token = signToken(user);

  res.cookie('accessToken', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 30 * 60 * 1000,
  });
  res.json({ email: user.email });
});

router.post('/register', validateInput, async (req, res) => {
  const { username, password, email } = req.body;

  const existingUser = await User.findOne({ email }).lean();
  if (existingUser) return res.status(409).json({ message: 'Email already in use' });

  const passwordHash = await hashPassword(password, 10);
  const user = await User.create({ username, email, passwordHash });

  const token = signToken(user);

  res.cookie('accessToken', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 30 * 60 * 1000,
  });
  res.status(201).json({ email: user.email });
});

router.post('/logout', (req, res) => {
  res.clearCookie('accessToken');
  res.json({ message: 'Logged out successfully' });
});

export default router;
