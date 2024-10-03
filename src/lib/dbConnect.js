import mongoose from 'mongoose';

const DB_URI = process.env.DB_URI;

if (!DB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// if the connection fails, try 127.0.0.1 instead oflocalhost below
const uri = process.env.DB_URI;

async function connectToDatabase() {
  // Connect to MongoDB
  mongoose.connect(uri)
    .then(() => console.log('MongoDB Connected'))
    .catch(error => console.log('MongoDB Error:' + error.message));
  // Get the default connection
  const db = mongoose.connection;
  // Bind connection to error event (to get notification ofconnection errors)
  db.on("error", console.error.bind(console, "MongoDBconnection error:"));
}
/*let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = await mongoose.connect(DB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}*/

export default connectToDatabase;
