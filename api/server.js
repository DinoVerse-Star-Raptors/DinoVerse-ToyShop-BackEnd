import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
// import jwt from 'jsonwebtoken';
import helmet from 'helmet';
import process from 'process';

// Initialize environment variables
dotenv.config();

// Create an Express application
const app = express();

// Middleware to parse JSON and add security headers
app.use(express.json());
app.use(helmet());

// Database connection
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce';
mongoose
  .connect(dbURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

// Admin authentication middleware
// const isAdmin = (req, res, next) => {
//   const token = req.headers['authorization']?.split(' ')[1];
//   if (!token) return res.status(403).json({ message: 'Forbidden' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (decoded.role !== 'admin')
//       return res.status(403).json({ message: 'Forbidden' });
//     next();
//   } catch (err) {
//     res.status(403).json({ message: 'Invalid or expired token' });
//   }
// };

// Example route
app.get('/', (req, res) => {
  res.send('This is my callback function');
});

// Sample route (uncomment once you have route files)
import productRoutes from './routes/products.js';
app.use('/api/products', productRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
  if (next && req) console.log('next');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Graceful shutdown on SIGINT
process.on('SIGINT', () => {
  mongoose.disconnect().then(() => {
    console.log('MongoDB connection closed');
    process.exit();
  });
});

// const express = require('express');
// const app = express();
// require('dotenv').config(); // Load environment variables from .env file
// // // const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// // const productRoutes = require('./routes/products');
// // const userRoutes = require('./routes/user'); // Import user routes
// // const authRoutes = require('./routes/auth'); // Import auth routes
// // const cartRoutes = require('./routes/cart'); // Import cart routes
// // const orderRoutes = require('./routes/orders'); // Import order routes
// // const adminRoutes = require('./routes/adminRoutes'); // Admin routes file
// // const errorMiddleware = require('./middleware/errorMiddleware'); // Import error handling middleware

// // Middleware to parse JSON
// app.use(express.json());
// // // Body parser middleware to parse JSON data
// // app.use(bodyParser.json());

// // Database connection
// const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce'; // Fallback to local MongoDB
// mongoose
//   .connect(dbURI)
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((err) => console.error('Failed to connect to MongoDB:', err));

// const myCallback = (req, res) => {
//   res.send('This is my callback function');
// };

// app.get('/', myCallback);

// // Example route
// // app.get('/', (req, res) => {
// //   if (req) res.send('Hello World!');
// // });

// // app.use('/api/products', productRoutes); // Product routes
// // app.use('/api/auth', authRoutes); // Auth routes
// // app.use('/api/cart', cartRoutes); // Cart routes
// // app.use('/api/orders', orderRoutes); // Order routes
// // app.use('/api/users', userRoutes); // User routes

// // // Admin route middleware
// // // Use a simple admin authentication middleware (adjust as per your actual authentication logic)
// // const isAdmin = (req, res, next) => {
// //   // Simple check for admin token or role, for illustration purposes
// //   if (req.headers['x-admin-token'] === process.env.ADMIN_TOKEN) {
// //	 return next();
// //   }
// //   res
// //	 .status(403)
// //	 .json({ success: false, message: 'Forbidden: Admin access required' });
// // };

// // // Use admin authentication middleware globally for all admin routes
// // app.use('/api/admin', isAdmin);

// // // Admin routes
// // app.use('/api/admin', adminRoutes);

// // // Use error middleware at the end of all routes
// // app.use(errorMiddleware);

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// // const PORT = process.env.PORT || 5000;
// // mongoose
// //   .connect(process.env.MONGODB_URI, {
// //	 useNewUrlParser: true,
// //	 useUnifiedTopology: true,
// //   })
// //   .then(() =>
// //	 app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
// //   )
// //   .catch((err) => console.error('MongoDB connection error: ', err));
