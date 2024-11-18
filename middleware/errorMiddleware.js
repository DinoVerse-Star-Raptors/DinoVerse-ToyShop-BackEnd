import process from 'process';
/**
 * Error handling middleware
 * This middleware will catch all errors and send a structured response.
 * It should be placed at the end of all other routes and middleware.
 */

const errorMiddleware = (err, req, res, next) => {
  // Log the error for debugging (you can add more logging functionality here)
  if (req && next) console.error(err);
  else console.error(err);

  // Default status code
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Handle specific errors
  if (err.name === 'ValidationError') {
    statusCode = 400; // Bad Request for validation errors
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(', ');
  }

  // Handle MongoDB duplicate key errors (e.g., for unique fields)
  if (err.code === 11000) {
    statusCode = 400; // Bad Request for duplicate keys
    message = `Duplicate key error: ${Object.keys(err.keyValue).join(', ')}`;
  }

  // Send the structured error response
  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack // Hide stack trace in production
  });
};

export default errorMiddleware;
