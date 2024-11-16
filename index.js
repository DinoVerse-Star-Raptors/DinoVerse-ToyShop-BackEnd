// /api/index.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

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

// Basic health check endpoint
app.get('/api/health', (req, res) => {
  if (req) console.log('ok');
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

// Example protected route
app.get('/api/protected', authenticateRequest, (req, res) => {
  res.json({ message: 'Access granted to protected route' });
  if (req) console.log('Access granted to protected route');
});

// Example API endpoints
app.get('/api', (req, res) => {
  if (req) console.log('Welcome to the API');
  res.json({ message: 'Welcome to the API' });
});

app.post('/api/data', async (req, res) => {
  try {
    const { data } = req.body;
    // Process the data here
    res.status(201).json({
      success: true,
      message: 'Data received successfully',
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error processing request',
      error: error.message,
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error:
      process.env.NODE_ENV === 'development'
        ? err.message
        : 'Internal server error',
  });
  if (req && next) console.log('Internal server error');
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
  if (req) console.log('Route not found');
});

// Basic authentication middleware
function authenticateRequest(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: 'Authorization header is required',
    });
  }

  // Implement your authentication logic here
  // Example: Bearer token validation
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Invalid token format',
    });
  }

  // Verify token here
  // For production, use proper JWT validation or your preferred auth method
  next();
}

// Handle serverless environment
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;

// https://typicode.github.io/husky/get-started.html
