import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import csurf from 'csurf';
import { connectToDatabase, disconnectFromDatabase } from './db.js';

const app = express();
const PORT = 4000;

import router from './routes/index.js';

app.use(express.json());
app.use(helmet());
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:3001',
    ],
    credentials: true,
  }),
);
app.use(cookieParser());

const csrfProtection = csurf({
  cookie: {
    httpOnly: false,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  },
});

app.use(csrfProtection);

app.use((req, res, next) => {
  const safeMethod = /^(GET|HEAD|OPTIONS)$/i.test(req.method);
  if (safeMethod) {
    try {
      res.cookie('XSRF-TOKEN', req.csrfToken(), {
        httpOnly: false,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      });
    } catch {
      // ignore
    }
  }
  next();
});

app.use('/api', router);
await connectToDatabase();

async function startServer(port) {
  const server = app.listen(port, async () => {
    console.log(`Server running on port http://localhost:${port}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} is in use, trying port ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error(err);
      process.exit(1);
    }
  });
}

process.on('SIGINT', async () => {
  await disconnectFromDatabase();
  process.exit();
});

startServer(PORT);

app.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    return res.status(403).json({ message: 'Invalid CSRF token' });
  }
  return res.status(500).json({ message: 'Internal server error' });
});
