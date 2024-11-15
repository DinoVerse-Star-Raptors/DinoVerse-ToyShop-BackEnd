// require('dotenv').config(); // Load environment variables from .env file
// const { MongoClient } = require('mongodb');

// // Define categories to insert into MongoDB
// const categories = [
//   {
//     name: 'Creative',
//     image_url: './assets/images/IconCategories/iconCreative.png',
//   },
//   {
//     name: 'Emotion',
//     image_url: './assets/images/IconCategories/iconEmotion.png',
//   },
//   {
//     name: 'FineMotor',
//     image_url: './assets/images/IconCategories/iconFineMotor.png',
//   },
//   {
//     name: 'Gross Motor',
//     image_url: './assets/images/IconCategories/iconMotor.png',
//   },
//   {
//     name: 'Language',
//     image_url: './assets/images/IconCategories/iconCommunication.png',
//   },
//   {
//     name: 'Musical',
//     image_url: './assets/images/IconCategories/iconMusical.png',
//   },
//   {
//     name: 'Social',
//     image_url: './assets/images/IconCategories/iconSocial.png',
//   },
// ];

// async function run() {
//   const uri = process.env.MONGO_URI;

//   if (!uri) {
//     console.error('MongoDB URI is not defined in .env file');
//     process.exit(1); // Exit if URI is missing
//   }

//   const client = new MongoClient(uri);

//   try {
//     // Establish connection to MongoDB
//     await client.connect();
//     console.log('Connected to MongoDB');

//     // Reference the specific database and collection
//     const db = client.db('dinoCore');
//     const collection = db.collection('childDevelopments');

//     // Insert the categories into the collection
//     const result = await collection.insertMany(categories);
//     console.log(`Inserted ${result.insertedCount} documents successfully!`);
//   } catch (err) {
//     console.error('Error occurred during MongoDB operation:', err);
//   } finally {
//     // Close the connection regardless of success or failure
//     await client.close();
//     console.log('MongoDB connection closed');
//   }
// }

// // Run the script
// run().catch(console.error);
