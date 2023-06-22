const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: './public/uploads/',  // Destination folder for storing the uploaded files
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

const uploadImage = (req, res, next) => {
  upload.single('image')(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred during upload
      return res.status(400).json({ error: err.message });
    } else if (err) {
      // An unknown error occurred during upload
      return res.status(500).json({ error: err.message });
    }
    
    // No error occurred, continue to the next middleware
    next();
  });
};

module.exports = uploadImage;
