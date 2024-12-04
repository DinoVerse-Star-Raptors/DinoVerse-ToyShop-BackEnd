import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      default: '',
      minlength: [3, 'Address should be at least 3 characters']
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
        validator: (value) => /^(0[1-9]{1})\d{8}$/.test(value), // Thai phone number format
        message: 'Please provide a valid Thai phone number'
      }
    },
    isDefault: {
      type: Boolean,
      default: false // Default to false (this address is not the default address by default)
    }
  },
  {
    // _id: false, // Prevents the creation of an _id for each address
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } // Add timestamps to track creation and updates
  }
);

export default addressSchema;
