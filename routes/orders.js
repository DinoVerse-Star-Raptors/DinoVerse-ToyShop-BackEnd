import express from 'express';
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder
} from '../controllers/orderController';
import protect from '../middleware/auth'; // Protect routes (optional)

const router = express.Router();

// Routes
router.post('/', protect, createOrder); // Create order
router.get('/', protect, getAllOrders); // Get all orders (for user/admin)
router.get('/:id', protect, getOrderById); // Get order by ID
router.put('/:id/status', protect, updateOrderStatus); // Update order status
router.delete('/:id', protect, deleteOrder); // Delete order

export default router;
