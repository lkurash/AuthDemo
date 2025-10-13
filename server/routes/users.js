import express from 'express';
import { getUser } from '../controllers/users.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

function isAuthenticated(req, res, next) {
  const token = req.cookies?.accessToken;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

router.get('/me', isAuthenticated, getUser);

export default router;
