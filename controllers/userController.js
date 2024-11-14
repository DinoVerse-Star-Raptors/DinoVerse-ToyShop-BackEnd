const bcrypt = require('bcryptjs'); // For hashing passwords
const jwt = require('jsonwebtoken'); // For creating JSON Web Tokens
const User = require('../models/User'); // Assuming you have a User model
const Address = require('../models/Address');
const Order = require('../models/Order');
const Product = require('../models/Product');
const Review = require('../models/Review');

/**
 * Add a new address for the user
 */
const addAddress = async (req, res) => {
  const { name, street, city, state, zip, country, phone } = req.body;
  const userId = req.user.id; // Get user id from the request

  try {
    const newAddress = new Address({
      user: userId,
      name,
      street,
      city,
      state,
      zip,
      country,
      phone,
    });

    await newAddress.save();
    res
      .status(201)
      .json({ message: 'Address added successfully', address: newAddress });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Get all orders for the user (order history)
 */
const getOrderHistory = async (req, res) => {
  const userId = req.user.id;

  try {
    const orders = await Order.find({ user: userId }).populate(
      'items.product',
      'name price'
    );
    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Add a product review (rating and comment)
 */
const addProductReview = async (req, res) => {
  const { productId, rating, comment } = req.body;
  const userId = req.user.id;

  try {
    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if the user has already reviewed this product
    const existingReview = await Review.findOne({
      user: userId,
      product: productId,
    });
    if (existingReview) {
      return res
        .status(400)
        .json({ message: 'You have already reviewed this product' });
    }

    // Create a new review
    const review = new Review({
      user: userId,
      product: productId,
      rating,
      comment,
    });

    await review.save();

    // Add the review to the product's review array
    product.reviews.push(review._id);
    await product.save();

    res.status(201).json({ message: 'Review added successfully', review });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * User Registration - Sign Up
 */
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    // Send success response with the token
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * User Login
 */
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    // Send success response with the token
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Get User Profile (Logged In User)
 */
const getUserProfile = async (req, res) => {
  const userId = req.user.id; // Get user id from the request (set by auth middleware)

  try {
    // Find the user by ID and exclude the password field
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Update User Profile (Logged In User)
 */
const updateUserProfile = async (req, res) => {
  const userId = req.user.id; // Get user id from the request (set by auth middleware)
  const { name, email, password } = req.body;

  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) {
      // Hash the new password if provided
      user.password = await bcrypt.hash(password, 10);
    }

    // Save the updated user details to the database
    await user.save();

    // Send success response
    res.status(200).json({
      message: 'User profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Delete User Account (Logged In User)
 */
const deleteUserAccount = async (req, res) => {
  const userId = req.user.id; // Get user id from the request (set by auth middleware)

  try {
    // Find the user by ID and delete
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User account deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
  addAddress,
  getOrderHistory,
  addProductReview,
};

// const User = require("../models/User");

// // Controller function to add a new user
// const createUser = async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     const user = new User({
//       username,
//       email,
//       password, // You should hash the password before saving it in production!
//     });

//     await user.save(); // Save the user to MongoDB

//     res.status(201).json({ message: "User created successfully", user });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// module.exports = { createUser };
