import UserService from '../services/userService.js';

export const getUser = async (req, res) => {
  const userService = new UserService();
  const { sub } = req.user || {};
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

  if (result.isError) {
    const { error, message } = result;
    return res.status(error).json({ message });
  }

  return res.status(404).json({ message: 'User not found' });
};
