import mongoose from 'mongoose';
import dotenv from 'dotenv'; // Import dotenv to use environment variables
import process from 'process';

// Load environment variables from .env file
dotenv.config();

// Function to connect to MongoDB using Mongoose
const connectDB = async () => {
    try {
        // Get MongoDB URI from environment variables
        const mongoURI =
            process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce'; // Use local URI as fallback

        // Connect to MongoDB
        const conn = await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit process with failure if connection fails
    }
};

// Export the connection function as default
export default connectDB;
