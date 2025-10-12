import express from 'express';
import jwt from 'jsonwebtoken';
import { getMe } from '../controllers/users.js';

const router = express.Router();

function isAuth(req, res, next) {
  const token = req.cookies?.accessToken;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

router.get('/', isAuth, (req, res) => {
  res.json({ message: 'User list' });
});

router.get('/me', isAuth, getMe);

export default router;
