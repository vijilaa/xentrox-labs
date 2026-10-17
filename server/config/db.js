const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config();

// Disable buffering so queries fail fast or await active connection
mongoose.set('bufferCommands', false);

// Global connection cache for serverless environments (prevents duplicate connections & cold start timeouts)
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

let connectionAttempts = 0;

const ensureDefaultAdmin = async () => {
  try {
    const Admin = require('../models/Admin');
    const admin = await Admin.findOne({ email: 'admin@xentroxlabs.com' });
    if (!admin) {
      console.warn('[Admin Auth] No default admin found in Atlas. Creating default superadmin...');
      await Admin.create({
        name: 'XentroX Admin',
        email: 'admin@xentroxlabs.com',
        password: 'Admin@123456',
        role: 'superadmin'
      });
      console.log('🛡️ [Admin Auth] Default superadmin created in Atlas: admin@xentroxlabs.com / Admin@123456');
    } else {
      console.log('🛡️ [Admin Auth] Admin account verified in Atlas.');
    }
  } catch (err) {
    console.error('[Admin Auth] Verification check error:', err.message);
  }
};

const getAtlasTroubleshootingGuide = (errorMessage) => {
  const isWhitelistError =
    errorMessage.includes('whitelisted') ||
    errorMessage.includes('SSL alert number 80') ||
    errorMessage.includes('MongooseServerSelectionError') ||
    (!errorMessage.includes('bad auth') && errorMessage.includes('timed out'));

  if (isWhitelistError) {
    return [
      '⚠️ [MongoDB Atlas] Connection rejected by MongoDB Atlas!',
      '👉 Common Cause: Your current IP address is not whitelisted in Atlas Network Access.',
      '👉 Fix: Go to cloud.mongodb.com -> Select your project -> "Network Access" -> "Add IP Address" -> Select "Allow Access from Anywhere" (0.0.0.0/0) -> Confirm.',
      '👉 Note: If deployed on Vercel/Netlify/Render, 0.0.0.0/0 is mandatory because cloud servers have dynamic IPs.'
    ].join('\n');
  }

  return `⚠️ [MongoDB Atlas] Diagnostic: ${errorMessage}`;
};

const connectDB = async () => {
  const atlasUri = process.env.MONGO_URI;

  if (!atlasUri) {
    console.error('❌ [MongoDB] MONGO_URI is missing in server/.env');
    return null;
  }

  // 1. If connection already active, reuse it immediately
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  // 2. If connection is in progress, await the existing promise instead of skipping
  if (!cached.promise) {
    connectionAttempts += 1;
    console.log(`[MongoDB] Connecting to MongoDB Atlas (Attempt #${connectionAttempts})...`);

    const opts = {
      bufferCommands: false, // Fail fast on disconnected state instead of buffering 10s
      serverSelectionTimeoutMS: 10000, // 10s timeout for TLS handshake and replica set election
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
      maxPoolSize: 10,
      minPoolSize: 1
    };

    cached.promise = mongoose.connect(atlasUri, opts).then((m) => {
      console.log(`✅ [MongoDB] Connected to Atlas Host: ${m.connection.host}`);
      console.log(`📦 [MongoDB] Database: ${m.connection.name}`);
      return m;
    }).catch((err) => {
      cached.promise = null;
      console.error(`❌ [MongoDB] Atlas connection failed: ${err.message}`);
      console.error(getAtlasTroubleshootingGuide(err.message));
      throw err;
    });
  }

  try {
    cached.conn = await cached.promise;
    await ensureDefaultAdmin();
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    return null;
  }
};

// Mongoose Connection Event Handlers (registered once)
if (!global.__mongooseEventsAttached) {
  global.__mongooseEventsAttached = true;

  mongoose.connection.on('connected', () => {
    console.log(`📡 [MongoDB Event] Connection established with ${mongoose.connection.name}`);
  });

  mongoose.connection.on('error', (err) => {
    console.error(`⚠️ [MongoDB Event Error]: ${err.message}`);
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('⚠️ [MongoDB Event] Connection lost to Atlas.');
    if (cached) {
      cached.conn = null;
      cached.promise = null;
    }
  });

  mongoose.connection.on('reconnected', () => {
    console.log('✅ [MongoDB Event] Successfully reconnected to Atlas cluster');
    ensureDefaultAdmin().catch(() => {});
  });
}

const isDbConnected = () => mongoose.connection.readyState === 1;

const getDbStatus = () => {
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };
  const stateCode = mongoose.connection.readyState;
  return {
    ready: stateCode === 1,
    status: states[stateCode] || 'unknown',
    database: mongoose.connection.name || null,
    host: mongoose.connection.host || null
  };
};

connectDB.connectDB = connectDB;
connectDB.isDbConnected = isDbConnected;
connectDB.getDbStatus = getDbStatus;
connectDB.ensureDefaultAdmin = ensureDefaultAdmin;

module.exports = connectDB;
