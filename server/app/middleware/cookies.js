import cookieParser from 'cookie-parser';

export function cookiesMiddleware() {
  return cookieParser();
}
