import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define the Address schema
const addressSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    street: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    zip: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true // Automatically adds createdAt and updatedAt fields
  }
);

// Create the Address model from the schema
const Address = mongoose.model('Address', addressSchema);

// Export the Address model using ES Module syntax
export default Address;
