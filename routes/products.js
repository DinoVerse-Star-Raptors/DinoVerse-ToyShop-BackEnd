const express = require('express');
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const protect = require('../middleware/auth'); // Protect routes (optional)

// Public routes
router.post('/', protect, createProduct); // Create a new product (protected)
router.get('/', getAllProducts); // Get all products
router.get('/:id', getProductById); // Get product by ID
router.put('/:id', protect, updateProduct); // Update product (protected)
router.delete('/:id', protect, deleteProduct); // Delete product (protected)

module.exports = router;
