const mongoose = require('mongoose');

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
    console.error('[Admin Auth] Verification failed:', err.message);
  }
};

const connectDB = async () => {
  const atlasUri = process.env.MONGO_URI;

  if (!atlasUri || (!atlasUri.startsWith('mongodb+srv://') && !atlasUri.includes('mongodb.net'))) {
    throw new Error('MONGO_URI must be set to your MongoDB Atlas connection string in server/.env');
  }

  try {
    console.log('[MongoDB] Connecting directly to MongoDB Atlas...');
    const conn = await mongoose.connect(atlasUri, {
      serverSelectionTimeoutMS: 15000
    });

    console.log(`✅ [MongoDB] Connected to Atlas Host: ${conn.connection.host}`);
    console.log(`📦 [MongoDB] Database: ${conn.connection.name}`);

    await ensureDefaultAdmin();
    return conn;
  } catch (error) {
    console.error(`❌ [MongoDB] Atlas connection failed: ${error.message}`);
    throw error;
  }
};

module.exports = connectDB;
