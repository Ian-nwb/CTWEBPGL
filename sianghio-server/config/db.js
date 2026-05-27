/**
 * Name: db.js
 * Purpose: Configures the MongoDB connection with serverless-safe caching.
 * Dependencies: mongoose
 * Author: Ian
 * Location: server/config/db.js
 * Created: 2026-05-15
 * Last Updated: 2026-05-27
 */

const mongoose = require('mongoose');
const dns = require('dns');

// 1. CRITICAL FIX: Disable Mongoose model-level buffering globally.
// This forces queries like users.findOne() to immediately throw a connection 
// error if the DB isn't ready, instead of hanging for 10,000ms.
mongoose.set('bufferCommands', false);

// Optimize DNS resolution for serverless environments
dns.setDefaultResultOrder('ipv4first');
try {
  dns.setServers(['8.8.8.8', '8.8.4.4']);
} catch (err) {
  console.warn('Warning: Could not set custom DNS servers:', err.message);
}

// Cache connection across serverless invocations
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  // 2. CRITICAL FIX: Throw an error instead of returning undefined.
  // Returning undefined allows calling code to proceed as if connection succeeded.
  if (!process.env.MONGODB_URI) {
    throw new Error('CRITICAL ERROR: MONGODB_URI is not defined in environment variables!');
  }

  // Reuse existing connection
  if (cached.conn) {
    console.log('MongoDB: reusing existing connection');
    return cached.conn;
  }

  // Wait for in-progress connection
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGODB_URI, {
        family: 4, // Force IPv4 to bypass dual-stack DNS delays
        bufferCommands: false, // Prevents connection buffering
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 8000,
        connectTimeoutMS: 5000,
        maxPoolSize: 10,
      })
      .then((conn) => {
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
      })
      .catch((err) => {
        cached.promise = null; // Reset promise on failure so next invocation retries
        console.error(`MongoDB Connection Error: ${err.message}`);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

module.exports = connectDB;