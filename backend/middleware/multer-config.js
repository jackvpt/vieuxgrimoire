/** Imports */
const multer = require("multer")
const fs = require("fs")

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
}

const fileFilter = (req, file, callback) => {
  if (MIME_TYPES[file.mimetype]) {
    callback(null, true)
  } else {
    callback(new Error("File type not allowed !"))
  }
}

const storage = multer.memoryStorage() /** Store file in RAM */

const upload = multer({
  storage: storage,
  limits: {
    files: 1,
    fileSize: 4 * 1024 * 1024,
  } /** Limit number of file to 1 and limit file size to 4Mo */,
  fileFilter: fileFilter,
})

module.exports = (req, res, next) => {
  upload.single("image")(req, res, (error) => {
    /** 'Single' for unique file - 'image' for image type */
    if (error) return res.status(400).send({ error })
    next()
  })
}
