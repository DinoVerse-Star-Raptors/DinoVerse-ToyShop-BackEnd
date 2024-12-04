import express from 'express';
import mongoose from 'mongoose';
import addressSchema from '../models/Address.js'; // Import the address schema

const router = express.Router();

// Create a model for the address using the schema
const Address = mongoose.model('Address', addressSchema);

// Example API endpoints
router.get('/', (req, res) => {
  if (req) console.log('Welcome to the Validate');
  res.json({ message: 'Welcome to the Validate' });
});

// Validate address endpoint
router.post('/address', async (req, res) => {
  try {
    const addressData = req.body; // Get address data from request body

    // Validate using the Mongoose model
    const address = new Address(addressData);
    await address.validate();

    // If validation is successful, return a success response
    return res.status(200).json({ message: 'Address is valid' });
  } catch (error) {
    // If validation fails, return error details
    return res
      .status(400)
      .json({ message: 'Invalid address', errors: error.errors });
  }
});

export default router;
