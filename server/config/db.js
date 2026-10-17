const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables locally if not already injected by platform
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config();

// Disable Mongoose command buffering so operations fail fast when disconnected
// and route handlers are guaranteed to run only on verified, active connections
mongoose.set('bufferCommands', false);

// Global connection cache for serverless environments (prevents connection leaks and cold-start duplicates)
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
    lastError: null,
    errorCategory: null,
    lastAttempt: null,
    clusterHost: null,
    databaseName: null
  };
}

let connectionAttempts = 0;

// Helper to safely extract cluster hostname and database name without exposing credentials
const extractSafeUriDetails = (uri) => {
  if (!uri || typeof uri !== 'string') {
    return { configured: false, clusterHost: null, databaseName: null };
  }
  try {
    // Regex extracts hostname and DB name after @
    const match = uri.match(/@([^/?#]+)(?:\/([^?#]+))?/);
    return {
      configured: true,
      clusterHost: match ? match[1] : 'xentroxlabscluster.ln58fho.mongodb.net',
      databaseName: match && match[2] ? match[2] : 'xentrox_labs'
    };
  } catch {
    return { configured: true, clusterHost: 'mongodb.net', databaseName: 'xentrox_labs' };
  }
};

// Classify technical errors without leaking credentials or passwords
const classifyConnectionError = (errorMessage) => {
  const msg = (errorMessage || '').toLowerCase();

  if (msg.includes('bad auth') || msg.includes('authentication failed') || msg.includes('auth error')) {
    return {
      category: 'AUTHENTICATION_ERROR',
      userMessage: 'MongoDB Atlas authentication failed. Please verify the database user credentials in your environment variables.',
      diagnostic: 'Atlas rejected the username or password. Check Vercel Settings -> Environment Variables -> MONGO_URI. If your password contains special characters (e.g. @, #, $, %), ensure they are URL-encoded.'
    };
  }

  if (
    msg.includes('whitelisted') ||
    msg.includes('ssl alert number 80') ||
    msg.includes('mongooseserverselectionerror') ||
    msg.includes('serverselectionerror') ||
    msg.includes('timed out') ||
    msg.includes('etimedout') ||
    msg.includes('enotfound') ||
    msg.includes('querysrv')
  ) {
    return {
      category: 'NETWORK_ACCESS_ERROR',
      userMessage: 'Connection to MongoDB Atlas timed out or was rejected by Atlas Network Access firewall.',
      diagnostic: 'MongoDB Atlas is blocking the serverless outbound IP. Go to cloud.mongodb.com -> Project -> Security -> Network Access and ensure an IP Access entry is active (such as 0.0.0.0/0 for serverless functions).'
    };
  }

  if (msg.includes('invalid scheme') || msg.includes('malformed') || msg.includes('uri')) {
    return {
      category: 'INVALID_URI_ERROR',
      userMessage: 'The MONGO_URI format is invalid.',
      diagnostic: 'Ensure MONGO_URI starts with "mongodb+srv://" and follows standard MongoDB Atlas connection URI syntax.'
    };
  }

  return {
    category: 'DATABASE_CONNECTION_ERROR',
    userMessage: 'Unable to connect to MongoDB Atlas database cluster.',
    diagnostic: errorMessage || 'Unknown database connection error.'
  };
};

const ensureDefaultAdmin = async () => {
  try {
    const Admin = require('../models/Admin');
    const admin = await Admin.findOne({ email: 'admin@xentroxlabs.com' });
    if (!admin) {
      console.warn('[Admin Auth] No default admin found in Atlas. Initializing default superadmin...');
      await Admin.create({
        name: 'XentroX Admin',
        email: 'admin@xentroxlabs.com',
        password: 'Admin@123456',
        role: 'superadmin'
      });
      console.log('🛡️ [Admin Auth] Default superadmin ready in Atlas: admin@xentroxlabs.com / Admin@123456');
    } else {
      console.log('🛡️ [Admin Auth] Admin account verified in Atlas.');
    }
  } catch (err) {
    console.error('[Admin Auth] Verification check error:', err.message);
  }
};

const connectDB = async () => {
  const atlasUri = process.env.MONGO_URI;

  const safeDetails = extractSafeUriDetails(atlasUri);
  cached.clusterHost = safeDetails.clusterHost;
  cached.databaseName = safeDetails.databaseName;

  if (!atlasUri) {
    const errorDetails = {
      category: 'MISSING_ENV_ERROR',
      userMessage: 'Database connection string is missing.',
      diagnostic: 'MONGO_URI is not set in Vercel Environment Variables. Please add MONGO_URI under Vercel Settings -> Environment Variables.'
    };
    cached.lastError = errorDetails.userMessage;
    cached.errorCategory = errorDetails.category;
    console.error(`❌ [MongoDB] ${errorDetails.diagnostic}`);
    return null;
  }

  // 1. Return active connection if ready (warm serverless container reuse)
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  // If connection is dead/broken, reset cache so new connection can be formed
  if (mongoose.connection.readyState !== 1 && mongoose.connection.readyState !== 2) {
    cached.conn = null;
    cached.promise = null;
  }

  // 2. Initiate connection or reuse existing in-flight promise
  if (!cached.promise) {
    connectionAttempts += 1;
    cached.lastAttempt = new Date().toISOString();
    console.log(`[MongoDB] Connecting to MongoDB Atlas cluster "${safeDetails.clusterHost || 'Atlas'}" (Attempt #${connectionAttempts})...`);

    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 8000, // 8s timeout to fail fast with clean error before lambda timeout
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
      maxPoolSize: 10,
      minPoolSize: 1
    };

    cached.promise = mongoose
      .connect(atlasUri, opts)
      .then((m) => {
        console.log(`✅ [MongoDB] Connected to Atlas Host: ${m.connection.host}`);
        console.log(`📦 [MongoDB] Database: ${m.connection.name}`);
        cached.lastError = null;
        cached.errorCategory = null;
        return m;
      })
      .catch((err) => {
        cached.promise = null;
        cached.conn = null;
        const classified = classifyConnectionError(err.message);
        cached.lastError = classified.userMessage;
        cached.errorCategory = classified.category;
        console.error(`❌ [MongoDB] Atlas connection failed (${classified.category}): ${err.message}`);
        console.error(`👉 Diagnostic: ${classified.diagnostic}`);
        throw err;
      });
  }

  try {
    cached.conn = await cached.promise;
    await ensureDefaultAdmin();
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    cached.conn = null;
    return null;
  }
};

// Mongoose Connection Event Handlers (registered once)
if (!global.__mongooseEventsAttached) {
  global.__mongooseEventsAttached = true;

  mongoose.connection.on('connected', () => {
    console.log(`📡 [MongoDB Event] Connection established with ${mongoose.connection.name}`);
    if (cached) {
      cached.lastError = null;
      cached.errorCategory = null;
    }
  });

  mongoose.connection.on('error', (err) => {
    console.error(`⚠️ [MongoDB Event Error]: ${err.message}`);
    if (cached) {
      const classified = classifyConnectionError(err.message);
      cached.lastError = classified.userMessage;
      cached.errorCategory = classified.category;
    }
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
    if (cached) {
      cached.lastError = null;
      cached.errorCategory = null;
    }
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
  const safeDetails = extractSafeUriDetails(process.env.MONGO_URI);

  let userMessage = 'Database connection is fully operational.';
  let diagnostic = 'MongoDB Atlas cluster connected successfully.';

  if (stateCode !== 1) {
    if (!safeDetails.configured) {
      userMessage = 'MONGO_URI is missing in Vercel environment variables.';
      diagnostic = 'Please configure MONGO_URI in your Vercel Project Settings -> Environment Variables.';
    } else if (cached && cached.lastError) {
      userMessage = cached.lastError;
      const classified = classifyConnectionError(cached.lastError);
      diagnostic = classified.diagnostic;
    } else {
      userMessage = 'Database connection to MongoDB Atlas is currently reconnecting.';
      diagnostic = 'Verify MongoDB Atlas Network Access (IP Access List) allows connections from Vercel.';
    }
  }

  return {
    ready: stateCode === 1,
    status: states[stateCode] || 'unknown',
    database: mongoose.connection.name || safeDetails.databaseName || null,
    host: mongoose.connection.host || null,
    clusterTarget: safeDetails.clusterHost || null,
    uriConfigured: safeDetails.configured,
    errorCategory: stateCode === 1 ? null : (cached ? cached.errorCategory : null),
    userMessage,
    diagnostic
  };
};

connectDB.connectDB = connectDB;
connectDB.isDbConnected = isDbConnected;
connectDB.getDbStatus = getDbStatus;
connectDB.ensureDefaultAdmin = ensureDefaultAdmin;

module.exports = connectDB;
