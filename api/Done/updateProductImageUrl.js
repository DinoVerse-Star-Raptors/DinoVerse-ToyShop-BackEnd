const mongoose = require('mongoose')
const fs = require('fs')
const Product = require('./models/Product') // Import the product model

// Connect to MongoDB
mongoose
    .connect('mongodb://localhost:27017/yourDatabase', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.log('MongoDB connection error:', err))

// Function to update product image URL from img.json
async function updateProductImageUrlsFromFile() {
    try {
        // Read the img.json file
        const imgData = JSON.parse(fs.readFileSync('models/img.json', 'utf8'))

        // Loop through each entry in img.json
        for (const item of imgData) {
            const { productId, imageUrl } = item

            // Update the product in the database
            const result = await Product.updateOne(
                { productId: productId }, // Find product by productId
                { $set: { imageUrl: imageUrl } } // Set the imageUrl
            )

            if (result.modifiedCount > 0) {
                console.log(
                    `Product with productId ${productId} updated successfully.`
                )
            } else {
                console.log(
                    `No product found with productId ${productId}, or imageUrl is already set.`
                )
            }
        }
    } catch (error) {
        console.error(
            'Error reading or updating products from img.json:',
            error
        )
    }
}

// Call the function to update the product image URLs
updateProductImageUrlsFromFile()
