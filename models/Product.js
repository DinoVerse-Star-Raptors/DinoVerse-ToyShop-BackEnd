import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define the product schema
const productSchema = new Schema(
  {
    productId: {
      type: String,
      required: [true, 'Product ID is required'],
      unique: true,
      trim: true,
      minlength: [10, 'Product ID must be at least 10 characters long'],
      maxlength: [15, 'Product ID cannot be longer than 15 characters'],
    },
    handle: {
      type: String,
      required: [true, 'Handle is required'],
      unique: true,
      trim: true,
      minlength: [3, 'Handle must be at least 3 characters long'],
      maxlength: [50, 'Handle cannot be longer than 50 characters'],
    },
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      maxlength: [100, 'Product name cannot be longer than 100 characters'],
      minlength: [3, 'Product name must be at least 3 characters long'],
    },
    stock: {
      type: Boolean,
      default: true, // Product is active (available for sale) by default
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'Quantity cannot be negative'],
      default: 0, // The number of items available for purchase
    },
    ageGroup: {
      type: String,
      required: [true, 'Age group is required'],
      maxlength: [50, 'Age group cannot be longer than 50 characters'],
      minlength: [3, 'Age group must be at least 3 characters long'],
    },
    tags: {
      type: [String], // Array of strings to store tags like "office", "stationary"
      default: [],
      validate: {
        validator: function (value) {
          // Custom validation for tags array
          return value.every(
            (tag) => typeof tag === 'string' && tag.length <= 50
          );
        },
        message:
          'Each tag must be a string with a maximum length of 50 characters',
      },
    },
    recommended: {
      type: Boolean,
      default: false, // Default to not recommended
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be a positive number'],
      validate: {
        validator: function (value) {
          return value > 0;
        },
        message: 'Price must be greater than zero',
      },
    },
    isActive: {
      type: Boolean,
      default: true, // Product is active (available for sale) by default
    },
    rating: {
      rate: {
        type: Number,
        default: 0, // Default rating is 0 if no reviews exist
        min: [0, 'Rating must be between 0 and 5'],
        max: [5, 'Rating must be between 0 and 5'],
      },
      count: {
        type: Number,
        default: 0, // Default count is 0 if no reviews exist
        min: [0, 'Review count cannot be negative'],
      },
      start1: { type: Number, default: 0 },
      start2: { type: Number, default: 0 },
      start3: { type: Number, default: 0 },
      start4: { type: Number, default: 0 },
      start5: { type: Number, default: 0 },
    },
    reviews: [
      {
        reviewer: {
          type: String,
          required: [true, 'Reviewer name is required'],
          trim: true,
          maxlength: [
            100,
            'Reviewer name cannot be longer than 100 characters',
          ],
        },
        rating: {
          type: Number,
          required: [true, 'Rating is required'],
          min: [0, 'Rating must be between 0 and 5'],
          max: [5, 'Rating must be between 0 and 5'],
        },
        comment: {
          type: String,
          required: [true, 'Comment is required'],
          maxlength: [
            500,
            'Review comment cannot be longer than 500 characters',
          ],
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    imageUrl: {
      type: String, // URL of the product image
      required: false, // Optional field
      trim: true, // Remove any extra spaces from the URL
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// Method to update product rating based on reviews
productSchema.methods.updateRating = function () {
  const totalRatings = this.reviews.length;
  if (totalRatings === 0) {
    this.rating.rate = 0;
    this.rating.count = 0;
    return;
  }

  let totalScore = 0;
  let ratingCount = [0, 0, 0, 0, 0]; // Array to count number of 1-star, 2-star, etc.
  this.reviews.forEach((review) => {
    totalScore += review.rating;
    ratingCount[review.rating - 1] += 1; // Increment the count of the respective rating (0-4 index for 1-5 stars)
  });

  // Calculate the average rating
  this.rating.rate = totalScore / totalRatings;
  this.rating.count = totalRatings;
  this.rating.start1 = ratingCount[0];
  this.rating.start2 = ratingCount[1];
  this.rating.start3 = ratingCount[2];
  this.rating.start4 = ratingCount[3];
  this.rating.start5 = ratingCount[4];
};

// Pre-save hook to update the rating before saving the product
productSchema.pre('save', function (next) {
  this.updateRating(); // Update the rating whenever the product is saved
  next();
});

// Create and export the Product model
const Product = mongoose.model('Product', productSchema);
export default Product;
