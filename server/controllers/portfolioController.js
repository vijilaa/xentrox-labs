const Portfolio = require('../models/Portfolio');

// @desc    Get all portfolio items
// @route   GET /api/portfolio
// @access  Public
const getPortfolioItems = async (req, res) => {
  try {
    const portfolio = await Portfolio.find({}).sort({ createdAt: -1 });
    res.json({
      success: true,
      count: portfolio.length,
      data: portfolio
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single portfolio item by ID
// @route   GET /api/portfolio/:id
// @access  Public
const getPortfolioById = async (req, res) => {
  try {
    const item = await Portfolio.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Portfolio project not found' });
    }
    res.json({
      success: true,
      data: item
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a new portfolio item
// @route   POST /api/portfolio
// @access  Private (Admin)
const createPortfolioItem = async (req, res) => {
  try {
    const { title, category, client, description, image, liveUrl, tags, featured } = req.body;

    if (!title || !description) {
      return res.status(400).json({ success: false, message: 'Please provide project title and description' });
    }

    const item = await Portfolio.create({
      title,
      category: category || 'Full Stack Development',
      client: client || 'Internal Project',
      description,
      image: image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      liveUrl: liveUrl || '',
      tags: tags || [],
      featured: featured || false
    });

    res.status(201).json({
      success: true,
      message: 'Portfolio item created successfully',
      data: item
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update a portfolio item
// @route   PUT /api/portfolio/:id
// @access  Private (Admin)
const updatePortfolioItem = async (req, res) => {
  try {
    const item = await Portfolio.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: 'Portfolio project not found' });
    }

    const updatedItem = await Portfolio.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({
      success: true,
      message: 'Portfolio item updated successfully',
      data: updatedItem
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a portfolio item
// @route   DELETE /api/portfolio/:id
// @access  Private (Admin)
const deletePortfolioItem = async (req, res) => {
  try {
    const item = await Portfolio.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: 'Portfolio project not found' });
    }

    await item.deleteOne();

    res.json({
      success: true,
      message: 'Portfolio item deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getPortfolioItems,
  getPortfolioById,
  createPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem
};
