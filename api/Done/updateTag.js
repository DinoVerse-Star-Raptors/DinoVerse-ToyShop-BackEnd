// const mongoose = require('mongoose');
// const Tag = require('./models/Tag'); // Your Mongoose model
// require('dotenv').config(); // Load environment variables from .env file

// // Connect to MongoDB using mongoose
// const connectToDatabase = async () => {
//   const uri = process.env.MONGO_URI;

//   if (!uri) {
//     console.error('MongoDB URI is not defined in .env file');
//     process.exit(1); // Exit if no URI
//   }

//   try {
//     await mongoose.connect(uri);
//     console.log('Connected to MongoDB');
//   } catch (error) {
//     console.error('Failed to connect to MongoDB:', error);
//     process.exit(1); // Exit on connection failure
//   }
// };

// // Update function
// const updateImageUrls = async () => {
//   try {
//     const result = await Tag.updateMany(
//       {
//         handle: { $in: ['0-6m', '6m', '12m', '18m', '2yrs', '5yrs'] }, // Match specific age groups
//       },
//       [
//         {
//           $set: {
//             imageUrl: {
//               $switch: {
//                 branches: [
//                   {
//                     case: { $eq: ['$handle', '0-6m'] },
//                     then: 'https://res.cloudinary.com/dvacq67nr/image/upload/c_fill,w_300,h_300/v1731819649/age_0-6m_raesje.jpg',
//                   },
//                   {
//                     case: { $eq: ['$handle', '6m'] },
//                     then: 'https://res.cloudinary.com/dvacq67nr/image/upload/c_fill,w_300,h_300/v1731819650/age_6m_ups2fi.jpg',
//                   },
//                   {
//                     case: { $eq: ['$handle', '12m'] },
//                     then: 'https://res.cloudinary.com/dvacq67nr/image/upload/c_fill,w_300,h_300/v1731819650/age_12m_ivtt8v.jpg',
//                   },
//                   {
//                     case: { $eq: ['$handle', '18m'] },
//                     then: 'https://res.cloudinary.com/dvacq67nr/image/upload/c_fill,w_300,h_300/v1731819650/age_18m_jhjxt3.jpg',
//                   },
//                   {
//                     case: { $eq: ['$handle', '2yrs'] },
//                     then: 'https://res.cloudinary.com/dvacq67nr/image/upload/c_fill,w_300,h_300/v1731819649/age_2yrs_ptxl08.jpg',
//                   },
//                   {
//                     case: { $eq: ['$handle', '5yrs'] },
//                     then: 'https://res.cloudinary.com/dvacq67nr/image/upload/c_fill,w_300,h_300/v1731819650/age_5yrs_pxrpbq.jpg',
//                   },
//                 ],
//                 default: '', // If handle does not match any case, set imageUrl to empty
//               },
//             },
//           },
//         },
//       ]
//     );

//     console.log(
//       `Matched ${result.matchedCount} documents and modified ${result.modifiedCount} documents.`
//     );
//   } catch (error) {
//     console.error('Error updating documents:', error);
//   }
// };

// // Run the script
// const run = async () => {
//   await connectToDatabase();
//   await updateImageUrls();
//   mongoose.disconnect(); // Disconnect after the operation is complete
// };

// run();

const mongoose = require('mongoose');
const Tag = require('./models/Tag'); // Your Mongoose model
require('dotenv').config(); // Load environment variables from .env file

// Connect to MongoDB using mongoose
const connectToDatabase = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error('MongoDB URI is not defined in .env file');
    process.exit(1); // Exit if no URI
  }

  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1); // Exit on connection failure
  }
};

// Update function to change `imageUrl` from `null` to `''`
const updateImageUrlToEmptyString = async () => {
  try {
    // Update all documents where `imageUrl` is null
    const result = await Tag.updateMany(
      { imageUrl: null }, // Match documents where imageUrl is null
      { $set: { imageUrl: '' } } // Set imageUrl to empty string
    );

    console.log(
      `Matched ${result.matchedCount} documents and modified ${result.modifiedCount} documents.`
    );
  } catch (error) {
    console.error('Error updating documents:', error);
  }
};

// Run the script
const run = async () => {
  await connectToDatabase();
  await updateImageUrlToEmptyString();
  mongoose.disconnect(); // Disconnect after the operation is complete
};

run();
