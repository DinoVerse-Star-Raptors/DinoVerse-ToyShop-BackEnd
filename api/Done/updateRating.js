// import crypto from 'crypto';

// const secretKey = crypto.randomBytes(64).toString('hex');
// console.log(secretKey); // This is your JWT secret, keep it safe

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

// Function to update product ratings from the ratings.json file
const updateRatings = async () => {
  try {
    // Read the ratings.json file
    const ratingsData = await fs.readFile('rating.json', 'utf-8');
    const ratings = JSON.parse(ratingsData); // Parse the JSON data

    // Loop through each rating object and update the corresponding product in the database
    for (const rating of ratings) {
      const { productId, set } = rating;
      //   console.log(rating, productId, set);
      //   continue;
      const { rate, count, start1, start2, start3, start4, start5 } = set;

      const numRate = Number(rate);
      const numCount = Number(count);
      const numStart1 = Number(start1);
      const numStart2 = Number(start2);
      const numStart3 = Number(start3);
      const numStart4 = Number(start4);
      const numStart5 = Number(start5);

      // Log invalid values for debugging
      if (
        isNaN(numRate) ||
        isNaN(numCount) ||
        isNaN(numStart1) ||
        isNaN(numStart2) ||
        isNaN(numStart3) ||
        isNaN(numStart4) ||
        isNaN(numStart5)
      ) {
        console.error(
          `Invalid values for productId ${productId}: rate=${numRate}, count=${numCount}, start1=${numStart1}, start2=${numStart2}, start3=${numStart3}, start4=${numStart4}, start5=${numStart5}`
        );
        continue; // Skip this entry if any value is invalid
      }

      // Calculate the total reviews and total rating
      const totalReviews =
        numStart1 + numStart2 + numStart3 + numStart4 + numStart5;
      const totalRating =
        numStart1 * 1 +
        numStart2 * 2 +
        numStart3 * 3 +
        numStart4 * 4 +
        numStart5 * 5;

      // Calculate the average rating, default to numRate if totalReviews is 0
      const averageRating = totalReviews ? totalRating / totalReviews : numRate;
      // Update the product with the new rating
      const result = await Product.updateOne(
        { productId }, // Filter by productId
        {
          $set: {
            'rating.rate': averageRating,
            'rating.count': totalReviews,
            'rating.start1': start1,
            'rating.start2': start2,
            'rating.start3': start3,
            'rating.start4': start4,
            'rating.start5': start5
          }
        }
      );

      if (result.modifiedCount > 0) {
        console.log(
          `Product with productId ${productId} updated successfully.`
        );
      } else {
        console.log(
          `Product with productId ${productId} not found or already up-to-date.`
        );
      }
    }
  } catch (error) {
    console.error('Error updating ratings:', error);
  }
};

// Main function to run the script
const run = async () => {
  await connectToDatabase(); // Connect to the database
  await updateRatings(); // Update product ratings
};

run();
