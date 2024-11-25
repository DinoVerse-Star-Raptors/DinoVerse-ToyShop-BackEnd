import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define the CartItem schema
const cartItemSchema = new Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // Reference to the Product model
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 1
  }
});

// Define the Cart schema
const cartSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true
    },
    items: [cartItemSchema]
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create the Cart model from the schema
const Cart = mongoose.model('Cart', cartSchema);

// Export the Cart model using ES Modules syntax
export default Cart;
