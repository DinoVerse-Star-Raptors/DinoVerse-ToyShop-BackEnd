// Import dependencies using ES Module syntax
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import process from 'process';
import ageRoutes from './routes/ageRoutes.js'; // Import the routes (add .js extension)
import devRoutes from './routes/devRoutes.js';
import productRoutes from './routes/getProducts.js';
import adminRoutes from './routes/admin.js';
import path from 'path';
// import logger from './config/logger.js';

// Load environment variables
dotenv.config();

const app = express();

// Middleware to disable caching for all responses
app.use((_, res, next) => {
  // console.log(`Request received: ${req.method} ${req.url}`);
  res.setHeader(
    'Cache-Control',
    'no-store, no-cache, must-revalidate, proxy-revalidate'
  );
  res.setHeader('Pragma', 'no-cache'); // For HTTP/1.0 compatibility
  res.setHeader('Expires', '0'); // Date in the past
  next();
});

// Serve static files (like favicon.ico) from the 'public' directory
app.use(express.static(path.join(process.cwd(), 'public')));

// Database connection
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce'; // Fallback to local MongoDB
mongoose
  .connect(dbURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

// Middleware to parse JSON requests
app.use(express.json());

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to handle GET requests to the root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to Dino Think on Vercel!');
  if (req) console.log('Welcome to Dino Think');
});

// app.get('/hello-world', (req, res) => {
//   try {
//     /* Start log */
//     logger.info(
//       {
//         method: req.method,
//         path: req.originalUrl,
//         queryParams: req.query,
//         username: 'Dino (from auth middleware)',
//         timestamp: new Date().toISOString()
//       },
//       'Received request'
//     );
//     /* End log */

//     const { query } = req;
//     if (query.animal === 'cat') {
//       throw { message: 'Cats are banned' };
//     }

//     /* Start log */
//     logger.info(
//       {
//         username: 'Dino (from auth middleware)',
//         timestamp: new Date().toISOString()
//       },
//       'Response success!'
//     );
//     /* End log */

//     res.status(200).send('success!');
//   } catch (err) {
//     /* Start log */
//     logger.customError(req, err);
//     /* End log */

//     res.status(400).send({
//       status: 'failure',
//       message: err.message
//     });
//   }
// });

// Basic health check endpoint
app.get('/api/health', (req, res) => {
  if (req) console.log('ok');
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

// Example API endpoints
app.get('/api', (req, res) => {
  if (req) console.log('Welcome to the API');
  res.json({ message: 'Welcome to the API' });
});

// Use the routes 2024-11-16
app.use('/api/age-tags', ageRoutes); // Add the routes to the app
app.use('/api/dev-tags', devRoutes);
app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);

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

// Handle serverless environment
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;
