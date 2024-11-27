import express from 'express';
import { registerUser } from '../controllers/registerController.js';
import loginUser from '../controllers/loginController.js';
import { protect } from '../middleware/authMiddleware.js'; // Import protect middleware

const router = express.Router();

// Register user
router.post('/register', registerUser);

// Login user
router.post('/login', loginUser);

// Test protected route (requires authentication)
router.get('/testprotect', protect, (req, res) => {
  res.json({ message: 'You are authenticated!', user: req.user });
});

export default router;
