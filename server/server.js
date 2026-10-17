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
    database: {
      status: dbInfo.status,
      ready: dbInfo.ready,
      name: dbInfo.database,
      host: dbInfo.host,
      clusterTarget: dbInfo.clusterTarget,
      uriConfigured: dbInfo.uriConfigured,
      errorCategory: dbInfo.errorCategory,
      diagnostic: dbInfo.diagnostic
    },
    message: dbInfo.ready
      ? 'XentroX Labs REST API Service is fully operational'
      : dbInfo.userMessage
  });
};

// Handle all HTTP methods (GET, POST, HEAD, OPTIONS) for health checks so probes never fail
app.all('/', sendHealthCheck);
app.all('/health', sendHealthCheck);
app.all('/api', sendHealthCheck);
app.all('/api/health', sendHealthCheck);

// Unified Database Connection Middleware for all API data routes
// Guarantees Mongoose connection is verified active before any controller/route handler runs
const ensureDatabaseConnected = async (req, res, next) => {
  // 1. If connection is already live, proceed immediately
  if (isDbConnected()) {
    return next();
  }

  // 2. Attempt connection (or await in-flight connection promise)
  try {
    const conn = await connectDB();
    if (conn && isDbConnected()) {
      return next();
    }
  } catch (err) {
    console.error('❌ [Database Middleware] Connection error:', err.message);
  }

  // 3. If database is not available, return clean 503 Service Unavailable
  const dbInfo = getDbStatus();

  return res.status(503).json({
    success: false,
    errorCategory: dbInfo.errorCategory || 'DATABASE_UNAVAILABLE',
    message: dbInfo.userMessage || 'Database connection to MongoDB Atlas is currently unavailable.',
    diagnostic: dbInfo.diagnostic || 'Please verify MongoDB Atlas Network Access and Vercel Environment Variables.'
  });
};

// Protect all API data routes with the database connection middleware
app.use('/api', ensureDatabaseConnected);

// API Routes with /api prefix
app.use('/api/admin', adminRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/enquiries', enquiryRoutes);

// Also mount routes directly for serverless handlers where /api prefix may be stripped or omitted
app.use('/admin', ensureDatabaseConnected, adminRoutes);
app.use('/categories', ensureDatabaseConnected, categoryRoutes);
app.use('/courses', ensureDatabaseConnected, courseRoutes);
app.use('/portfolio', ensureDatabaseConnected, portfolioRoutes);
app.use('/blogs', ensureDatabaseConnected, blogRoutes);
app.use('/enquiries', ensureDatabaseConnected, enquiryRoutes);

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
    
    // Safe background Atlas connection for local persistent server
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