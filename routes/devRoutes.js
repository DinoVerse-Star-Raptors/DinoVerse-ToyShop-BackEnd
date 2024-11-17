const express = require('express');
const router = express.Router();

// Import the controller
const { getActiveDevTags } = require('../controllers/devController'); // Adjust the path as needed

// Define the route for fetching active tags with parentTagNumber 107
router.get('/api/dev-tags', getActiveDevTags);

module.exports = router;
