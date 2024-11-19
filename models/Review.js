// import mongoose from 'mongoose';

// const { Schema } = mongoose;

// // Define the Review schema
// const reviewSchema = new Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: true
//     },
//     product: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Product',
//       required: true
//     },
//     rating: {
//       type: Number,
//       required: true,
//       min: 1,
//       max: 5 // Rating 1 to 5
//     },
//     comment: {
//       type: String,
//       required: true
//     }
//   },
//   {
//     timestamps: true // Automatically adds createdAt and updatedAt fields
//   }
// );

// // Create the Review model
// const Review = mongoose.model('Review', reviewSchema);

// // Export the Review model using ES Modules syntax
// export default Review;
