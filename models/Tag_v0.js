// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// const tagSchema = new Schema(
//   {
//	 // Identification Fields
//	 id: {
//	   type: Number,
//	   required: true,
//	   unique: true, // Ensures uniqueness for tagId
//	   index: true, // Index for efficient queries by id
//	   min: [100, 'ID must be a positive integer'], // Ensure positive integer
//	   max: [999, 'ID must be a positive integer'],
//	 },
//	 handle: {
//	   type: String,
//	   required: true,
//	   unique: true, // Ensures uniqueness for efficient lookups
//	   index: true, // Add index for faster queries on handle
//	   match: [
//		 /^[a-zA-Z0-9_-]+$/,
//		 'Handle must be alphanumeric, with underscores or hyphens only',
//	   ], // Only alphanumeric, hyphens, and underscores allowed
//	   minlength: [3, 'Handle must be at least 3 characters long'], // Minimum length of handle
//	   maxlength: [50, 'Handle must be less than 50 characters'], // Maximum length of handle
//	 },

//	 // Metadata Fields
//	 name: {
//	   type: String,
//	   required: true, // Tag name is required
//	   unique: true, // Ensures uniqueness for efficient lookups
//	   minlength: [3, 'Name must be at least 3 characters long'], // Minimum length of name
//	   maxlength: [100, 'Name must be less than 100 characters'], // Maximum length of name
//	 },
//	 shortName: {
//	   type: String,
//	   default: '',
//	   minlength: [3, 'Name must be at least 3 characters long'], // Minimum length of shortName
//	   maxlength: [50, 'Short name must be less than 50 characters'], // Maximum length of shortName
//	 },
//	 description: {
//	   type: String,
//	   default: '',
//	   maxlength: [500, 'Description must be less than 500 characters'], // Maximum length of description
//	 },
//	 imageUrl: {
//	   type: String,
//	   default: null, // URL for the tag image (nullable)
//	   match: [/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/, 'Invalid URL format'], // Basic URL validation
//	 },

//	 // SEO & Marketing Fields
//	 seoTitle: {
//	   type: String,
//	   default: '',
//	   maxlength: [70, 'SEO title must be less than 70 characters'], // SEO title length
//	 },
//	 seoDescription: {
//	   type: String,
//	   default: '',
//	   maxlength: [160, 'SEO description must be less than 160 characters'], // SEO description length
//	 },
//	 metaKeywords: {
//	   type: [String], // Array of meta keywords for SEO
//	   default: [],
//	   validate: {
//		 validator: function (arr) {
//		   return arr.every(
//			 (keyword) => typeof keyword === 'string' && keyword.length <= 50
//		   ); // Ensure each keyword is a string of max length 50
//		 },
//		 message:
//		   'Each keyword must be a string with a maximum length of 50 characters',
//	   },
//	 },
//	 relativeTags: {
//	   type: [String], // Array of related tag handles (or tag IDs)
//	   default: [],
//	   validate: {
//		 validator: function (arr) {
//		   return arr.every(
//			 (tag) => typeof tag === 'string' && tag.length <= 100
//		   ); // Ensure each related tag handle is a string of max length 100
//		 },
//		 message:
//		   'Each related tag handle must be a string with a maximum length of 50 characters',
//	   },
//	 },

//	 // Hierarchical Fields
//	 parentId: {
//	   type: Number,
//	   default: null, // Root tags will have null as parent
//	   index: true, // Index for efficient parent-child relationship queries
//	   min: [100, 'Parent ID must be a non-negative integer'], // Ensure non-negative integers for parentId
//	   max: [999, 'Parent ID must be a non-negative integer'],
//	 },
//	 isDefaultParent: {
//	   type: Boolean,
//	   default: false, // Flag to identify default parent tags
//	 },

//	 // Tag Status Fields
//	 isActive: {
//	   type: Boolean,
//	   default: true, // Tag is active by default
//	   index: true, // Index for fast lookups of active/inactive tags
//	 },
//	 isDeleted: {
//	   type: Boolean,
//	   default: false, // 0 = not deleted, 1 = soft deleted
//	   index: true, // Index to optimize queries that exclude deleted tags
//	 },
//	 lastUpdated: {
//	   type: Date,
//	   default: Date.now, // Automatically set to current date/time on update
//	 },

//	 // Tag Analytics
//	 viewCount: {
//	   type: Number,
//	   default: 0, // Track how many times the tag has been viewed
//	   min: [0, 'View count cannot be negative'], // View count cannot be negative
//	 },
//	 productCount: {
//	   type: Number,
//	   default: 0, // Track how many products are associated with this tag
//	   min: [0, 'Product count cannot be negative'], // Product count cannot be negative
//	 },

//	 // Created Date (For analytics, reporting, etc.)
//	 createdAt: {
//	   type: Date,
//	   default: Date.now, // Set the createdAt timestamp to current time by default
//	   index: true, // Optional index to optimize queries by creation time
//	 },
//   },
//   {
//	 timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }, // Custom timestamp field names
//   }
// );

// module.exports = mongoose.model('Tag', tagSchema);

// // Optional: Add compound index for faster querying by handle and id
// tagSchema.index({ handle: 1, id: 1 });

// // Pre-save hook to update the 'lastUpdated' field before saving a tag
// tagSchema.pre('save', function (next) {
//   if (this.isModified()) {
//	 this.lastUpdated = Date.now(); // Ensure lastUpdated is updated if the document is modified
//   }
//   next();
// });

// // Custom toJSON method to clean up the output
// tagSchema.set('toJSON', {
//   virtuals: true, // Include virtuals like the custom 'id' field
//   versionKey: false, // Omit the internal __v field from the output
//   transform: (doc, ret) => {
//	 if (doc == -1) return;
//	 ret.id = ret._id; // Rename _id to id for a cleaner API response
//	 delete ret._id; // Remove the original _id field from the response
//   },
// });

// // Create and export the Tag model
// const Tag = mongoose.model('Tag', tagSchema);

// module.exports = Tag;
