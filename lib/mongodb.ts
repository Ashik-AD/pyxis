import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Missing/invalid environment variable: MONGODB_URI');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let mongoClientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  if (!global?._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  mongoClientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  mongoClientPromise = client.connect();
}

export default mongoClientPromise;
