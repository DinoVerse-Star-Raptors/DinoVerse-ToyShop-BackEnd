// Import express and the router in ES Module syntax
import express from 'express';
const router = express.Router();

// Import the controller using ES Module syntax (add .js extension)
import { getActiveDevTags } from '../controllers/devController.js'; // Adjust the path as needed

// Define the route for fetching active tags with parentTagNumber 107
router.get('/', getActiveDevTags); // Add /api/v1/ for the API versioning

// Export the router using ES Module syntax
export default router;
