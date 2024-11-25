import express from 'express';
import {
    addItemToCart,
    getCart,
    updateCartItem,
    removeItemFromCart,
    clearCart
} from '../controllers/cartController';
import protect from '../middleware/auth'; // Protect routes

const router = express.Router();

// Protected routes (authentication required)
router.post('/add', protect, addItemToCart); // Add item to cart
router.get('/', protect, getCart); // Get user's cart
router.put('/update', protect, updateCartItem); // Update cart item
router.delete('/remove', protect, removeItemFromCart); // Remove item from cart
router.delete('/clear', protect, clearCart); // Clear the cart

export default router;
