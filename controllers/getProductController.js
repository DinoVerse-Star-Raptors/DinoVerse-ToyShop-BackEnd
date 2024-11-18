// Import the Product model using ES Module syntax
import Product from '../models/Product.js'; // Add .js extension

// Function to get all products
const getAllProducts = async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.find();

    // If no products are found, return a 404 response
    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found' });
    }

    // Return the products in the response
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Function to get a specific product by productId
const getProductById = async (req, res) => {
  const { productId } = req.params; // Extract the productId from the URL parameter

  try {
    // Find the product by productId
    const product = await Product.findOne({ productId });

    // If no product is found, return a 404 response
    if (!product) {
      return res
        .status(404)
        .json({ message: `Product with ID ${productId} not found` });
    }

    // Return the product in the response
    res.status(200).json(product);
  } catch (error) {
    console.error(`Error fetching product with ID ${productId}:`, error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Export the controller functions using ES Module syntax
export { getAllProducts, getProductById };
