const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const resizeImage = (req, res, next) => {
    if (!req.file) {
        return next(); // Aucun fichier, passe au middleware suivant
    }

    const filePath = req.file.path;

    // Vérifiez que le chemin du fichier est bien une chaîne valide
    if (typeof filePath !== 'string' || !filePath) {
        return res.status(400).json({ error: "Chemin du fichier invalide ou manquant" });
    }

    const webpFilename = req.file.filename.replace(/\.[^.]+$/, ".webp");
    const webpImagePath = path.join("images", webpFilename);

    sharp(filePath)
        .resize(206)
        .webp({ quality: 20 })
        .toFile(webpImagePath, (err, info) => {
            if (err) {
                return res.status(500).json({ error: "Erreur lors du redimensionnement de l'image" });
            }

            // Supprime l'image originale après compression

            // fs.unlink(req.file.path, (unlinkErr) => {
            //     if (unlinkErr) {
            //         console.error("Erreur lors de la suppression de l'image originale :", unlinkErr);
            //         return res.status(500).json({ error: "Erreur lors de la suppression de l'image originale" });
            //     } else {
            //         console.log("Image originale supprimée avec succès !");
            //     }
            // })


            req.file.filename = webpFilename;
            next(); // Continue vers le middleware suivant
        });
};

module.exports = resizeImage;
