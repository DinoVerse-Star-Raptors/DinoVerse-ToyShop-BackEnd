import mongoose from 'mongoose';
import Tag from './models/Tag'; // Your Mongoose model
import dotenv from 'dotenv'; // Load environment variables from .env file
import process from 'process';

// Load environment variables
dotenv.config();

// Connect to MongoDB using mongoose
const connectToDatabase = async () => {
    const uri = process.env.MONGO_URI;

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

// Update function to change `imageUrl` from `null` to `''`
const updateImageUrlToEmptyString = async () => {
    try {
        // Update all documents where `imageUrl` is null
        const result = await Tag.updateMany(
            { imageUrl: null }, // Match documents where imageUrl is null
            { $set: { imageUrl: '' } } // Set imageUrl to empty string
        );

        console.log(
            `Matched ${result.matchedCount} documents and modified ${result.modifiedCount} documents.`
        );
    } catch (error) {
        console.error('Error updating documents:', error);
    }
};

// Run the script
const run = async () => {
    await connectToDatabase();
    await updateImageUrlToEmptyString();
    mongoose.disconnect(); // Disconnect after the operation is complete
};

run();
