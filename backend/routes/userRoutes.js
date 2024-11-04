const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Public routes for registration and login
router.post('/users/register', userController.registerUser);
router.post('/users/login', userController.loginUser);

// Protected route example (e.g., user profile)
router.get('/users/profile', userController.authenticateToken, (req, res) => {
    res.json({ message: "Access granted to profile", user: req.user });
});

module.exports = router;
