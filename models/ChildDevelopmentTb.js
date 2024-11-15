const mongoose = require('mongoose');

// Define schema for child development categories
const childDevelopmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image_url: { type: String, required: true },
});

// Create the model
const ChildDevelopment = mongoose.model(
  'ChildDevelopment',
  childDevelopmentSchema
);

module.exports = ChildDevelopment;
