import jwt from 'jsonwebtoken';
import User from '../models/Account.js'; // Assuming User is the mongoose model
import { StatusCodes } from 'http-status-codes'; // Optional: for better status codes
import process from 'process';

// Middleware to verify the JWT token and check if the user is an admin
const isAdmin = async (req, res, next) => {
    // Get the token from the Authorization header (usually in Bearer token format)
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message: 'No token, authorization denied'
        });
    }

    try {
        // Verify the token using the JWT_SECRET stored in process.env
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user based on the decoded userId
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: 'User not found'
            });
        }

        // Check if the user has admin privileges
        if (user.isAdmin?.statusAdmin !== true) {
            return res.status(StatusCodes.FORBIDDEN).json({
                message: 'Access denied, not an admin'
            });
        }

        // Attach the user to the request object so other route handlers can access it
        req.user = user;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        // Handle JWT verification errors
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message: 'Invalid token, authorization denied',
            error: error.message
        });
    }
};

export default isAdmin;
