const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Category title is required'],
      unique: true,
      trim: true
    },
    categoryId: {
      type: String,
      required: [true, 'Category ID key is required'],
      unique: true,
      trim: true
    },
    iconName: {
      type: String,
      default: 'Code2'
    },
    theme: {
      type: String,
      enum: ['dark', 'light'],
      default: 'dark'
    },
    badge: {
      type: String,
      default: 'Popular Track'
    },
    description: {
      type: String,
      required: [true, 'Description is required']
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Category', categorySchema);
