// models/Tag.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the "Tag" model
const tagSchema = new Schema(
  {
    handle: {
      type: String,
      required: [true, 'Handle is required'],
      unique: true,
      minlength: [2, 'Handle must be at least 2 characters long'],
      maxlength: [100, 'Handle cannot exceed 100 characters long'],
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      minlength: [3, 'Name must be at least 3 characters long'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    tagNumber: {
      type: Number,
      required: [true, 'Tag number is required'],
      unique: true,
      min: [100, 'Tag number must be greater than or equal to 100'],
      max: [999, 'Tag number must be less than or equal to 999'],
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    parentTagNumber: {
      type: Number,
      default: 101,
      min: [100, 'Tag number must be greater than or equal to 100'],
      max: [999, 'Tag number must be less than or equal to 999'],
    },
    imageUrl: {
      type: String,
      default: null,
      //   required: [true, 'Image URL is required'],
      //   match: [
      //     /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i,
      //     'Invalid image URL format',
      //   ],
    },
    isDefaultParent: {
      type: Boolean,
      required: true,
      default: false,
    },
    relativeHandle: {
      type: [String], // This makes `relativeHandle` an array of strings
      default: [],
      // validate: {
      //   validator: function (v) {
      //     // Optional: You can add custom validation for each relative handle
      //     return v.every((handle) => handle.length >= 3 && handle.length <= 50);
      //   },
      //   message: 'Each relative handle must be between 3 and 50 characters.',
      // },
    },
    description: {
      type: String,
      maxlength: [500, 'Description cannot exceed 500 characters'],
      default: null,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields
  }
);

// Create the model
const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;
