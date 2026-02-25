const express = require('express');
const router = express.Router();
const {
  getAllMedia,
  uploadMedia,
  deleteMedia,
  updateMedia,
  likeMedia,
} = require('../controllers/mediaController');
const { protect, isOwner } = require('../middleware/auth');
const { upload } = require('../middleware/upload');

// Public routes
router.get('/', getAllMedia);
router.post('/:id/like', likeMedia);

// Protected routes (Owner only)
router.post('/upload', protect, isOwner, upload.single('file'), uploadMedia);
router.delete('/:id', protect, isOwner, deleteMedia);
router.put('/:id', protect, isOwner, updateMedia);

module.exports = router;