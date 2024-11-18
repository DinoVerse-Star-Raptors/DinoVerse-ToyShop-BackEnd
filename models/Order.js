const mongoose = require('mongoose');

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

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    items: [orderItemSchema],
    shippingAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Address'
    },
    totalPrice: { type: Number, required: true },
    status: { type: String, default: 'Pending' }, // Pending, Shipped, Delivered, etc.
    createdAt: { type: Date, default: Date.now }
  },
  {
    timestamps: true
  }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

// const mongoose = require('mongoose');

// const orderItemSchema = mongoose.Schema({
//   productId: {
//	 type: mongoose.Schema.Types.ObjectId,
//	 ref: 'Product',
//	 required: true,
//   },
//   quantity: {
//	 type: Number,
//	 required: true,
//   },
//   price: {
//	 type: Number,
//	 required: true,
//   },
// });

// const orderSchema = mongoose.Schema(
//   {
//	 user: {
//	   type: mongoose.Schema.Types.ObjectId,
//	   ref: 'User', // Reference to the User model
//	   required: true,
//	 },
//	 items: [orderItemSchema],
//	 totalAmount: {
//	   type: Number,
//	   required: true,
//	 },
//	 shippingAddress: {
//	   type: String,
//	   required: true,
//	 },
//	 status: {
//	   type: String,
//	   enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
//	   default: 'Pending',
//	 },
//   },
//   { timestamps: true }
// );

// const Order = mongoose.model('Order', orderSchema);

// module.exports = Order;
