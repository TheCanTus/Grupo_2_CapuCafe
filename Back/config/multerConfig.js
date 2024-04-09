const multer = require('multer');

const storage = multer.diskStorage({
  destination: './public/images/users/',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

module.exports = upload;