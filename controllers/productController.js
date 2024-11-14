const Product = require('../models/Product'); // Assuming you have a Product model

// Create a new product
const createProduct = async (req, res) => {
  const { name, description, price, category, imageUrl, stock } = req.body;

  try {
    // Check if a product with the same name already exists
    const productExists = await Product.findOne({ name });
    if (productExists) {
      return res
        .status(400)
        .json({ message: 'Product with this name already exists' });
    }

    // Create new product
    const product = new Product({
      name,
      description,
      price,
      category,
      imageUrl,
      stock,
    });

    // Save product to the database
    await product.save();

    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.find();

    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found' });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a product by ID
const getProductById = async (req, res) => {
  const { id } = req.params; // Extract product ID from the URL parameter

  try {
    // Fetch product by ID
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a product by ID
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, imageUrl, stock } = req.body;

  try {
    // Find the product by ID and update its details
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, description, price, category, imageUrl, stock },
      { new: true } // Return the updated document
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({
      message: 'Product updated successfully',
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    // Find and remove the product by ID
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
