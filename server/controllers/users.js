import User from '../models/user.js';

export const getMe = async (req, res) => {
  try {
    const { sub } = req.user || {};
    if (!sub) return res.status(401).json({ message: 'Unauthorized' });

    const user = await User.findById(sub).lean();
    if (!user) return res.status(404).json({ message: 'User not found' });

    return res.json({
      id: String(user._id),
      email: user.email,
      username: user.username,
      createdAt: user.createdAt,
    });
  } catch (err) {
    console.error('getMe error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
