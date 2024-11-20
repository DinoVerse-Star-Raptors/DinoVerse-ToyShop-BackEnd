// Import dependencies using ES Module syntax
import express from 'express';
import ageRoutes from '../routes/ageRoutes.js'; // Import the routes (add .js extension)
import devRoutes from '../routes/devRoutes.js';
import productRoutes from '../routes/getProducts.js';
import adminRoutes from '../routes/admin.js';
// import logger from './config/logger.js';

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

export default router;

// import express from 'express';
// import { router as teacherRouter } from './teacherRouter.js';
// import { router as studentRouter } from './studentRouter.js';

// const router = express.Router();

// router.get('/', (req, res) => {
//   res.json('Hello, world! This is API');
// });

// router.use('/teacher', teacherRouter);
// router.use('/student', studentRouter);

// export default router;

// Middleware to handle GET requests to the root endpoint
// app.get('/', (req, res) => {
//   res.send('Welcome to Dino Think on Vercel!');
//   if (req) console.log('Welcome to Dino Think');
// });

// // Basic health check endpoint
// app.get('/api/health', (req, res) => {
//   if (req) console.log('ok');
//   res.status(200).json({
//     status: 'ok',
//     timestamp: new Date().toISOString()
//   });
// });

// // Example API endpoints
// app.get('/api', (req, res) => {
//   if (req) console.log('Welcome to the API');
//   res.json({ message: 'Welcome to the API' });
// });

// // Use the routes 2024-11-16
// app.use('/api/age-tags', ageRoutes); // Add the routes to the app
// app.use('/api/dev-tags', devRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/admin', adminRoutes);

// // Example protected route
// app.get('/api/protected', authenticateRequest, (req, res) => {
//   res.json({ message: 'Access granted to protected route' });
//   if (req) console.log('Access granted to protected route');
// });

// app.post('/api/data', async (req, res) => {
//   try {
//     const { data } = req.body;
//     // Process the data here
//     res.status(201).json({
//       success: true,
//       message: 'Data received successfully',
//       data
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Error processing request',
//       error: error.message
//     });
//   }
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({
//     success: false,
//     message: 'Something went wrong!',
//     error:
//       process.env.NODE_ENV === 'development'
//         ? err.message
//         : 'Internal server error'
//   });
//   if (req && next) console.log('Internal server error');
// });

// // 404 handler
// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     message: 'Route not found'
//   });
//   if (req) console.log('Route not found');
// });

// // Basic authentication middleware
// function authenticateRequest(req, res, next) {
//   const authHeader = req.headers.authorization;

//   if (!authHeader) {
//     return res.status(401).json({
//       success: false,
//       message: 'Authorization header is required'
//     });
//   }

//   // Implement your authentication logic here
//   // Example: Bearer token validation
//   const token = authHeader.split(' ')[1];
//   if (!token) {
//     return res.status(401).json({
//       success: false,
//       message: 'Invalid token format'
//     });
//   }

//   // Verify token here
//   // For production, use proper JWT validation or your preferred auth method
//   next();
// }
