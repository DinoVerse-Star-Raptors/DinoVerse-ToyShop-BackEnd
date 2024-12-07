// Import dependencies using ES Module syntax
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import process from 'process';
import path from 'path';

import routes from './routes/index.js';

// Load environment variables
dotenv.config();

const app = express();


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
// app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

// Handle serverless environment
const PORT = process.env.PORT || 5174;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
