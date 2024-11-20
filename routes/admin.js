import express from 'express';
// import {
//   getAllUsers,
//   getUserById,
//   updateUser,
//   deleteUser,
//   getAllProducts,
//   addProduct,
//   updateProduct,
//   deleteProduct,
//   getAllCategories,
//   addCategory,
//   updateCategory,
//   deleteCategory,
//   getAllOrders,
//   getOrderById,
//   updateOrderStatus
// } from '../controllers/userAdminController.js';
import loginAdminController from '../controllers/loginAdminController.js'; // Import login admin controller
// import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /admin/login route for admin login
router.post('/login', loginAdminController);

// // User routes
// router.get('/api/users', protect, isAdmin, getAllUsers);
// router.get('/api/users/:id', protect, isAdmin, getUserById);
// router.put('/api/users/:id', protect, isAdmin, updateUser);
// router.delete('/api/users/:id', protect, isAdmin, deleteUser);

// // Product routes
// router.get('/api/products', protect, isAdmin, getAllProducts);
// router.post('/api/products', protect, isAdmin, addProduct);
// router.put('/api/products/:id', protect, isAdmin, updateProduct);
// router.delete('/api/products/:id', protect, isAdmin, deleteProduct);

// // Order routes
// router.get('/api/orders', protect, isAdmin, getAllOrders);
// router.get('/api/orders/:id', protect, isAdmin, getOrderById);
// router.put('/api/orders/:id', protect, isAdmin, updateOrderStatus);

// // Category routes
// router.get('/api/categories', getAllCategories); // Get all categories
// router.post('/api/categories', addCategory); // Add new category
// router.put('/api/categories/:categoryId', updateCategory); // Update category
// router.delete('/api/categories/:categoryId', deleteCategory); // Delete category

export default router;

// import express from 'express';
// import loginAdminController from './controllers/loginAdminController.js';  // Import login admin controller

// const router = express.Router();

// // POST /admin/login route for admin login
// router.post('/api/admin/login', loginAdminController);

// export default router;
