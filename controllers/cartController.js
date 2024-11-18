const Cart = require('../models/Cart') // Assuming a Cart model
const Product = require('../models/Product') // Assuming a Product model

// Add item to the cart
const addItemToCart = async (req, res) => {
    const { productId, quantity } = req.body
    const userId = req.user.id // Assuming we get the user ID from the authenticated request

    try {
        // Check if the product exists
        const product = await Product.findById(productId)
        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }

        // Find the user's cart or create a new one if it doesn't exist
        let cart = await Cart.findOne({ user: userId })

        if (!cart) {
            // Create a new cart if none exists
            cart = new Cart({
                user: userId,
                items: [],
            })
        }

        // Check if the product already exists in the cart
        const existingItemIndex = cart.items.findIndex(
            (item) => item.product.toString() === productId
        )

        if (existingItemIndex > -1) {
            // If product exists in the cart, update the quantity
            cart.items[existingItemIndex].quantity += quantity
        } else {
            // If product is not in the cart, add it
            cart.items.push({ product: productId, quantity })
        }

        // Save the cart
        await cart.save()

        res.status(200).json(cart)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' })
    }
}

// Get the user's cart
const getCart = async (req, res) => {
    const userId = req.user.id

    try {
        // Find the cart for the authenticated user
        const cart = await Cart.findOne({ user: userId }).populate(
            'items.product'
        )

        if (!cart || cart.items.length === 0) {
            return res.status(404).json({ message: 'Cart is empty' })
        }

        res.status(200).json(cart)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' })
    }
}

// Update item quantity in the cart
const updateCartItem = async (req, res) => {
    const { productId, quantity } = req.body
    const userId = req.user.id

    try {
        // Find the user's cart
        const cart = await Cart.findOne({ user: userId })

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' })
        }

        // Find the cart item
        const itemIndex = cart.items.findIndex(
            (item) => item.product.toString() === productId
        )

        if (itemIndex === -1) {
            return res
                .status(404)
                .json({ message: 'Item not found in the cart' })
        }

        // Update the quantity
        cart.items[itemIndex].quantity = quantity

        // Save the cart
        await cart.save()

        res.status(200).json(cart)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' })
    }
}

// Remove item from cart
const removeItemFromCart = async (req, res) => {
    const { productId } = req.body
    const userId = req.user.id

    try {
        // Find the user's cart
        const cart = await Cart.findOne({ user: userId })

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' })
        }

        // Find the item index
        const itemIndex = cart.items.findIndex(
            (item) => item.product.toString() === productId
        )

        if (itemIndex === -1) {
            return res
                .status(404)
                .json({ message: 'Item not found in the cart' })
        }

        // Remove the item from the cart
        cart.items.splice(itemIndex, 1)

        // Save the cart
        await cart.save()

        res.status(200).json(cart)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' })
    }
}

// Clear the cart
const clearCart = async (req, res) => {
    const userId = req.user.id

    try {
        // Find the user's cart and clear it
        const cart = await Cart.findOneAndUpdate(
            { user: userId },
            { $set: { items: [] } }, // Clear the cart items
            { new: true }
        )

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' })
        }

        res.status(200).json(cart)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' })
    }
}

module.exports = {
    addItemToCart,
    getCart,
    updateCartItem,
    removeItemFromCart,
    clearCart,
}
