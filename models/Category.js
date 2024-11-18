const mongoose = require('mongoose')

// Define the Category Schema
const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Category name is required'],
        unique: true, // Ensure no duplicate category names
        trim: true,
        minlength: [3, 'Category name must be at least 3 characters long'],
        maxlength: [100, 'Category name must be at most 100 characters long'],
    },
    description: {
        type: String,
        trim: true,
        maxlength: [500, 'Description must be at most 500 characters long'],
    },
    parentCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // Reference to another category (for hierarchical categories)
        default: null,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
})

// Pre-save hook to update the updatedAt field
CategorySchema.pre('save', function (next) {
    this.updatedAt = Date.now()
    next()
})

// Create Category model from the schema
const Category = mongoose.model('Category', CategorySchema)

module.exports = Category
