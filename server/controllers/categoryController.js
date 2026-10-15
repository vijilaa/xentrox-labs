const Category = require('../models/Category');
const Course = require('../models/Course');

// @desc    Get all categories (with nested courses)
// @route   GET /api/categories
// @access  Public
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).sort({ createdAt: 1 });
    
    // Fetch courses for each category to maintain frontend compatibility
    const categoriesWithCourses = await Promise.all(
      categories.map(async (cat) => {
        const courses = await Course.find({ categorySlug: cat.categoryId });
        return {
          ...cat.toObject(),
          id: cat.categoryId,
          courses
        };
      })
    );

    res.json({
      success: true,
      count: categoriesWithCourses.length,
      data: categoriesWithCourses
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single category by ID
// @route   GET /api/categories/:id
// @access  Public
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    const courses = await Course.find({ categorySlug: category.categoryId });

    res.json({
      success: true,
      data: {
        ...category.toObject(),
        courses
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new category
// @route   POST /api/categories
// @access  Private (Admin)
const createCategory = async (req, res) => {
  try {
    const { title, categoryId, iconName, theme, badge, description } = req.body;

    if (!title || !categoryId) {
      return res.status(400).json({ success: false, message: 'Please provide category title and categoryId' });
    }

    const categoryExists = await Category.findOne({
      $or: [{ title }, { categoryId }]
    });

    if (categoryExists) {
      return res.status(400).json({ success: false, message: 'Category with this title or categoryId already exists' });
    }

    const category = await Category.create({
      title,
      categoryId,
      iconName: iconName || 'Code2',
      theme: theme || 'dark',
      badge: badge || 'Popular',
      description: description || ''
    });

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: category
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private (Admin)
const updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({
      success: true,
      message: 'Category updated successfully',
      data: updatedCategory
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private (Admin)
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    // Delete associated courses
    await Course.deleteMany({ categorySlug: category.categoryId });
    await category.deleteOne();

    res.json({
      success: true,
      message: 'Category and associated courses deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};
