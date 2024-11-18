const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // For hashing passwords
const validator = require('validator'); // For input validation
const { nanoid } = require('nanoid'); // For generating unique user IDs

// Address schema
const addressSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      default: '',
      minlength: [3, 'Street address should be at least 3 characters']
    },
    province: {
      type: String,
      default: '',
      minlength: [2, 'Province should be at least 2 characters']
    },
    country: {
      type: String,
      default: '',
      minlength: [2, 'Country should be at least 2 characters']
    },
    zipcode: {
      type: String,
      default: '',
      validate: {
        validator: (value) => /^[1-9][0-9]{4}$/.test(value),
        message: 'Please provide a valid 5-digit postal code'
      }
    },
    recipientFullName: {
      type: String,
      required: [true, 'Recipient full name is required'],
      minlength: [3, 'Recipient full name should be at least 3 characters']
    },
    recipientPhone: {
      type: String,
      required: [true, 'Recipient phone number is required'],
      validate: {
        validator: (value) => /^(0[1-9]{1})\d{8}$/.test(value), // Thai phone number format (starts with 0 and 9 digits)
        message: 'Please provide a valid Thai phone number'
      }
    },
    isDefault: {
      type: Boolean,
      default: false // Default to false (this address is not the default address by default)
    }
  },
  {
    _id: false, // Prevents the creation of an _id for each address (since we don't need it)
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } // Add timestamps to track creation and updates
  }
);

// Define user schema
const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true, // Ensuring unique user ID
      default: () => nanoid(10) // Generates a unique 10-character ID for each user
    },
    googleId: {
      type: String, // Store the unique Google user ID (sub field in Google OAuth response)
      unique: true,
      sparse: true // Allows googleId to be null for users who don't sign in via Google
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true, // Ensuring username is unique
      minlength: [3, 'Username should be at least 3 characters'],
      maxlength: [30, 'Username should be less than 30 characters'],
      trim: true,
      lowercase: true // To store username in lowercase
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password should be at least 8 characters'],
      select: false // Don't return the password by default when querying users
    },
    fullname: {
      type: String,
      required: [true, 'Full name is required'],
      minlength: [2, 'Full name should be at least 2 characters']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: 'Please provide a valid email address'
      }
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'] // Limit gender to three options
    },
    dateOfBirth: {
      type: Date,
      validate: {
        validator: (value) => value < Date.now(), // Ensure DOB is in the past
        message: 'Date of birth cannot be in the future'
      }
    },
    zipcode: {
      type: String,
      default: '',
      validate: {
        validator: (value) => /^[1-9][0-9]{4}$/.test(value),
        message: 'Please provide a valid 5-digit postal code'
      }
    },
    phone: {
      type: String,
      validate: {
        validator: (value) => validator.isMobilePhone(value),
        message: 'Please provide a valid phone number'
      }
    },
    profilePicture: {
      type: String,
      validate: {
        validator: (value) => validator.isURL(value),
        message: 'Please provide a valid URL for the profile picture'
      }
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    // Array to store multiple addresses
    addresses: {
      type: [addressSchema], // Using the address schema to store multiple addresses
      default: []
    },
    lastLogin: {
      type: Date,
      default: null
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'suspended'],
      default: 'active'
    }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } // Custom timestamp field names
  }
);

// Password hashing middleware
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Only hash password if it's modified
  try {
    const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds
    this.password = await bcrypt.hash(this.password, salt); // Hash the password
    next();
  } catch (error) {
    next(error); // Pass errors to the next middleware
  }
});

// Password comparison method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password); // Compare the entered password with the stored hashed password
};

// Create and export User model
const User = mongoose.model('User', userSchema);

module.exports = User;
