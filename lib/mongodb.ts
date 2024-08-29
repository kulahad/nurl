import { MongoClient } from "mongodb";

const getDbUri = (): string => {
  if (!process.env.MONGODB_URI && process.env.NODE_ENV === "production") {
    console.warn('Invalid/Missing environment variable: "MONGODB_URI"');
  }

  return process.env.MONGODB_URI
    ? process.env.MONGODB_URI
    : "mongodb://localhost:27017";
};

let client: MongoClient;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClient?: MongoClient;
  };

  if (!globalWithMongo._mongoClient) {
    globalWithMongo._mongoClient = new MongoClient(getDbUri());
  }
  client = globalWithMongo._mongoClient;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(getDbUri());
}

// Export a module-scoped MongoClient. By doing this in a
// separate module, the client can be shared across functions.

export default client;
