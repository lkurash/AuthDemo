import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectToDatabase, disconnectFromDatabase } from './db.js';

const app = express();
const PORT = 3000;

import router from './routes/index.js';

app.use(express.json());
app.use(cors());
app.use(cookieParser());

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
