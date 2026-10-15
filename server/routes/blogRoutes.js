const express = require('express');
const router = express.Router();
const {
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog
} = require('../controllers/blogController');
const { protectAdmin } = require('../middleware/authMiddleware');

router.route('/')
  .get(getBlogs)
  .post(protectAdmin, createBlog);

router.route('/:slug')
  .get(getBlogBySlug);

router.route('/:id')
  .put(protectAdmin, updateBlog)
  .delete(protectAdmin, deleteBlog);

module.exports = router;
