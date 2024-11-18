const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getAllCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  getAllOrders,
  getOrderById,
  updateOrderStatus
} = require('../controllers/userAdminController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

router.get('/users', protect, isAdmin, getAllUsers);
router.get('/users/:id', protect, isAdmin, getUserById);
router.put('/users/:id', protect, isAdmin, updateUser);
router.delete('/users/:id', protect, isAdmin, deleteUser);

router.get('/products', protect, isAdmin, getAllProducts);
router.post('/products', protect, isAdmin, addProduct);
router.put('/products/:id', protect, isAdmin, updateProduct);
router.delete('/products/:id', protect, isAdmin, deleteProduct);

router.get('/orders', protect, isAdmin, getAllOrders);
router.get('/orders/:id', protect, isAdmin, getOrderById);
router.put('/orders/:id', protect, isAdmin, updateOrderStatus);

// Category routes
router.get('/categories', getAllCategories); // Get all categories
router.post('/categories', addCategory); // Add new category
router.put('/categories/:categoryId', updateCategory); // Update category
router.delete('/categories/:categoryId', deleteCategory); // Delete category

module.exports = router;
