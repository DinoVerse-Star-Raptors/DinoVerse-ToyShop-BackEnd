// Import express and the router in ES Module syntax
import express from 'express'
const router = express.Router()

// Import the controller functions using ES Module syntax (add .js extension)
import {
    getAllProducts,
    getProductById,
} from '../controllers/getProductController.js' // Add .js extension

// Route to get all products
router.get('/api/products', getAllProducts)

// Route to get a specific product by productId
router.get('/api/products/:productId', getProductById)

// Export the router using ES Module syntax
export default router
