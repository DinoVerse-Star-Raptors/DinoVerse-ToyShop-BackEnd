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

// Admin Login Controller to authenticate admin and issue JWT
const loginAdminController = async (req, res) => {
  try {
    const salt = process.env.PASSWORD_SALT || 'salt';
    // const saltRounds = Number(process.env.SALT_ROUNDS) || 10;

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

    // Step 4: Check if user is an admin
    if (!user.isAdmin.statusAdmin) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: 'You are not authorized as an admin' });
    }

    // const saltHash = await bcrypt.genSalt(Number(saltRounds)); // Generate a salt with 10 rounds
    // const hash = bcrypt.hashSync(password + salt, saltHash);
    // if (password) {
    //   console.log(user.password, hash);
    //   return res.status(200).json({ message: hash });
    // }

    // Step 5: Compare the provided password with the stored hashed password
    const isPasswordMatch = await bcrypt.compare(
      password + salt,
      user.password
    );

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
