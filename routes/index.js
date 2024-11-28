// Import dependencies using ES Module syntax
import express from 'express';
import ageRoutes from '../routes/ageRoutes.js'; // Import the routes (add .js extension)
import devRoutes from '../routes/devRoutes.js';
import productRoutes from '../routes/getProducts.js';
import adminRoutes from '../routes/admin.js';
import registerRoute from '../routes/register.js';
import userRoutes from '../routes/user.js';
import cartRoutes from '../routes/cart.js';
// import logger from './config/logger.js';
// const session = require('express-session');

const router = express.Router();

// Middleware to handle GET requests to the root endpoint
router.get('/', (req, res) => {
  res.send('Welcome to Dino Think on Vercel!');
  if (req) console.log('Welcome to Dino Think');
});

// Basic health check endpoint
router.get('/api/health', (req, res) => {
  if (req) console.log('ok');
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

// Example API endpoints
router.get('/api', (req, res) => {
  if (req) console.log('Welcome to the API');
  res.json({ message: 'Welcome to the API' });
});

// Use the routes 2024-11-16
router.use('/api/age-tags', ageRoutes); // Add the routes to the app
router.use('/api/dev-tags', devRoutes);
router.use('/api/products', productRoutes);
router.use('/api/admin', adminRoutes);
router.use('/api/register', registerRoute);
router.use('/api/user', userRoutes);
router.use('/api/cart', cartRoutes);

export default router;
