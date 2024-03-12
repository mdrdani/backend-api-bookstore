const fs = require('fs');
const path = require('path');
const multer = require('multer');

const uploadDir = 'public/uploads/';

// Ensure upload directory exists
fs.mkdirSync(path.resolve(uploadDir), { recursive: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Replace colons in the timestamp with dashes
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    cb(null, timestamp + '-' + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb({ message: 'Unsupported file format' });
  }
};

const uploadMiddleware = multer({
  storage: storage,
  fileFilter: fileFilter,
  // limit size image
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB
  },
});

module.exports = uploadMiddleware;
