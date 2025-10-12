import { beforeAll, afterAll, beforeEach } from 'vitest';
import { connectToDatabase, disconnectFromDatabase, clearCollections } from '../db.js';
import loadConfig from '../config/index.js';
import createApp from '../app/createApp.js';

export let app;

beforeAll(async () => {
  process.env.NODE_ENV = 'test';
  process.env.JWT_SECRET = 'test-secret';
  await connectToDatabase();
  const config = loadConfig();
  app = createApp(config);
});

beforeEach(async () => {
  await clearCollections();
});

afterAll(async () => {
  await disconnectFromDatabase();
});
