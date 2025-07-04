const express = require('express');
const router = express.Router();
const { register, login} = require('../controller/authController')

// Register New User
router.post('/register', register);

// Login User
router.post('/login', login);

module.exports = router;