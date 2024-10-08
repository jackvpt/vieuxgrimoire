// Import multer
const multer = require("multer")

// Import Sharp
const sharp = require("sharp")

// Import fs
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

// const storage = multer.diskStorage({
//   destination: (req, file, callback) => { // Set folder
//     callback(null, "images")
//   },
//   filename: (req, file, callback) => { // Set filename
//     const name = file.originalname.split(' ').join('_').replace(/\.[^.]+$/, "") // Replaces ' ' by '_' to avoid server issues and removes extension
//     const extension = MIME_TYPES[file.mimetype] // Convert file MIME TYPE to extension
//     callback(null, name + Date.now() + "." + extension) // Add Timestamp to make file unique
//   }
// })

const storage = multer.memoryStorage()

module.exports = multer({
  storage: storage,
  limits: { files: 1, filesize: 4 * 1024 * 1024 }, // Limit number of file to 1 and limit file size to 4Mo
  fileFilter: fileFilter
}).single("image") // 'Single' for unique file - 'image' for image type