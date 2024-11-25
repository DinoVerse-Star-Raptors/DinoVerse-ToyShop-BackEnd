import User from '../models/Account.js'; // Assuming User is the mongoose model
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes'; // For better status codes
import dotenv from 'dotenv'; // To load environment variables
import process from 'process';
import { z } from 'zod'; // Import Zod for validation

// Define a schema for validating the input
const loginSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  password: z.string().min(1, { message: 'Password is required' })
});

dotenv.config(); // Load environment variables from .env file

// User Login Controller to authenticate user and issue JWT
const loginUserController = async (req, res) => {
  try {
    const salt = process.env.PASSWORD_SALT || 'salt'; // Default salt value

    try {
      loginSchema.parse(req.body); // This will throw an error if validation fails
    } catch (e) {
      if (e instanceof z.ZodError) {
        // Extract detailed validation error messages from Zod and return a user-friendly response
        const errorMessages = e.errors.map((err) => err.message); // Collect all error messages
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: 'Username and password are required',
          errors: errorMessages
        }); // Return errors
      }
      // Handle unexpected errors
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Something went wrong' });
    }

    const validationResult = loginSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: validationResult.error.errors[0].message });
    }

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

    // Step 4: Compare the provided password with the stored hashed password
    const isPasswordMatch = await bcrypt.compare(
      password + salt,
      user.password
    );

    // Step 5: Handle password mismatch
    if (!isPasswordMatch) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: 'Invalid username or password -' + password + salt
      });
    }

    // Step 6: Generate JWT token for user
    const token = jwt.sign(
      {
        userId: user._id, // Add user ID to payload
        username: user.username, // Add username to payload
        isAdmin: user.isAdmin.statusAdmin // Add admin status to payload (if needed for any reason)
      },
      process.env.JWT_SECRET, // Secret key from .env file
      { expiresIn: '1h' } // Token expiration time (1 hour)
    );

    // Step 7: Successfully logged in - Return user info and JWT token
    res.status(StatusCodes.OK).json({
      message: 'User login successful',
      token, // Return the JWT token
      userId: user._id, // Return the user ID
      username: user.username, // Return the username
      fullname: user.fullname, // Return the fullname
      email: user.email // Return the email
      //   isAdmin: user.isAdmin.statusAdmin // Optionally return the admin status (if relevant)
    });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'An error occurred during login',
      error: error.message
    });
  }
};

export default loginUserController;
