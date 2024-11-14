const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the Admin Schema
const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Admin username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters long'],
    maxlength: [50, 'Username must be at most 50 characters long'],
  },
  email: {
    type: String,
    required: [true, 'Admin email is required'],
    unique: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Admin password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
  },
  role: {
    type: String,
    enum: ['admin', 'superadmin'], // You can have different roles like superadmin, admin, etc.
    default: 'admin',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
    default: null,
  },
});

// Pre-save hook to hash the password before saving the Admin model
AdminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare the entered password with the stored hashed password
AdminSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create Admin model
const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;
