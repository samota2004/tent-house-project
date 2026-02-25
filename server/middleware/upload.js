require('dotenv').config();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME); 
// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const isVideo = file.mimetype.startsWith('video');
    return {
      folder: 'tent-house-media',
      resource_type: isVideo ? 'video' : 'image',
      allowed_formats: isVideo ? ['mp4', 'mov', 'avi', 'mkv'] : ['jpg', 'png', 'jpeg', 'gif', 'webp'],
      transformation: isVideo ? [] : [{ width: 1000, quality: 'auto' }],
    };
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB
  },
  fileFilter: (req, file, cb) => {
    const isImage = file.mimetype.startsWith('image/');
    const isVideo = file.mimetype.startsWith('video/');
    
    if (isImage || isVideo) {
      cb(null, true);
    } else {
      cb(new Error('Only images and videos are allowed!'), false);
    }
  },
});

module.exports = { upload, cloudinary };