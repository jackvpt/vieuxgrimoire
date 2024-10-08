// Import file system
const fs = require("fs");

// Import path
const path = require("path");

// Import Sharp
const sharp = require("sharp");

const resizeImage = (req, res, next) => {
    if (!req.file) {
        return next()
    }

    const fileName = path.parse(req.file.originalname).name;
    const newFilename = `${fileName}_${Date.now()}.webp`;
    req.file.filename = newFilename;

    sharp(req.file.buffer)
        .resize(206)
        .webp({ quality: 20 })
        .toFile(`images/${newFilename}`)
        .then(() => next())
        .catch((error) => {
            console.error(error);
            return res.status(500).json({ message: "Error resizing image !" });
        })
}

module.exports = resizeImage;
