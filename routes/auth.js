const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getProfile,
  logout,
} = require('../controllers/authController');
const protect = require('../middleware/auth'); // Protect routes with JWT authentication

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected route (only accessible with a valid JWT token)
router.get('/profile', protect, getProfile);

// Optional: Logout route (though logout is typically client-side)
router.post('/logout', logout);

module.exports = router;

// const express = require('express');
// const { createUser } = require('../controllers/userController');
// const router = express.Router();

// // POST route to create a new user
// router.post('/register', createUser);

// module.exports = router;
