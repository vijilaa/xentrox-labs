const mongoose = require('mongoose');

let isConnecting = false;
let reconnectTimer = null;
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
    errorMessage.includes('bad auth') === false && errorMessage.includes('timed out');

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

  // Prevent concurrent connection attempts
  if (isConnecting || mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  isConnecting = true;
  connectionAttempts += 1;

  try {
    console.log(`[MongoDB] Connecting to MongoDB Atlas (Attempt #${connectionAttempts})...`);

    const conn = await mongoose.connect(atlasUri, {
      serverSelectionTimeoutMS: 5000, // Fail quickly (5s) instead of hanging 30s
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
      maxPoolSize: 10,
      minPoolSize: 1,
      family: 4 // Use IPv4 for stability across networks
    });

    console.log(`✅ [MongoDB] Connected to Atlas Host: ${conn.connection.host}`);
    console.log(`📦 [MongoDB] Database: ${conn.connection.name}`);

    if (reconnectTimer) {
      clearTimeout(reconnectTimer);
      reconnectTimer = null;
    }
    connectionAttempts = 0;
    isConnecting = false;

    // Verify admin once connected
    await ensureDefaultAdmin();
    return conn;
  } catch (error) {
    isConnecting = false;
    console.error(`❌ [MongoDB] Atlas connection failed: ${error.message}`);
    console.error(getAtlasTroubleshootingGuide(error.message));

    // Schedule automatic reconnection without crashing the backend server process
    if (!reconnectTimer) {
      const delay = Math.min(5000 * Math.min(connectionAttempts, 3), 15000);
      console.log(`🔄 [MongoDB] Will automatically retry connection in ${delay / 1000} seconds...`);
      reconnectTimer = setTimeout(() => {
        reconnectTimer = null;
        connectDB().catch(() => {});
      }, delay);
    }

    return null;
  }
};

// Mongoose Connection Event Handlers
mongoose.connection.on('connected', () => {
  console.log(`📡 [MongoDB Event] Connection established with ${mongoose.connection.name}`);
});

mongoose.connection.on('error', (err) => {
  console.error(`⚠️ [MongoDB Event Error]: ${err.message}`);
});

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ [MongoDB Event] Connection lost to Atlas. Scheduling reconnection...');
  if (!reconnectTimer && !isConnecting) {
    reconnectTimer = setTimeout(() => {
      reconnectTimer = null;
      connectDB().catch(() => {});
    }, 5000);
  }
});

mongoose.connection.on('reconnected', () => {
  console.log('✅ [MongoDB Event] Successfully reconnected to Atlas cluster');
  ensureDefaultAdmin().catch(() => {});
});

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

