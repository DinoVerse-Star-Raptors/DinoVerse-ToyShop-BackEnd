// Import dependencies using ES Module syntax
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
// Cross-Site Request Forgery (CSRF)
// const csrf = require('express-csrf-token');
import dotenv from 'dotenv';
import process from 'process';
import path from 'path';
import routes from './routes/index.js';
// import bodyParser from 'body-parser';
// import formidable from 'express-formidable';
// import bodyParser from 'body-parser';

// var bodyParser = require('body-parser');

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

// Serve static files from the 'public' directory
// app.use('/uploads', express.static(path.join(process.cwd(), 'public/uploads')));

// Database connection
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce'; // Fallback to local MongoDB
mongoose
  .connect(dbURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

app.use(
  cors({
    origin: ['http://localhost:3000', 'https://dinoface.vercel.app'] // Allow both origins
  })
);

// Middleware
// app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

// Handle serverless environment
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;
