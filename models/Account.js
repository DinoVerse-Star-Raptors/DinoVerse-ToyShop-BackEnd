import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; // For hashing passwords
import validator from 'validator'; // For input validation
import { nanoid } from 'nanoid'; // For generating unique user IDs
import process from 'process';
import dotenv from 'dotenv'; // To load environment variable
// import addressSchema from './Address.js'; // Import the address schema

dotenv.config(); // Load environment variables from .env file

// Address schema
const addressSchema = new mongoose.Schema(
  {
    address: { type: String, default: '', minlength: [3, 'Street address should be at least 3 characters'] },
    province: { type: String, default: '', minlength: [2, 'Province should be at least 2 characters'] },
    country: { type: String, default: '', minlength: [2, 'Country should be at least 2 characters'] },
    zipcode: { type: String, default: '',
      validate: {
        validator: (value) => /^[1-9][0-9]{4}$/.test(value),
        message: 'Please provide a valid 5-digit postal code'
      }
    },
    recipientFullName: { type: String, required: [true, 'Recipient full name is required'], 
      minlength: [3, 'Recipient full name should be at least 3 characters']},
    recipientPhone: { type: String, required: [true, 'Recipient phone number is required'],
      validate: {
        validator: (value) => /^(0[1-9]{1})\d{8}$/.test(value), // Thai phone number format
        message: 'Please provide a valid Thai phone number'
      }},
    isDefault: { type: Boolean, default: false } // Default to false (this address is not the default address by default)
  },
  {
    _id: false, // Prevents the creation of an _id for each address
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } // Add timestamps to track creation and updates
  }
);

// Define user schema
const userSchema = new mongoose.Schema(
  { userId: { type: String, required: true, unique: true, // Ensuring unique user ID
      default: () => nanoid(10) // Generates a unique 10-character ID for each user
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
      select: true // Don't return the password by default when querying users
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
      enum: ['male', 'female', 'other', 'prefer not to say'],
      default: 'prefer not to say' // Default gender choice to be neutral and optional
    },
    dateOfBirth: {
      type: Date,
      validate: {
        validator: (value) => value < Date.now(), // Ensure DOB is in the past
        message: 'Date of birth cannot be in the future'
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
      type: String
      //   validate: {
      //     validator: (value) => validator.isURL(value),
      //     message: 'Please provide a valid URL for the profile picture'
      //   }
    },
    addresses: {
      type: [addressSchema], // Using the imported address schema to store multiple addresses
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
    },
    isDelete: {
      type: Boolean,
      default: false // Default value is false, meaning the user is not deleted
    },
    isAdmin: {
      type: {
        statusAdmin: {
          type: Boolean,
          default: false // Default value is false, not an admin
        },
        setAdminBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User', // Reference to the user who set the admin role
          required: function () {
            return this.statusAdmin;
          } // Ensure it's set only when isAdmin.status is true
        },
        setAdminDate: {
          type: Date,
          default: function () {
            return this.statusAdmin ? new Date() : null;
          } // Set the current date when isAdmin.status is true
        }
      },
      default: {} // Default empty object
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
    const salt = process.env.PASSWORD_SALT || 'salt';
    const saltRounds = Number(process.env.SALT_ROUNDS) || 10;
    this.password = await bcrypt.hash(this.password + salt, saltRounds); // Hash the password
    next();
  } catch (error) {
    next(error); // Pass errors to the next middleware
  }
});

// Create and export User model
const User = mongoose.model('User', userSchema);

// Export the User model
export default User;
