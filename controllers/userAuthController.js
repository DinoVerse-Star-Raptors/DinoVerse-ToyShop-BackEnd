const Address = require('../models/Address')
const Order = require('../models/Order')
const Product = require('../models/Product')
const Review = require('../models/Review')

/**
 * Add a new address for the user
 */
const addAddress = async (req, res) => {
    const { name, street, city, state, zip, country, phone } = req.body
    const userId = req.user.id // Get user id from the request

    try {
        const newAddress = new Address({
            user: userId,
            name,
            street,
            city,
            state,
            zip,
            country,
            phone,
        })

        await newAddress.save()
        res.status(201).json({
            message: 'Address added successfully',
            address: newAddress,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' })
    }
}

/**
 * Get all orders for the user (order history)
 */
const getOrderHistory = async (req, res) => {
    const userId = req.user.id

    try {
        const orders = await Order.find({ user: userId }).populate(
            'items.product',
            'name price'
        )
        res.status(200).json({ orders })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' })
    }
}

/**
 * Add a product review (rating and comment)
 */
const addProductReview = async (req, res) => {
    const { productId, rating, comment } = req.body
    const userId = req.user.id

    try {
        // Check if the product exists
        const product = await Product.findById(productId)
        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }

        // Check if the user has already reviewed this product
        const existingReview = await Review.findOne({
            user: userId,
            product: productId,
        })
        if (existingReview) {
            return res
                .status(400)
                .json({ message: 'You have already reviewed this product' })
        }

        // Create a new review
        const review = new Review({
            user: userId,
            product: productId,
            rating,
            comment,
        })

        await review.save()

        // Add the review to the product's review array
        product.reviews.push(review._id)
        await product.save()

        res.status(201).json({ message: 'Review added successfully', review })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' })
    }
}

module.exports = {
    addAddress,
    getOrderHistory,
    addProductReview,
}
