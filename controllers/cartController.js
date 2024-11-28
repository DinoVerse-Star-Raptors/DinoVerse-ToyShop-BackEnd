import Cart from '../models/Cart.js'; // Assuming a Cart model
import Product from '../models/Product.js'; // Assuming a Product model
import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes'; // For better status codes

// Helper function to get the cart for a user
const getCartForUser = async (userId) => {
  return await Cart.findOne({ user: userId });
};

// Helper function to get a product by ID
const getProductById = async (productId) => {
  return await Product.findById(productId);
};

// Add item to the cart
const addItemToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  try {
    // Validate inputs
    if (!productId || !quantity || quantity <= 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid productId or quantity' });
    }

    // Check if the product exists
    const product = await getProductById(productId);
    if (!product) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Product not found' });
    }

    // Start a session for atomic operations
    const session = await mongoose.startSession();
    session.startTransaction();

    let cart = await getCartForUser(userId);
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const existingItemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity; // Update quantity if product exists
    } else {
      cart.items.push({ product: productId, quantity }); // Add new item
    }

    await cart.save({ session });
    await session.commitTransaction();
    session.endSession();

    const populatedCart = await Cart.findById(cart._id).populate(
      'items.product'
    );
    res.status(StatusCodes.OK).json(populatedCart); // Return populated cart
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Server error' });
  }
};

// Get the user's cart
const getCart = async (req, res) => {
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ user: userId }).populate('items.product');

    if (!cart || cart.items.length === 0) {
      return res.status(StatusCodes.OK).json({ message: 'Cart is empty' });
    }

    res.status(StatusCodes.OK).json(cart); // Return populated cart
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Server error' });
  }
};

// Update item quantity in the cart
const updateCartItem = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  try {
    if (!productId || !quantity || quantity <= 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid productId or quantity' });
    }

    const cart = await getCartForUser(userId);
    if (!cart) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Item not found in the cart' });
    }

    cart.items[itemIndex].quantity = quantity; // Update quantity
    await cart.save();

    const updatedCart = await Cart.findById(cart._id).populate('items.product');
    res.status(StatusCodes.OK).json(updatedCart); // Return updated cart
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Server error' });
  }
};

// Remove item from cart
const removeItemFromCart = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id;

  try {
    const cart = await getCartForUser(userId);
    if (!cart) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );
    if (itemIndex === -1) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Item not found in the cart' });
    }

    cart.items.splice(itemIndex, 1); // Remove the item from the cart
    await cart.save();

    const updatedCart = await Cart.findById(cart._id).populate('items.product');
    res.status(StatusCodes.OK).json(updatedCart); // Return updated cart
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Server error' });
  }
};

// Clear the cart
const clearCart = async (req, res) => {
  const userId = req.user.id;

  try {
    const cart = await Cart.findOneAndUpdate(
      { user: userId },
      { $set: { items: [] } },
      { new: true }
    );

    if (!cart) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Cart not found' });
    }

    res.status(StatusCodes.OK).json(cart); // Return cleared cart
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Server error' });
  }
};

export {
  addItemToCart,
  getCart,
  updateCartItem,
  removeItemFromCart,
  clearCart
};
