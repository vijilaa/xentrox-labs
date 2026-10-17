const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const path = require('path');

// Load environment variables before any module or DB connection
dotenv.config({ path: path.resolve(__dirname, '.env') });
dotenv.config();

const { connectDB, getDbStatus, isDbConnected } = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Route imports
const adminRoutes = require('./routes/adminRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const courseRoutes = require('./routes/courseRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');
const blogRoutes = require('./routes/blogRoutes');
const enquiryRoutes = require('./routes/enquiryRoutes');

const app = express();

// Parse CLIENT_URL environment variable if provided
const configuredOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(',').map((o) => o.trim().replace(/\/+$/, ''))
  : [];

// Comprehensive CORS Middleware
const corsOptions = {
  origin: (origin, callback) => {
    // 1. Allow mobile apps, curl, Postman, server-to-server (where origin is undefined)
    if (!origin) return callback(null, true);

    // 2. Allow in development or wildcard
    if (process.env.NODE_ENV !== 'production' || configuredOrigins.includes('*')) {
      return callback(null, true);
    }

    // 3. Allow specified client URLs
    if (configuredOrigins.includes(origin)) {
      return callback(null, true);
    }

    // 4. Allow common deployment domains (Vercel, Netlify, localhost, local network)
    if (
      origin.endsWith('.vercel.app') ||
      origin.endsWith('.netlify.app') ||
      origin.includes('localhost') ||
      origin.includes('127.0.0.1') ||
      /^(http|https):\/\/(192\.168\.|10\.|172\.(1[6-9]|2[0-9]|3[0-1])\.)/.test(origin)
    ) {
      return callback(null, true);
    }

    // Default: allow origin to ensure mobile users are not blocked by CORS
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH', 'HEAD'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check API - root, /health, /api, and /api/health
const sendHealthCheck = (req, res) => {
  const dbInfo = getDbStatus();

  res.status(200).json({
    status: 'online',
    server: 'running',
    environment: process.env.NODE_ENV || 'development',
    database: dbInfo.status,
    databaseReady: dbInfo.ready,
    databaseName: dbInfo.database,
    host: dbInfo.host,
    message: dbInfo.ready
      ? 'XentroX Labs REST API Service is fully operational'
      : 'API server is running; database is connecting/reconnecting to MongoDB Atlas. Ensure 0.0.0.0/0 is whitelisted in Atlas Network Access.'
  });
};

// Handle all HTTP methods (GET, POST, HEAD, OPTIONS) for health checks so probes never fail
app.all('/', sendHealthCheck);
app.all('/health', sendHealthCheck);
app.all('/api', sendHealthCheck);
app.all('/api/health', sendHealthCheck);

// Ensure DB connection is active before processing data requests (critical for serverless / cold starts)
app.use(async (req, res, next) => {
  // Health checks already returned above; for all other endpoints, ensure active DB connection
  if (!isDbConnected() && process.env.MONGO_URI) {
    try {
      await connectDB();
    } catch (err) {
      console.warn('⚠️ [DB Pre-check] Reconnect triggered:', err.message);
    }
  }
  next();
});

// Database check middleware for state-dependent endpoints
const checkDatabaseReady = async (req, res, next) => {
  if (isDbConnected()) {
    return next();
  }

  // Attempt connection if not yet active
  if (process.env.MONGO_URI) {
    try {
      await connectDB();
    } catch (err) {
      console.warn('⚠️ [DB Middleware] Reconnect failed:', err.message);
    }
  }

  if (isDbConnected()) {
    return next();
  }

  // Allow GET requests to try or fallback, but protect POST/PUT/DELETE
  if (req.method === 'GET') {
    return next();
  }

  return res.status(503).json({
    success: false,
    message:
      'Database connection to MongoDB Atlas is currently reconnecting. If this persists, please ensure your IP (or 0.0.0.0/0) is whitelisted in MongoDB Atlas Network Access.'
  });
};

// API Routes with /api prefix
app.use('/api/admin', adminRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/enquiries', checkDatabaseReady, enquiryRoutes);

// Also mount routes directly for serverless handlers where /api prefix may be stripped or omitted
app.use('/admin', adminRoutes);
app.use('/categories', categoryRoutes);
app.use('/courses', courseRoutes);
app.use('/portfolio', portfolioRoutes);
app.use('/blogs', blogRoutes);
app.use('/enquiries', checkDatabaseReady, enquiryRoutes);

// Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

let server;
if (!process.env.VERCEL) {
  server = app.listen(PORT, () => {
    console.log(`🚀 [XentroX] Backend server listening on port ${PORT}`);
    console.log(`🌐 [XentroX] Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`📡 [XentroX] Initiating MongoDB Atlas connection in background...`);
    
    // Safe background Atlas connection
    connectDB().catch((err) => {
      console.error('⚠️ [XentroX] Background Atlas connection attempt encountered an issue:', err.message);
    });
  });

  // Graceful shutdown handling
  const handleGracefulShutdown = async (signal) => {
    console.log(`\n🛑 [XentroX] Received ${signal}. Starting graceful shutdown...`);
    if (server) {
      server.close(async () => {
        console.log('🔒 [XentroX] HTTP server closed.');
        try {
          await mongoose.connection.close();
          console.log('🔒 [XentroX] MongoDB Atlas connection closed.');
        } catch (err) {
          console.error('Error closing MongoDB connection:', err.message);
        }
        process.exit(0);
      });
    }
  };

  process.on('SIGTERM', () => handleGracefulShutdown('SIGTERM'));
  process.on('SIGINT', () => handleGracefulShutdown('SIGINT'));
} else {
  // When running in a Vercel serverless environment, initiate Atlas connection
  connectDB().catch((err) => {
    console.error('⚠️ [Vercel Serverless] MongoDB Atlas connection error:', err.message);
  });
}

module.exports = app;