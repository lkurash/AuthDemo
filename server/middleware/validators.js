export const isValidEmail = (email) =>
  typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isValidPassword = (password) =>
  typeof password === 'string' &&
  password.trim().length >= 6 &&
  /[A-Za-z]/.test(password) &&
  /\d/.test(password);

export const isValidUsername = (username) =>
  typeof username === 'string' && username.trim().length > 0;

export const validateLoginInput = (req, res, next) => {
  const { email, password } = req.body;

  if (!isValidEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  if (!isValidPassword(password)) {
    return res.status(400).json({ message: 'Invalid password' });
  }

  next();
};

export const validateRegisterInput = (req, res, next) => {
  const { email, password, username } = req.body;
  if (!isValidUsername(username)) {
    return res.status(400).json({ message: 'Invalid username' });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }
  if (!isValidPassword(password)) {
    return res.status(400).json({ message: 'Invalid password' });
  }
  next();
};
