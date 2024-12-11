// Import dependencies using ES Module syntax
import express from 'express';
import ageRoutes from '../routes/ageRoutes.js'; // Import the routes (add .js extension)
import devRoutes from '../routes/devRoutes.js';
import productRoutes from '../routes/getProducts.js';
import userRoutes from '../routes/user.js';
import cartRoutes from '../routes/cart.js';
import orderRoutes from '../routes/orderRoutes.js';

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

router.use('/api/age-tags', ageRoutes); // แสดงสินค้า ตามอายุ
router.use('/api/dev-tags', devRoutes); //  แสดงสินค้า ตามพัฒนาการ
router.use('/api/products', productRoutes); // หน้า all products, หน้า product info
router.use('/api/user', userRoutes); // register and login
router.use('/api/cart', cartRoutes); // หน้า cart
router.use('/api/order', orderRoutes);

export default router;
