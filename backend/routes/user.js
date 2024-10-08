/** Imports */
const express = require("express")
const router = express.Router()
const rateLimiter = require("../middleware/rate-limiter")
const emailValidator = require("../middleware/email-validator")
const userCtrl = require("../controllers/user")

/** Set routes */
router.post("/signup",rateLimiter,emailValidator, userCtrl.signup)
router.post("/login",rateLimiter, userCtrl.login)

module.exports = router