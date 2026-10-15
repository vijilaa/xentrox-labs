const Course = require('../models/Course');
const Category = require('../models/Category');

// @desc    Get all courses (with category filter or search)
// @route   GET /api/courses
// @access  Public
const getCourses = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    if (category) {
      query.categorySlug = category;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { tag: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const courses = await Course.find(query).populate('category', 'title categoryId iconName');

    res.json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single course by ID
// @route   GET /api/courses/:id
// @access  Public
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('category', 'title categoryId iconName');
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    res.json({
      success: true,
      data: course
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a new course
// @route   POST /api/courses
// @access  Private (Admin)
const createCourse = async (req, res) => {
  try {
    const { name, categorySlug, duration, level, tag, description, syllabus, price, badge, isPopular } = req.body;

    if (!name || !categorySlug) {
      return res.status(400).json({ success: false, message: 'Please provide course name and categorySlug' });
    }

    // Lookup Category ID if exists
    const catObj = await Category.findOne({ categoryId: categorySlug });

    const course = await Course.create({
      name,
      category: catObj ? catObj._id : null,
      categorySlug,
      duration: duration || '3 Months',
      level: level || 'Beginner to Pro',
      tag: tag || '',
      description: description || '',
      syllabus: syllabus || [],
      price: price || 0,
      badge: badge || '',
      isPopular: isPopular || false
    });

    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      data: course
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update a course
// @route   PUT /api/courses/:id
// @access  Private (Admin)
const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    if (req.body.categorySlug) {
      const catObj = await Category.findOne({ categoryId: req.body.categorySlug });
      if (catObj) {
        req.body.category = catObj._id;
      }
    }

    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({
      success: true,
      message: 'Course updated successfully',
      data: updatedCourse
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a course
// @route   DELETE /api/courses/:id
// @access  Private (Admin)
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    await course.deleteOne();

    res.json({
      success: true,
      message: 'Course deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse
};
