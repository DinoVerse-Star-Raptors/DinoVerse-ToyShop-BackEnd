import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define the OrderItem schema
const orderItemSchema = new Schema({
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
const orderSchema = new Schema(
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
        timestamps: true // Adds createdAt and updatedAt fields automatically
    }
);

// Create the Order model
const Order = mongoose.model('Order', orderSchema);

// Export the Order model using ES Module syntax
export default Order;
