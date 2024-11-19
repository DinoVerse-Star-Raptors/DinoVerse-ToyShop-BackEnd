// import mongoose from 'mongoose';
// import Product from './models/Product.js'; // Assuming Product model is exported from models/product.js
// import Tag from './models/Tag.js'; // Assuming Tag model is exported from models/tag.js
// import dotenv from 'dotenv'; // Import dotenv to load environment variables
// import process from 'process';

// dotenv.config(); // Load environment variables from .env file

// // Connect to MongoDB using mongoose
// const connectToDatabase = async () => {
//   const uri = process.env.MONGODB_URI;

//   if (!uri) {
//     console.error('MongoDB URI is not defined in .env file');
//     process.exit(1); // Exit if no URI
//   }

//   try {
//     await mongoose.connect(uri);
//     console.log('Connected to MongoDB');
//   } catch (error) {
//     console.error('Failed to connect to MongoDB:', error);
//     process.exit(1); // Exit on connection failure
//   }
// };

// // Function to update the ageGroupTagHandle for all products based on ageGroup
// const updateAllProductsAgeGroupTagHandle = async () => {
//   try {
//     // Fetch all products to process
//     const products = await Product.find({}); // Get all products

//     if (!products.length) {
//       console.log('No products found');
//       return;
//     }

//     for (const product of products) {
//       // Try to find the tag whose name matches the product's ageGroup
//       const tag = await Tag.findOne({ name: product.ageGroup });

//       if (!tag) {
//         // If no matching tag is found, set ageGroupTagHandle to null
//         product.ageGroupTagHandle = null;
//         console.log(
//           `No tag found for ageGroup '${product.ageGroup}', setting ageGroupTagHandle to null`
//         );
//       } else {
//         // Update the product's ageGroupTagHandle to the matching tag's handle
//         product.ageGroupTagHandle = tag.handle;
//         console.log(
//           `Found tag for ageGroup '${product.ageGroup}', updating ageGroupTagHandle`
//         );
//       }

//       // Save the updated product document
//       await product.save();
//     }

//     console.log('Successfully updated ageGroupTagHandle for all products');
//   } catch (err) {
//     console.error('Error updating ageGroupTagHandle for all products:', err);
//   }
// };

// // Example usage: Run the update function for all products
// const runUpdate = async () => {
//   await connectToDatabase(); // Connect to MongoDB
//   await updateAllProductsAgeGroupTagHandle(); // Update ageGroupTagHandle for all products
// };

// // Run the update process
// runUpdate();
