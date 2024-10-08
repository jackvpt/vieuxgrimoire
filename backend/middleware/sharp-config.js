/** Imports */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const resizeImage = async (req, res, next) => {
    if (!req.file) { /** If no file go next */
        return next()
    }

    const fileName = path.parse(req.file.originalname).name; /** Get file name */
    const newFilename = `${fileName}_${Date.now()}.webp`; /** Add timespan and .webp extension */
    req.file.filename = newFilename;
    try {
        await sharp(req.file.buffer)
            .resize(330) /** width=330px  */
            .webp({ quality: 20 })
            .toFile(`images/${newFilename}`)
        next()
    } catch (error) {
        res.status(500).json({ message: "Error resizing image !" })
    }

}

module.exports = resizeImage;
