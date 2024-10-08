/** Imports */
const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")
const multer = require("../middleware/multer-config")
const resizeImage = require("../middleware/sharp-config")
const booksCtrl = require("../controllers/books")

/** Set routes */
router.get("/bestrating", booksCtrl.bestRating)
router.get("/:id", booksCtrl.getOneBook)
router.get("/", booksCtrl.getAllBooks)
router.post("/", auth, multer, resizeImage, booksCtrl.createBook)
router.put("/:id", auth, multer, resizeImage, booksCtrl.modifyBook)
router.delete("/:id", auth, booksCtrl.deleteBook)
router.post("/:id/rating", auth, booksCtrl.createRating)

module.exports = router