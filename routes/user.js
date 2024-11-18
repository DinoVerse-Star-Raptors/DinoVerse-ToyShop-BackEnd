const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth'); // Protect routes
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
  addAddress,
  getOrderHistory,
  addProductReview
} = require('../controllers/userController');

// Register user
router.post('/register', registerUser);

// Login user
router.post('/login', loginUser);

// Get user profile (requires authentication)
router.get('/profile', protect, getUserProfile);

// Update user profile (requires authentication)
router.put('/profile', protect, updateUserProfile);

// Delete user account (requires authentication)
router.delete('/profile', protect, deleteUserAccount);

// Add a new address (requires authentication)
router.post('/address', protect, addAddress);

// Get user order history (requires authentication)
router.get('/orders', protect, getOrderHistory);

// Add a product review (requires authentication)
router.post('/reviews', protect, addProductReview);

module.exports = router;
