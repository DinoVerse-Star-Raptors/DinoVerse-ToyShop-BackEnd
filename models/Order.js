import mongoose from 'mongoose';
import addressSchema from './Address.js'; // Import the address schema

// Define the OrderItem schema
const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }
});

// Define the Order schema
const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true
    },
    items: [orderItemSchema],
    amount: { type: Number, required: true },
    address: {
      type: addressSchema, // Use the addressSchema here for order addresses
      required: true
    },
    status: {
      type: String,
      required: true,
      default: 'Order Placed',
      enum: [
        'Order Placed',
        'Processing',
        'Shipped',
        'Delivered',
        'Cancelled',
        'Returned'
      ]
    },
    paymentMethod: { type: String, required: true },
    payment: { type: Boolean, required: true, default: false },
    date: { type: Number, required: true } // Can be a timestamp
  },
  {
    timestamps: true // Adds createdAt and updatedAt fields automatically
  }
);

// Create the Order model
const orderModel =
  mongoose.models.order || mongoose.model('Order', orderSchema);

// Export the Order model
export default orderModel;
