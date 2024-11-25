import User from '../models/Account.js'; // Import the User model
import { nanoid } from 'nanoid'; // For generating random IDs
import { StatusCodes } from 'http-status-codes'; // HTTP status codes
import dotenv from 'dotenv'; // To load environment variables
// import process from 'process';

dotenv.config(); // Load environment variables from .env file

// Register new user function
export const registerUser = async (req, res) => {
  try {
    const { username, password, fullname, email, profilePictureURL } = req.body;

    // Validate required fields
    if (!username || !password || !fullname || !email || !profilePictureURL) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message:
          'Please provide all required fields, including a valid profile picture URL.'
      });
    }

    // Check if user already exists (by email or username)
    const userExists = await User.findOne({
      $or: [{ email }, { username }]
    });
    if (userExists) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message:
          userExists.email === email
            ? 'Email already in use.'
            : 'Username already in use.'
      });
    }

    // Create and save the new user
    const newUser = new User({
      userId: nanoid(10),
      username,
      password,
      fullname,
      email,
      profilePicture: profilePictureURL
    });

    try {
      await newUser.save();
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Error saving the user to the database.'
      });
    }

    // Respond with the user details
    res.status(StatusCodes.CREATED).json({
      message: 'User registered successfully.',
      user: {
        userId: newUser.userId,
        username: newUser.username,
        fullname: newUser.fullname,
        email: newUser.email,
        profilePicture: profilePictureURL,
        status: newUser.status
      }
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Server error occurred while registering user.'
    });
  }
};
