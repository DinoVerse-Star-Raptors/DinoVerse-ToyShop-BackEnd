import express from 'express';
import {
  addItemToCart,
  getCart,
  updateCartItem,
  removeItemFromCart,
  clearCart
} from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js'; // Protect routes

const router = express.Router();

// Protected routes (authentication required)
// router.get('/test', protect, (req, res) => {
//   res.json({ message: 'You are authenticated!', user: req.user });
// }); // Get user's cart
router.get('/', protect, getCart); // Get user's cart
router.post('/add', protect, addItemToCart); // Add item to cart
router.put('/update', protect, updateCartItem); // Update cart item
// router.delete('/remove', protect, removeItemFromCart); // Remove item from cart
router.delete('/cart/:productId', protect, removeItemFromCart); // Remove item from cart
router.delete('/clear', protect, clearCart); // Clear the cart

export default router;
