const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const resizeImage = (req, res, next) => {
    if (!req.file) {
        return next()
    }

    const filePath = req.file.path

    // Check file path
    if (typeof filePath !== 'string' || !filePath) {
        return res.status(400).json({ error: "Wrong or missing file path" })
    }

    const webpFilename = req.file.filename.replace(/\.[^.]+$/, ".webp")
    const webpImagePath = path.join("images", webpFilename)

    sharp(filePath)
        .resize(206)
        .webp({ quality: 20 })
        .toFile(webpImagePath, (err, info) => {
            if (err) {
                return res.status(500).json({ error: "Resize image error" })
            }

            // Delete initial image
            sharp.cache(false) // To avoid unlink error (permissions)
            fs.unlink(req.file.path, (unlinkErr) => {
                if (unlinkErr) {
                    return res.status(500).json({ error: "Initial image deletion error" })
                }
            })


            req.file.filename = webpFilename;
            next() // Continue to next middleware
        });
};

module.exports = resizeImage;
