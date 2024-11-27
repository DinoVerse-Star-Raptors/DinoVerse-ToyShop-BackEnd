import jwt from 'jsonwebtoken';
import User from '../models/Account.js'; // User model import
import process from 'process';
import { StatusCodes } from 'http-status-codes'; // Using HTTP status codes for better readability

/**
 * Middleware to check if the user is authenticated (JWT token validation)
 */
const protect = async (req, res, next) => {
  // Initialize token variable
  let token;

  // Check if the Authorization header exists and starts with 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract token from Authorization header
      token = req.headers.authorization.split(' ')[1]; // Removes "Bearer" prefix

      // Verify the token using the secret key stored in environment variables
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user by ID (exclude the password field)
      req.user = await User.findById(decoded.id).select('-password');

      // Proceed to the next middleware/route handler
      next();
    } catch (err) {
      console.error('Token verification failed:', err);
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'Not authorized, token failed' });
    }
  } else {
    // If token is missing or invalid
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Not authorized, no token' });
  }
};

/**
 * Middleware to check if the user is an admin
 */
const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    // If the user is an admin, proceed to the next middleware/route handler
    return next();
  } else {
    // If the user is not an admin, respond with a forbidden status
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ message: 'Not authorized as an admin' });
  }
};

export { protect, isAdmin };
