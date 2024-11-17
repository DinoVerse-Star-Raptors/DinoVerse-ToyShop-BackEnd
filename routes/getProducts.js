const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
} = require('../controllers/getProductController');

// Route to get all products
router.get('/api/products', getAllProducts);

// Route to get a specific product by productId
router.get('/api/products/:productId', getProductById);

module.exports = router;
