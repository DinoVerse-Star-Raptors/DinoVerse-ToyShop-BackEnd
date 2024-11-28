import jwt from 'jsonwebtoken';
import User from '../models/Account.js'; // User model import
import { StatusCodes } from 'http-status-codes'; // Using HTTP status codes for better readability
import process from 'process';

/**
 * Middleware to check if the user is authenticated (JWT token validation)
 */
const protect = async (req, res, next) => {
  let token;

  // Check if Authorization header exists and starts with 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]; // Extract token from Bearer token

      // If no token found
      if (!token) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: 'No token, authorization denied' });
      }

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decoding JWT token

      // Check if token has expired manually
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      if (decoded.exp < currentTime) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: 'Token has expired' });
      }

      // Attach user data to the request object based on decoded userId
      req.user = await User.findById(decoded.userId).select('-password');

      // If user is not found in the database
      if (!req.user) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: 'User not found' });
      }

      // Proceed to next middleware or route handler
      next();
    } catch (error) {
      // Handle JWT verification errors
      if (error instanceof jwt.TokenExpiredError) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: 'Token has expired' });
      }

      if (error instanceof jwt.JsonWebTokenError) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: 'Invalid token' });
      }

      // General error handling for any other issues
      console.error(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Server error' });
    }
  } else {
    // If Authorization header is missing or token is invalid
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
    // If the user is an admin, proceed to the next middleware or route handler
    return next();
  } else {
    // If the user is not an admin, respond with a forbidden status
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ message: 'Not authorized as an admin' });
  }
};

export { protect, isAdmin };
