import mongoose from 'mongoose';
import fs from 'fs/promises';
import Product from './models/Product.js'; // Import your product model
import dotenv from 'dotenv'; // Load environment variables from .env file
import process from 'process';

dotenv.config(); // Load environment variables

// Function to connect to MongoDB
const connectToDatabase = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error('MongoDB URI is not defined in .env file');
    process.exit(1); // Exit if no URI
  }

  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1); // Exit on connection failure
  }
};

// Function to update product descriptions
const updateProductDescriptions = async (descriptions) => {
  for (let product of descriptions) {
    const { productId, description } = product;

    try {
      // Find the product by productId
      const productDoc = await Product.findOne({ productId: productId });

      if (productDoc) {
        // Update the description
        productDoc.description = description;

        // Save the updated product
        await productDoc.save();
        console.log(`Product ID ${productId} updated successfully`);
      } else {
        console.log(`Product ID ${productId} not found in the database`);
      }
    } catch (error) {
      console.error(`Error updating product ID ${productId}:`, error);
    }
  }
};

// Function to read the descriptions from the JSON file
const readDescriptionsFromFile = async () => {
  try {
    const data = await fs.readFile('description.json', 'utf8');
    return JSON.parse(data);
  } catch (err) {
    throw new Error('Error reading descriptions.json file: ' + err);
  }
};

// Main function to run the update
const updateAllProducts = async () => {
  try {
    await connectToDatabase(); // Connect to MongoDB
    const descriptions = await readDescriptionsFromFile(); // Read descriptions from file
    await updateProductDescriptions(descriptions); // Update the descriptions in MongoDB
    mongoose.disconnect(); // Disconnect from MongoDB once done
  } catch (error) {
    console.error('Error in updating products:', error);
    mongoose.disconnect(); // Ensure disconnect on error
  }
};

// Start the update process
updateAllProducts();
