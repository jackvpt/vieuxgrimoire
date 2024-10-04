// Import Express
const express = require('express');

const router = express.Router();

// Import controller
const userCtrl = require('../controllers/user');

// Routes
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
// router.get('/users', userCtrl.getAllUsers);

module.exports = router;