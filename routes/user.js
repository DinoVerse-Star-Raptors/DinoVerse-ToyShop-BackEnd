import express from 'express';
import { protect } from '../middleware/auth'; // Protect routes
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
  addAddress,
  getOrderHistory,
  addProductReview
} from '../controllers/userController';

const router = express.Router();

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

export default router;
