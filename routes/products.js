import express from 'express';
import {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
} from '../controllers/productController';
import protect from '../middleware/auth'; // Protect routes (optional)

const router = express.Router();

// Public routes
router.post('/', protect, createProduct); // Create a new product (protected)
router.get('/', getAllProducts); // Get all products
router.get('/:id', getProductById); // Get product by ID
router.put('/:id', protect, updateProduct); // Update product (protected)
router.delete('/:id', protect, deleteProduct); // Delete product (protected)

export default router;
