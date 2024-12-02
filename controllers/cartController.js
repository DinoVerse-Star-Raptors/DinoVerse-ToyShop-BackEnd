import Cart from '../models/Cart.js'; // Assuming a Cart model
import Product from '../models/Product.js'; // Assuming a Product model
import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes'; // For better status codes

// Helper function to get the cart for a user
const getCartForUser = async (userId) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    console.error('Invalid userId:', userId);
    return null;
  }

  try {
    // console.log('Looking for cart for userId:', userId);
    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    return cart || null;
  } catch (error) {
    console.error('Error fetching cart for user:', error);
    throw new Error('Error retrieving cart');
  }
};

// Add item to the cart
const addItemToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id || null;

  if (!userId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'User ID is missing' });
  }

  if (!productId || !quantity || quantity <= 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Invalid productId or quantity' });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Product not found' });
    }

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
      // Update quantity if the product already exists in the cart
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item to the cart
      cart.items.push({ product: productId, quantity });
    }

    await cart.save({ session });
    await session.commitTransaction();
    session.endSession();

    // Return the populated cart after update
    return res
      .status(StatusCodes.OK)
      .json(await Cart.findById(cart._id).populate('items.product'));
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Server error' });
  }
};

// Get the user's cart
const getCart = async (req, res) => {
  const userId = req.user._id || null;

  if (!userId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'User ID is missing' });
  }

  try {
    const cart = await getCartForUser(userId);

    if (!cart) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Cart not found' });
    }

    if (cart.items.length === 0) {
      return res.status(StatusCodes.OK).json({ message: 'Cart is empty' });
    }

    return res.status(StatusCodes.OK).json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Server error' });
  }
};

// Update item quantity in the cart
const updateCartItem = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id || null;

  if (!userId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'User ID is missing' });
  }

  if (!productId || !quantity || quantity <= 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Invalid productId or quantity' });
  }

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

    cart.items[itemIndex].quantity = quantity;
    await cart.save();

    return res
      .status(StatusCodes.OK)
      .json(await Cart.findById(cart._id).populate('items.product'));
  } catch (error) {
    console.error(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Server error' });
  }
};

const removeItemFromCart = async (req, res) => {
  const { productId } = req.params; // Changed to req.params for DELETE request
  const userId = req.user._id || null;

  if (!userId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'User ID is missing' });
  }

  try {
    const cart = await getCartForUser(userId);

    if (!cart) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item?.product?._id.toString() === productId.toString()
    );

    // console.log(itemIndex);

    if (itemIndex === -1) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Item not found in the cart' });
    }

    cart.items.splice(itemIndex, 1);
    await cart.save();

    return res
      .status(StatusCodes.OK)
      .json(await Cart.findById(cart._id).populate('items.product'));
  } catch (error) {
    console.error(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Server error' });
  }
};

// Clear the cart
const clearCart = async (req, res) => {
  const userId = req.user._id || null;

  if (!userId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'User ID is missing' });
  }

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

    return res.status(StatusCodes.OK).json(cart);
  } catch (error) {
    console.error(error);
    return res
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
