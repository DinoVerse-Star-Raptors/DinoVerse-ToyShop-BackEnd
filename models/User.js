const mongoose = require('mongoose');

// Define the User Schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create a User model based on the schema
const User = mongoose.model('User', userSchema);

module.exports = User;

// If you're using Cloudinary
// const mongoose = require('mongoose');

// // Define the User Schema
// const userSchema = new mongoose.Schema(
//   {
//     username: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     image: {
//       type: String, // Store image URL or path (e.g., Cloudinary or local path)
//       required: false, // Image is optional during registration
//     },
//   },
//   { timestamps: true }
// );

// // Create a User model based on the schema
// const User = mongoose.model('User', userSchema);

// module.exports = User;
