import User from '../models/Account.js'; // Assuming User is the mongoose model
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes'; // For better status codes
import dotenv from 'dotenv'; // To load environment variables
import process from 'process';

dotenv.config(); // Load environment variables from .env file

// Admin Login Controller to authenticate admin and issue JWT
const loginAdminController = async (req, res) => {
  //   console.log(req.body);
  try {
    const { username, password } = req.body; // Get username and password from request body

    // Step 1: Validate input
    if (!username || !password) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Username and password are required' });
    }

    // Step 2: Find user by username
    const user = await User.findOne({ username });

    // Step 3: Check if user exists
    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'Invalid username or password' });
    }

    // Step 4: Check if user is an admin
    if (!user.isAdmin.statusAdmin || !user.password) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: 'You are not authorized as an admin' });
    }

    // Step 5: Compare the provided password with the stored hashed password
    // const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds
    // const hash = await bcrypt.hash(password, salt);
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    // if (password) {
    //   console.log(isPasswordMatch, user.password, hash);
    //   return res.status(200).json({ message: hash });
    // }

    // Step 6: Handle password mismatch
    if (!isPasswordMatch) {
      console.log(isPasswordMatch, user.password);
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'Invalid username or password' });
    }

    // Step 7: Generate JWT token for admin
    const token = jwt.sign(
      {
        userId: user._id, // Add user ID to payload
        username: user.username, // Add username to payload
        isAdmin: user.isAdmin.statusAdmin // Add admin status to payload
      },
      process.env.JWT_SECRET, // Secret key from .env file
      { expiresIn: '1h' } // Token expiration time (1 hour)
    );

    // Step 8: Successfully logged in - Return user info and JWT token
    res.status(StatusCodes.OK).json({
      message: 'Admin login successful',
      token, // Return the JWT token
      userId: user._id, // Return the user ID
      username: user.username, // Return the username
      fullname: user.fullname, // Return the fullname
      email: user.email, // Return the email
      isAdmin: user.isAdmin.statusAdmin // Return the admin status
    });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'An error occurred during login',
      error: error.message
    });
  }
};

export default loginAdminController;

// {
//   "username": "adminUser123",
//   "password": "adminPassword123"
// }

// {
//   "message": "Admin login successful",
//   "token": "your_generated_jwt_token_here",
//   "userId": "admin_user_id_here",
//   "username": "adminUser123"
// }
