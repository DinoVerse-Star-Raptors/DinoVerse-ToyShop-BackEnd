const express = require('express')
const router = express.Router()
const {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder,
} = require('../controllers/orderController')
const protect = require('../middleware/auth') // Protect routes (optional)

router.post('/', protect, createOrder) // Create order
router.get('/', protect, getAllOrders) // Get all orders (for user/admin)
router.get('/:id', protect, getOrderById) // Get order by ID
router.put('/:id/status', protect, updateOrderStatus) // Update order status
router.delete('/:id', protect, deleteOrder) // Delete order

module.exports = router
