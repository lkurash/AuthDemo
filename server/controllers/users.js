import { AuthenticatedError } from '../services/errors.js';
import UserService from '../services/userService.js';

export const getUser = async (req, res) => {
  const userService = new UserService();
  const { sub } = req.user || {};
  try {
    const result = await userService.getUserById(sub);
    if (result.isSuccess) {
      const { user } = result;
      return res.json({
        id: String(user._id),
        email: user.email,
        username: user.username,
        createdAt: user.createdAt,
      });
    }

    if (result.isError && result.error instanceof AuthenticatedError) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    return res.status(404).json({ message: 'User not found' });
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Internal server error' });
  }
};
