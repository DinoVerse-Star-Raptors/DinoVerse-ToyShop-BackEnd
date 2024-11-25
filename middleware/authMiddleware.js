import jwt from 'jsonwebtoken';
import User from '../models/User'; // Assuming you have a User model
import process from 'process';

/**
 * Middleware to check if the user is authenticated (JWT token validation)
 */
const protect = async (req, res, next) => {
    let token;

    // Check if the token is provided in the Authorization header
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get the token from the Authorization header
            token = req.headers.authorization.split(' ')[1]; // Remove "Bearer" prefix

            // Verify the token using the secret key
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach user information to the request object (for further use in routes)
            req.user = await User.findById(decoded.id).select('-password'); // Exclude password from user object

            next(); // Pass control to the next middleware/route handler
        } catch (err) {
            console.error(err);
            res.status(401).json({ message: 'Not authorized, token failed' }); // Unauthorized
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' }); // Unauthorized if no token is present
    }
};

/**
 * Middleware to check if the user is an admin
 */
const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next(); // User is admin, proceed to the next middleware/route handler
    } else {
        res.status(403).json({ message: 'Not authorized as an admin' }); // Forbidden
    }
};

export { protect, isAdmin };
