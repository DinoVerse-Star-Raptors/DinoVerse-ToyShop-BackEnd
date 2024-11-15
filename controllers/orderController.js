const Order = require('../models/Order'); // Assuming an Order model
const Product = require('../models/Product'); // Assuming a Product model
// const User = require('../models/User'); // Assuming a User model

// Create a new order
const createOrder = async (req, res) => {
  const { items, totalAmount, shippingAddress } = req.body; // Expecting an array of products (with productId, quantity) and a totalAmount

  const userId = req.user.id; // Assuming we get the user ID from the authenticated request

  try {
    // Validate that the products in the cart are available in stock
    for (let item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res
          .status(404)
          .json({ message: `Product ${item.productId} not found` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for product ${product.name}. Only ${product.stock} left.`,
        });
      }
    }

    // Create the order
    const order = new Order({
      user: userId,
      items,
      totalAmount,
      shippingAddress,
      status: 'Pending', // Initial order status
    });

    // Save the order to the database
    await order.save();

    // Deduct stock from products in the order
    for (let item of items) {
      const product = await Product.findById(item.productId);
      product.stock -= item.quantity;
      await product.save();
    }

    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all orders (for an admin or a user)
const getAllOrders = async (req, res) => {
  const userId = req.user.id;

  try {
    // If the user is an admin, return all orders; otherwise, return only their own orders
    const orders = req.user.isAdmin
      ? await Order.find().populate('user', 'name email') // populate user information
      : await Order.find({ user: userId }).populate('user', 'name email'); // Only the orders for this user

    if (orders.length === 0) {
      return res.status(404).json({ message: 'No orders found' });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get order by ID
const getOrderById = async (req, res) => {
  const { id } = req.params; // Order ID from URL

  try {
    // Fetch the order by ID
    const order = await Order.findById(id)
      .populate('user', 'name email')
      .populate('items.product', 'name price');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update order status (e.g., from "Pending" to "Shipped")
const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // New status (e.g., "Shipped", "Delivered")

  const allowedStatuses = ['Pending', 'Shipped', 'Delivered', 'Cancelled'];

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid order status' });
  }

  try {
    // Find the order and update the status
    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true } // Return the updated document
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order status updated', order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete an order (e.g., cancel an order)
const deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    // Find and delete the order
    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Optionally, revert the stock changes if necessary (e.g., restock products)
    for (let item of order.items) {
      const product = await Product.findById(item.productId);
      product.stock += item.quantity;
      await product.save();
    }

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
};
