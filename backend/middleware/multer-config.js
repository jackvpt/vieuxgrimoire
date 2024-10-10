/** Imports */ 
const multer = require("multer")
const fs = require("fs")

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png"
}

const fileFilter = (req, file, callback) => {
  if (MIME_TYPES[file.mimetype]) {
    callback(null, true)
  } else {
    callback(new Error('File type not allowed !'))
  }
};

const storage = multer.memoryStorage() /** Store file in RAM */

module.exports = multer({
  storage: storage,
  limits: { files: 1, fileSize: 4 * 1024 * 1024 }, /** Limit number of file to 1 and limit file size to 4Mo */ 
  fileFilter: fileFilter
}).single("image") /** 'Single' for unique file - 'image' for image type */ 