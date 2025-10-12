import express from 'express';
import rateLimit from 'express-rate-limit';
import { login, register, logout } from '../controllers/auth.js';
import { validateLoginInput, validateRegisterInput } from '../helpers/auth.js';

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/login', loginLimiter, validateLoginInput, login);

router.post('/register', validateRegisterInput, register);

router.post('/logout', logout);

export default router;
