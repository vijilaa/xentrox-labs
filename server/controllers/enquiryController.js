const Enquiry = require('../models/Enquiry');

// @desc    Submit a new student/lead enquiry (Public from enrollment modal / website)
// @route   POST /api/enquiries
// @access  Public
const createEnquiry = async (req, res) => {
  try {
    const { fullName, name, email, phone, course, message } = req.body;
    const studentName = (fullName || name || '').trim();

    if (!studentName || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Please provide full name, email, and phone number'
      });
    }

    // Validate phone: must be exactly 10 digits
    const phoneDigits = String(phone).replace(/\D/g, '');
    if (phoneDigits.length !== 10) {
      return res.status(400).json({
        success: false,
        message: 'Phone number must be exactly 10 digits. Please enter a valid mobile number.'
      });
    }

    const enquiry = await Enquiry.create({
      fullName: studentName,
      email: email.trim().toLowerCase(),
      phone: phoneDigits,
      course: course || 'General Inquiry',
      message: message || '',
      status: 'pending'
    });

    console.log(`📥 [Enquiry Saved to Atlas] New enquiry from ${studentName} (${enquiry.email}) for ${enquiry.course}`);

    res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully! Our admissions team will contact you shortly.',
      data: enquiry
    });
  } catch (error) {
    console.error('❌ [Enquiry Save Failed]:', error.message);
    res.status(500).json({ success: false, message: error.message || 'Failed to save enquiry to database' });
  }
};

// @desc    Get all enquiries
// @route   GET /api/enquiries
// @access  Private (Admin)
const getEnquiries = async (req, res) => {
  try {
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
