import csurf from 'csurf';

export function csrfProtectionMiddleware(config) {
  return csurf({
    cookie: {
      httpOnly: true,
      sameSite: config.csrf.sameSite,
      secure: config.csrf.secure,
    },
  });
}

export function exposeCsrfTokenMiddleware(config) {
  return (req, res, next) => {
    const safe = /^(GET|HEAD|OPTIONS)$/i.test(req.method);
    if (safe) {
      try {
        res.cookie(config.csrf.cookieName, req.csrfToken(), {
          httpOnly: false,
          sameSite: config.csrf.sameSite,
          secure: config.csrf.secure,
        });
      } catch {
        /* noop */
      }
    }
    next();
  };
}
