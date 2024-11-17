// routes/ageRoutes.js
const express = require('express');
const { getActiveAgeTags } = require('../controllers/ageController'); // Import the controller
const router = express.Router();

// Define the route with the /api/v1/ prefix
router.get('/api/age-tags', getActiveAgeTags); // Add the /api/v1/ part here

module.exports = router;
