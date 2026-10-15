const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Blog title is required'],
      trim: true
    },
    slug: {
      type: String,
      required: [true, 'Blog slug is required'],
      unique: true,
      lowercase: true,
      trim: true
    },
    content: {
      type: String,
      required: [true, 'Blog content is required']
    },
    excerpt: {
      type: String,
      default: ''
    },
    author: {
      type: String,
      default: 'XentroX Labs Team'
    },
    category: {
      type: String,
      default: 'Technology & Trends'
    },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80'
    },
    tags: [
      {
        type: String
      }
    ],
    isPublished: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Blog', blogSchema);
