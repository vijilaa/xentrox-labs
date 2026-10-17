const mongoose = require('mongoose');
const Enquiry = require('../models/Enquiry');

// @desc    Submit a new student/lead enquiry (Public from enrollment modal / website)
// @route   POST /api/enquiries
// @access  Public
const createEnquiry = async (req, res) => {
  try {
    // Check MongoDB Atlas connection readiness
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message:
          'Database is currently reconnecting to MongoDB Atlas. If this persists, ensure 0.0.0.0/0 is added to your MongoDB Atlas IP Access List.'
      });
    }

    const { fullName, name, email, phone, course, message } = req.body;
    const studentName = (fullName || name || '').trim();

    if (!studentName || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Please provide your full name, email address, and phone number.'
      });
    }

    // Email format validation
    const cleanEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address.'
      });
    }

    // Sanitize and normalize phone digits (handling mobile autofill +91, 91, or leading 0)
    let phoneDigits = String(phone).replace(/\D/g, '');
    if (phoneDigits.length === 12 && phoneDigits.startsWith('91')) {
      phoneDigits = phoneDigits.slice(2);
    } else if (phoneDigits.length === 11 && phoneDigits.startsWith('0')) {
      phoneDigits = phoneDigits.slice(1);
    }

    if (phoneDigits.length < 10 || phoneDigits.length > 15) {
      return res.status(400).json({
        success: false,
        message: 'Phone number must be at least 10 digits. Please enter a valid mobile number.'
      });
    }

    const enquiry = await Enquiry.create({
      fullName: studentName,
      email: cleanEmail,
      phone: phoneDigits,
      course: (course || 'General Technical Inquiry').trim(),
      message: (message || '').trim(),
      status: 'pending'
    });

    console.log(`📥 [Enquiry Saved to Atlas] New enquiry from ${studentName} (${enquiry.email}) for "${enquiry.course}"`);

    res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully! Our admissions team will contact you shortly.',
      data: enquiry
    });
  } catch (error) {
    console.error('❌ [Enquiry Save Failed]:', error.message);
    const isAtlasNetwork = error.message.includes('whitelisted') || error.message.includes('SSL alert') || error.message.includes('buffering timed out');
    const userMessage = isAtlasNetwork
      ? 'Database connection temporarily lost. Please verify MongoDB Atlas IP whitelist (0.0.0.0/0) and retry.'
      : (error.message || 'Failed to save enquiry to database');

    res.status(500).json({
      success: false,
      message: userMessage
    });
  }
};

// @desc    Get all enquiries
// @route   GET /api/enquiries
// @access  Private (Admin)
const getEnquiries = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database is currently reconnecting to Atlas. Please try again in a few moments.'
      });
    }

    const { status } = req.query;
    let filter = {};

    if (status) {
      filter.status = status;
    }

    const enquiries = await Enquiry.find(filter).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: enquiries.length,
      data: enquiries
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single enquiry by ID
// @route   GET /api/enquiries/:id
// @access  Private (Admin)
const getEnquiryById = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }

    res.json({
      success: true,
      data: enquiry
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update enquiry status (pending, contacted, enrolled, closed)
// @route   PUT /api/enquiries/:id
// @access  Private (Admin)
const updateEnquiryStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }

    if (status) {
      enquiry.status = status;
    }

    const updatedEnquiry = await enquiry.save();

    res.json({
      success: true,
      message: `Enquiry status updated to ${updatedEnquiry.status}`,
      data: updatedEnquiry
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete enquiry
// @route   DELETE /api/enquiries/:id
// @access  Private (Admin)
const deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }

    await enquiry.deleteOne();

    res.json({
      success: true,
      message: 'Enquiry record deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createEnquiry,
  getEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
  deleteEnquiry
};
