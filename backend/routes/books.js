// Import Express
const express = require('express');

// Import router
const router = express.Router();

// Import auth
const auth = require('../middleware/auth');

// Import multer
const multer = require('../middleware/multer-config');

// Import Sharp
const resizeImage = require('../middleware/sharp-config');


// Import controller
const booksCtrl = require('../controllers/books');

// Set routes
router.get("/bestrating", booksCtrl.bestRating)
router.get("/:id", booksCtrl.getOneBook)
router.get("/", booksCtrl.getAllBooks)
router.post("/", auth, multer, resizeImage, booksCtrl.createBook);
router.put('/:id', auth, multer, resizeImage, booksCtrl.modifyBook);
router.delete('/:id', auth, booksCtrl.deleteBook);
router.post("/:id/rating", auth, booksCtrl.createRating);

module.exports = router;