const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    enum: ['image', 'video'],
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  cloudinaryId: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['wedding', 'party', 'corporate', 'other'],
    default: 'other',
  },
  tags: [{
    type: String,
  }],
  likes: {
    type: Number,
    default: 0,
  },
  size: {
    type: Number, // in bytes
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Media', mediaSchema);