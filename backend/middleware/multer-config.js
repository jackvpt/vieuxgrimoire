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

const storage = multer.diskStorage({
  destination: (req, file, callback) => { // Set folder
    callback(null, "images")
  },
  filename: (req, file, callback) => { // Set filename
    const name = file.originalname.split(' ').join('_') // Replaces ' ' by '_' to avoid server issues
    const extension = MIME_TYPES[file.mimetype] // Convert file MIME TYPE to extension
    callback(null, name + Date.now() + "." + extension) // Add Timestamp to make file unique
  }
})

module.exports = multer({ storage: storage }).single("image") // 'Single' for unique file - 'image' for image type