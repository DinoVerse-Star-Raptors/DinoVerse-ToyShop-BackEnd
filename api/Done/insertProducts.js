// const mongoose = require('mongoose');
// const fs = require('fs');
// const Product = require('./models/Product'); // Import your product model
// require('dotenv').config(); // Load environment variables from .env file

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

// // Function to merge product data and image data and insert them into MongoDB
// async function mergeAndInsertProducts() {
//   try {
//     // Read the product.json and img.json files
//     const productsData = JSON.parse(fs.readFileSync('product.json', 'utf8'));
//     const imgData = JSON.parse(fs.readFileSync('img.json', 'utf8'));

//     // Create a map of productId -> imageUrl from img.json
//     const imageMap = imgData.reduce((map, item) => {
//       map[item.productId] = item.imageUrl;
//       return map;
//     }, {});

//     // Merge the imageUrl from img.json into product data from product.json
//     const mergedProducts = productsData.map((product) => {
//       const imageUrl = imageMap[product.productId];
//       if (imageUrl) {
//         product.imageUrl = imageUrl; // Add imageUrl to the product object
//       }
//       return product;
//     });

//     // Insert the merged products into the Product collection
//     const result = await Product.insertMany(mergedProducts);
//     console.log(`${result.length} products inserted successfully.`);
//   } catch (error) {
//     console.error('Error merging or inserting data:', error);
//   }
// }

// // Main function to handle the entire process
// async function main() {
//   await connectToDatabase(); // Ensure MongoDB connection

//   // After connecting to the database, proceed with merging and inserting products
//   await mergeAndInsertProducts();
// }

// // Call the main function to run the script
// main();
