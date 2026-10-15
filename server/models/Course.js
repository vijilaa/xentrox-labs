const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Course name is required'],
      trim: true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: false
    },
    categorySlug: {
      type: String,
      required: [true, 'Category slug/ID is required']
    },
    duration: {
      type: String,
      required: [true, 'Duration is required'],
      default: '3 Months'
    },
    level: {
      type: String,
      default: 'Beginner to Advanced'
    },
    tag: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    syllabus: [
      {
        type: String
      }
    ],
    price: {
      type: Number,
      default: 0
    },
    badge: {
      type: String,
      default: ''
    },
    isPopular: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Course', courseSchema);
