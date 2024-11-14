const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const Category = require('../models/Category');

// Helper function to handle errors
const handleError = (error, res, message) => {
  console.error(error);
  res.status(500).json({
    success: false,
    message: message || 'Something went wrong',
  });
};

// User Management

// @desc   Get all users
// @route  GET /api/admin/users
// @access Private (admin only)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    handleError(error, res, 'Failed to fetch users');
  }
};

// @desc   Get user by ID
// @route  GET /api/admin/users/:id
// @access Private (admin only)
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    handleError(error, res, 'Failed to fetch user');
  }
};

// @desc   Update user details
// @route  PUT /api/admin/users/:id
// @access Private (admin only)
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, fullName, role } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    user.username = username || user.username;
    user.email = email || user.email;
    user.fullName = fullName || user.fullName;
    user.role = role || user.role;

    await user.save();
    res
      .status(200)
      .json({
        success: true,
        message: 'User updated successfully',
        data: user,
      });
  } catch (error) {
    handleError(error, res, 'Failed to update user');
  }
};

// @desc   Delete user
// @route  DELETE /api/admin/users/:id
// @access Private (admin only)
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    await user.remove();
    res
      .status(200)
      .json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    handleError(error, res, 'Failed to delete user');
  }
};

// Product Management

// @desc   Get all products
// @route  GET /api/admin/products
// @access Private (admin only)
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category');
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    handleError(error, res, 'Failed to fetch products');
  }
};

// @desc   Add new product
// @route  POST /api/admin/products
// @access Private (admin only)
const addProduct = async (req, res) => {
  const { name, description, price, category, imageUrl, stock } = req.body;

  if (!name || !price || !category) {
    return res.status(400).json({
      success: false,
      message: 'Name, price, and category are required fields.',
    });
  }

  try {
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      imageUrl,
      stock,
    });
    const product = await newProduct.save();
    res
      .status(201)
      .json({
        success: true,
        message: 'Product added successfully',
        data: product,
      });
  } catch (error) {
    handleError(error, res, 'Failed to add product');
  }
};

// @desc   Update an existing product
// @route  PUT /api/admin/products/:id
// @access Private (admin only)
const updateProduct = async (req, res) => {
  const { productId } = req.params;
  const { name, description, price, category, imageUrl, stock } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { name, description, price, category, imageUrl, stock },
      { new: true }
    );

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: 'Product not found' });
    }

    res
      .status(200)
      .json({
        success: true,
        message: 'Product updated successfully',
        data: updatedProduct,
      });
  } catch (error) {
    handleError(error, res, 'Failed to update product');
  }
};

// @desc   Delete a product
// @route  DELETE /api/admin/products/:id
// @access Private (admin only)
const deleteProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, message: 'Product not found' });
    }

    res
      .status(200)
      .json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    handleError(error, res, 'Failed to delete product');
  }
};

// Category Management

// @desc   Get all categories
// @route  GET /api/admin/categories
// @access Private (admin only)
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    handleError(error, res, 'Failed to fetch categories');
  }
};

// @desc   Add a new category
// @route  POST /api/admin/categories
// @access Private (admin only)
const addCategory = async (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: 'Category name is required',
    });
  }

  try {
    const newCategory = new Category({ name, description });
    const category = await newCategory.save();
    res
      .status(201)
      .json({
        success: true,
        message: 'Category added successfully',
        data: category,
      });
  } catch (error) {
    handleError(error, res, 'Failed to add category');
  }
};

// @desc   Update an existing category
// @route  PUT /api/admin/categories/:id
// @access Private (admin only)
const updateCategory = async (req, res) => {
  const { categoryId } = req.params;
  const { name, description } = req.body;

  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { name, description },
      { new: true }
    );

    if (!updatedCategory) {
      return res
        .status(404)
        .json({ success: false, message: 'Category not found' });
    }

    res
      .status(200)
      .json({
        success: true,
        message: 'Category updated successfully',
        data: updatedCategory,
      });
  } catch (error) {
    handleError(error, res, 'Failed to update category');
  }
};

// @desc   Delete a category
// @route  DELETE /api/admin/categories/:id
// @access Private (admin only)
const deleteCategory = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      return res
        .status(404)
        .json({ success: false, message: 'Category not found' });
    }

    res
      .status(200)
      .json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    handleError(error, res, 'Failed to delete category');
  }
};

// Order Management

// @desc   Get all orders
// @route  GET /api/admin/orders
// @access Private (admin only)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'username email');
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    handleError(error, res, 'Failed to fetch orders');
  }
};

// @desc   Get order by ID
// @route  GET /api/admin/orders/:id
// @access Private (admin only)
const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id).populate('user', 'username email');
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: 'Order not found' });
    }
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    handleError(error, res, 'Failed to fetch order');
  }
};

// @desc   Update order status
// @route  PUT /api/admin/orders/:id
// @access Private (admin only)
const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findById(id);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: 'Order not found' });
    }

    order.status = status || order.status;
    await order.save();
    res
      .status(200)
      .json({ success: true, message: 'Order status updated', data: order });
  } catch (error) {
    handleError(error, res, 'Failed to update order status');
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getAllCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
};
