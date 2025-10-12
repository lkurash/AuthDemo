import 'dotenv/config';
import { connectToDatabase, disconnectFromDatabase } from './db.js';
import loadConfig from './config/index.js';
import createApp from './app/createApp.js';

const config = loadConfig();
await connectToDatabase();
const app = createApp(config);

async function startServer(port) {
  const server = app.listen(port, () => {
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

  process.on('SIGINT', async () => {
    await disconnectFromDatabase();
    server.close(() => process.exit());
  });
}

startServer(config.port);
