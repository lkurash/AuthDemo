import helmet from 'helmet';

export function securityMiddleware() {
  return helmet();
}
