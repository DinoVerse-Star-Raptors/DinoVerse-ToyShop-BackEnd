// Import dependencies using ES Module syntax
import express from 'express';
import { getActiveAgeTags } from '../controllers/ageController.js'; // Import the controller (add .js extension)
const router = express.Router();

// Define the route with the /api/v1/ prefix
router.get('/', getActiveAgeTags); // Ensure the /api/v1/ prefix is added

export default router; // Export the router
