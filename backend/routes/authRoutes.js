const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// Map the routes to the logic we just wrote
router.post('/signup', registerUser);
router.post('/login', loginUser);

module.exports = router;