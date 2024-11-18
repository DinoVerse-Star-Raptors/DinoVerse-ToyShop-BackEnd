import express from 'express';
import {
  register,
  login,
  getProfile,
  logout
} from '../controllers/authController';
import protect from '../middleware/auth'; // Protect routes with JWT authentication

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected route (only accessible with a valid JWT token)
router.get('/profile', protect, getProfile);

// Optional: Logout route (though logout is typically client-side)
router.post('/logout', logout);

export default router;
