import express from 'express';
import rateLimit from 'express-rate-limit';
import { validateInput } from '../helpers/auth.js';
import { login, register, logout } from '../controllers/auth.js';

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/login', loginLimiter, validateInput, login);

router.post('/register', validateInput, register);

router.post('/logout', logout);

export default router;
