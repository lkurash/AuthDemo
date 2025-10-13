import loadConfig from '../config/index.js';

export function getAuthCookieOptions() {
  const cfg = loadConfig();
  return {
    httpOnly: true,
    sameSite: cfg.cookies.sameSite,
    secure: cfg.cookies.secure,
    maxAge: 30 * 60 * 1000,
  };
}
