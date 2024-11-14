const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file
const productRoutes = require('./routes/products');
const app = express();
const userRoutes = require('./routes/user'); // Import user routes
const {
  addAddress,
  getOrderHistory,
  addProductReview,
} = require('../controllers/userAuthController');
const authRoutes = require('./routes/auth'); // Import auth routes
const cartRoutes = require('./routes/cart'); // Import cart routes
const orderRoutes = require('./routes/orders'); // Import order routes
const errorMiddleware = require('./middleware/errorMiddleware'); // Import error handling middleware

// Middleware to parse JSON
app.use(express.json());

// Database connection
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce'; // Fallback to local MongoDB
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

// Example route
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/api/products', productRoutes); // Product routes
app.use('/api/auth', authRoutes); // Auth routes
app.use('/api/cart', cartRoutes); // Cart routes
app.use('/api/orders', orderRoutes); // Order routes
app.use('/api/users', userRoutes); // User routes

// Use error middleware at the end of all routes
app.use(errorMiddleware);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// const PORT = process.env.PORT || 5000;
// mongoose
//   .connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() =>
//     app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
//   )
//   .catch((err) => console.error('MongoDB connection error: ', err));
