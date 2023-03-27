const path = require('path');
const multer = require('multer');

const ShortUniqueId = require('short-unique-id');
const uid = new ShortUniqueId({ length: 8 });

const { AppError } = require('../helpers/appError');

const tempDir = path.resolve('./tmp');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    const { _id } = req.user;

    const [, ext] = file.originalname.split('.');

    cb(null, `${_id}-${uid()}.${ext}`);
  },
  limits: {
    fileSize: 2048,
  },
});

const multerFilter = (req, file, cb) => {
  //   const [, ext] = file.originalname.split('.');

  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError(400, 'please upload images only'), false);
  }
};

const uploadUserPhoto = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
}).single('avatar');

module.exports = uploadUserPhoto;
