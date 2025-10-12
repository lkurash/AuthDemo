export function errorHandler() {
  // Express 5 error handler signature
  // eslint-disable-next-line no-unused-vars
  return (err, req, res, next) => {
    if (err && err.code === 'EBADCSRFTOKEN') {
      return res.status(403).json({ message: 'Invalid CSRF token' });
    }
    return res.status(500).json({ message: 'Internal server error' });
  };
}
