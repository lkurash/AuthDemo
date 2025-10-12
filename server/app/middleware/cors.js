import cors from 'cors';

export function corsMiddleware(config) {
  return cors({ origin: config.cors.origins, credentials: config.cors.credentials });
}
