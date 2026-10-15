const express = require('express');
const router = express.Router();
const {
  createEnquiry,
  getEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
  deleteEnquiry
} = require('../controllers/enquiryController');
const { protectAdmin } = require('../middleware/authMiddleware');

router.route('/')
  .post(createEnquiry) // Public student submission
  .get(protectAdmin, getEnquiries); // Admin list

router.route('/:id')
  .get(protectAdmin, getEnquiryById)
  .put(protectAdmin, updateEnquiryStatus)
  .delete(protectAdmin, deleteEnquiry);

module.exports = router;
