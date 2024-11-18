const express = require('express');
const router = express.Router();
const {
  addItemToCart,
  getCart,
  updateCartItem,
  removeItemFromCart,
  clearCart
} = require('../controllers/cartController');
const protect = require('../middleware/auth'); // Protect routes

// Protected routes (authentication required)
router.post('/add', protect, addItemToCart); // Add item to cart
router.get('/', protect, getCart); // Get user's cart
router.put('/update', protect, updateCartItem); // Update cart item
router.delete('/remove', protect, removeItemFromCart); // Remove item from cart
router.delete('/clear', protect, clearCart); // Clear the cart

module.exports = router;
