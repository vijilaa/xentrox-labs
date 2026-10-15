const express = require('express');
const router = express.Router();
const {
  getPortfolioItems,
  getPortfolioById,
  createPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem
} = require('../controllers/portfolioController');
const { protectAdmin } = require('../middleware/authMiddleware');

router.route('/')
  .get(getPortfolioItems)
  .post(protectAdmin, createPortfolioItem);

router.route('/:id')
  .get(getPortfolioById)
  .put(protectAdmin, updatePortfolioItem)
  .delete(protectAdmin, deletePortfolioItem);

module.exports = router;
