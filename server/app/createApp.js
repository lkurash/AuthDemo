import express from 'express';
import { securityMiddleware } from './middleware/security.js';
import { corsMiddleware } from './middleware/cors.js';
import { cookiesMiddleware } from './middleware/cookies.js';
import { csrfProtectionMiddleware, exposeCsrfTokenMiddleware } from './middleware/csrf.js';
import { errorHandler } from './middleware/errors.js';
import router from '../routes/index.js';

export default function createApp(config) {
  const app = express();
  app.use(express.json());
  app.use(securityMiddleware());
  app.use(corsMiddleware(config));
  app.use(cookiesMiddleware());
  app.use(csrfProtectionMiddleware(config));
  app.use(exposeCsrfTokenMiddleware(config));
  app.use('/api', router);
  app.use(errorHandler());
  return app;
}
