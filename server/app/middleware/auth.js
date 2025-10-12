import jwt from 'jsonwebtoken';

export function isAuth() {
  return (req, res, next) => {
    const token = req.cookies?.accessToken;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    try {
      req.user = jwt.verify(token, process.env.JWT_SECRET);
      next();
    } catch {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  };
}
