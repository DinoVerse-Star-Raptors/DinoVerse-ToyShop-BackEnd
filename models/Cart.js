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
    default: 1,
    min: [1, 'Quantity must be at least 1'] // Ensure quantity is a positive number
  }
});

// Add method to calculate total price of a cart item
cartItemSchema.methods.getItemTotalPrice = async function () {
  const product = await mongoose.model('Product').findById(this.product);
  return product ? product.price * this.quantity : 0;
};

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

// Add a method to calculate the total price of the cart
cartSchema.methods.calculateTotal = async function () {
  let total = 0;
  for (const item of this.items) {
    total += await item.getItemTotalPrice();
  }
  return total;
};

// Add an index to the user field for faster querying
cartSchema.index({ user: 1 });

// Add a static method to get a cart by user
cartSchema.statics.findCartByUser = function (userId) {
  return this.findOne({ user: userId });
};

// Create the Cart model from the schema
const Cart = mongoose.model('Cart', cartSchema);

// Export the Cart model using ES Modules syntax
export default Cart;
