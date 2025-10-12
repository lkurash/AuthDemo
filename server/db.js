import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongodb;

export async function connectToDatabase() {
  const useInMemory = process.env.USE_IN_MEMORY_DB === 'true' || process.env.NODE_ENV === 'test';
  const envUri = process.env.MONGODB_URI;

  const defaultLocalUri = 'mongodb://127.0.0.1:27017/mydatabase';
  const uri = envUri || defaultLocalUri;

  try {
    if (useInMemory) {
      mongodb = await MongoMemoryServer.create();
      const memUri = mongodb.getUri();
      await mongoose.connect(memUri);
      console.log('Connected to in-memory MongoDB');
      return;
    }

    await mongoose.connect(uri);
    console.log(`Connected to MongoDB at ${uri}`);
  } catch (error) {
    console.error('Error connecting to database', error);
    throw error;
  }
}

export async function disconnectFromDatabase() {
  try {
    if (mongodb) {
      await mongoose.connection.dropDatabase();
      await mongoose.connection.close();
      await mongodb.stop();
      mongodb = undefined;
    } else if (mongoose.connection.readyState) {
      await mongoose.disconnect();
    }
    console.log('Disconnected from database');
  } catch (e) {
    console.error('Error during DB disconnect', e);
  }
}

export async function clearCollections() {
  const collections = mongoose.connection.collections;

  if (process.env.NODE_ENV !== 'test') {
    throw new Error('clearCollections can only be used in test environment');
  }

  for (const key of Object.keys(collections)) {
    const collection = collections[key];
    await collection.deleteMany();
  }
}
