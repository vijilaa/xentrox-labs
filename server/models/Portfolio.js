const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Portfolio project title is required'],
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      default: 'Full Stack Development'
    },
    client: {
      type: String,
      default: 'Internal Project'
    },
    description: {
      type: String,
      required: [true, 'Project description is required']
    },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'
    },
    liveUrl: {
      type: String,
      default: ''
    },
    tags: [
      {
        type: String
      }
    ],
    featured: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Portfolio', portfolioSchema);
