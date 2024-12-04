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

// Routes for orders
// Create an order - Protected route, only accessible by authenticated users
router.post('/', protect, createOrder);

// Get all orders (for user/admin) - Protected route, only accessible by authenticated users
router.get('/', protect, getAllOrders);

// Get order by ID - Protected route, only accessible by authenticated users
router.get('/:id', protect, getOrderById);

// Update order status (e.g., from "Pending" to "Shipped") - Protected route
router.put('/:id/status', protect, updateOrderStatus);

// Delete an order (e.g., cancel an order) - Protected route
router.delete('/:id', protect, deleteOrder);

export default router;
