// // https://github.com/mongodb-university/atlas_starter_nodejs.git

// require('dotenv').config(); // Load environment variables from .env file
// const { MongoClient } = require('mongodb');

// async function run() {
//   // Fetch the MongoDB URI from the environment variable
//   const uri = process.env.MONGO_URI;

//   if (!uri) {
//     console.error('MongoDB URI is not defined in .env file');
//     process.exit(1); // Exit the process if the URI is missing
//   }

//   // The MongoClient is the object that references the connection to our datastore (Atlas, for example)
//   const client = new MongoClient(uri);

//   // The connect() method does not attempt a connection; instead it instructs
//   // the driver to connect using the settings provided when a connection
//   // is required.
//   await client.connect();

//   // Provide the name of the database and collection you want to use.
//   // If the database and/or collection do not exist, the driver and Atlas
//   // will create them automatically when you first write data.
//   const dbName = 'dino_db';
//   const collectionName = 'tags';

//   // Create references to the database and collection in order to run
//   // operations on them.
//   const database = client.db(dbName);
//   const collection = database.collection(collectionName);

//   /*
//    *  *** INSERT DOCUMENTS ***
//    *
//    * You can insert individual documents using collection.insert().
//    * In this example, we're going to create four documents and then
//    * insert them all in one call with collection.insertMany().
//    */
//   const tags = [
//     {
//       TagHandle: 'root',
//       TagName: 'Root Tag',
//       TagId: 100,
//       TagActived: 0,
//       TagParentId: null,
//       IsDefaultParent: 0,
//       TagUpdate: '2024-11-12T09:13:31-05:00',
//       TagShortName: 'Root',
//       TagImageURL: null,
//       TagDesc: '',
//     },
//     {
//       TagHandle: 'all',
//       TagName: 'All Toys',
//       TagId: 101,
//       TagActived: 1,
//       TagParentId: 100,
//       IsDefaultParent: 1,
//       TagUpdate: '2024-11-12T09:13:31-05:01',
//       TagShortName: 'All',
//       TagImageURL:
//         'https://cdn.shopify.com/s/files/1/0608/9618/2503/files/Child_Development_Icon-02.7c42f1c.svg?v=1638864639',
//       TagDesc: '',
//     },
//     {
//       TagHandle: 'others',
//       TagName: 'Others',
//       TagId: 102,
//       TagActived: 1,
//       TagParentId: 101,
//       IsDefaultParent: 0,
//       TagUpdate: '2024-11-12T09:13:31-05:02',
//       TagShortName: 'Others',
//       TagImageURL: null,
//       TagDesc: '',
//     },
//     {
//       TagHandle: 'miscellaneous',
//       TagName: 'Miscellaneous',
//       TagId: 103,
//       TagActived: 0,
//       TagParentId: 101,
//       IsDefaultParent: 0,
//       TagUpdate: '2024-11-12T09:13:31-05:03',
//       TagShortName: 'Miscellaneous',
//       TagImageURL: null,
//       TagDesc: '',
//     },
//     {
//       TagHandle: 'categories',
//       TagName: 'Categories',
//       TagId: 104,
//       TagActived: 1,
//       TagParentId: 101,
//       IsDefaultParent: 0,
//       TagUpdate: '2024-11-12T09:13:31-05:04',
//       TagShortName: 'Categories',
//       TagImageURL: null,
//       TagDesc: '',
//     },
//     {
//       TagHandle: 'collections',
//       TagName: 'Collections',
//       TagId: 105,
//       TagActived: 0,
//       TagParentId: 101,
//       IsDefaultParent: 0,
//       TagUpdate: '2024-11-12T09:13:31-05:05',
//       TagShortName: 'Collections',
//       TagImageURL: null,
//       TagDesc: '',
//     },
//     {
//       TagHandle: 'age',
//       TagName: 'Age',
//       TagId: 106,
//       TagActived: 1,
//       TagParentId: 101,
//       IsDefaultParent: 0,
//       TagUpdate: '2024-11-12T09:13:31-05:06',
//       TagShortName: 'Age',
//       TagImageURL: null,
//       TagDesc: '',
//     },
//     {
//       TagHandle: 'child-development',
//       TagName: 'Child Development',
//       TagId: 107,
//       TagActived: 1,
//       TagParentId: 101,
//       IsDefaultParent: 0,
//       TagUpdate: '2024-11-12T09:13:31-05:07',
//       TagShortName: 'Child Development',
//       TagImageURL: null,
//       TagDesc: '',
//     },
//     {
//       TagHandle: 'events',
//       TagName: 'Events',
//       TagId: 108,
//       TagActived: 0,
//       TagParentId: 101,
//       IsDefaultParent: 0,
//       TagUpdate: '2024-11-12T09:13:31-05:08',
//       TagShortName: 'Events',
//       TagImageURL: null,
//       TagDesc: '',
//     },
//     {
//       TagHandle: 'promotions',
//       TagName: 'Promotions',
//       TagId: 109,
//       TagActived: 0,
//       TagParentId: 101,
//       IsDefaultParent: 0,
//       TagUpdate: '2024-11-12T09:13:31-05:09',
//       TagShortName: 'Promotions',
//       TagImageURL: null,
//       TagDesc: '',
//     },
//     {
//       TagHandle: '0-6m',
//       TagName: '0-6M',
//       TagId: 110,
//       TagActived: 1,
//       TagParentId: 106,
//       IsDefaultParent: 0,
//       TagUpdate: null,
//       TagShortName: null,
//       TagImageURL: null,
//       TagDesc: '',
//     },
//     {
//       TagHandle: '6m',
//       TagName: '6M+',
//       TagId: 111,
//       TagActived: 1,
//       TagParentId: 106,
//       IsDefaultParent: 0,
//       TagUpdate: null,
//       TagShortName: null,
//       TagImageURL: null,
//       TagDesc: '',
//     },
//     {
//       TagHandle: '12m',
//       TagName: '12M+',
//       TagId: 112,
//       TagActived: 1,
//       TagParentId: 106,
//       IsDefaultParent: 0,
//       TagUpdate: null,
//       TagShortName: null,
//       TagImageURL: null,
//       TagDesc: '',
//     },
//     {
//       TagHandle: '18m',
//       TagName: '18M+',
//       TagId: 113,
//       TagActived: 1,
//       TagParentId: 106,
//       IsDefaultParent: 0,
//       TagUpdate: null,
//       TagShortName: null,
//       TagImageURL: null,
//       TagDesc: '',
//     },
//     {
//       TagHandle: '24m',
//       TagName: '24M+',
//       TagId: 114,
//       TagActived: 1,
//       TagParentId: 106,
//       IsDefaultParent: 0,
//       TagUpdate: null,
//       TagShortName: null,
//       TagImageURL: null,
//       TagDesc: '',
//     },
//     {
//       TagHandle: '2yrs',
//       TagName: '2Yrs+',
//       TagId: 115,
//       TagActived: 1,
//       TagParentId: 106,
//       IsDefaultParent: 0,
//       TagUpdate: null,
//       TagShortName: null,
//       TagImageURL: null,
//       TagDesc: '',
//     },
//     {
//       TagHandle: '36m',
//       TagName: '36M+',
//       TagId: 116,
//       TagActived: 1,
//       TagParentId: 106,
//       IsDefaultParent: 0,
//       TagUpdate: null,
//       TagShortName: null,
//       TagImageURL: null,
//       TagDesc: '',
//     },
//     {
//       TagHandle: '3yrs',
//       TagName: '3Yrs+',
//       TagId: 117,
//       TagActived: 1,
//       TagParentId: 106,
//       IsDefaultParent: 0,
//       TagUpdate: null,
//       TagShortName: null,
//       TagImageURL: null,
//       TagDesc: '',
//     },
//     {
//       TagHandle: '60m',
//       TagName: '60M+',
//       TagId: 118,
//       TagActived: 1,
//       TagParentId: 106,
//       IsDefaultParent: 0,
//       TagUpdate: null,
//       TagShortName: null,
//       TagImageURL: null,
//       TagDesc: '',
//     },
//     {
//       TagHandle: '5yrs',
//       TagName: '5Yrs+',
//       TagId: 119,
//       TagActived: 1,
//       TagParentId: 106,
//       IsDefaultParent: 0,
//       TagUpdate: null,
//       TagShortName: null,
//       TagImageURL: null,
//       TagDesc: '',
//     },
//     {
//       TagHandle: 'physical-dev',
//       TagName: 'Physical',
//       TagId: 120,
//       TagActived: 0,
//       TagParentId: 105,
//       IsDefaultParent: 0,
//       TagUpdate: null,
//       TagShortName: null,
//       TagImageURL:
//         'https://cdn.shopify.com/s/files/1/0608/9618/2503/files/Child_Development_Icon-01.e9c8918.svg?v=1638864639',
//       TagDesc: '',
//     },
//     {
//       TagHandle: 'social-and-emotional-dev',
//       TagName: 'Social & Emotional',
//       TagId: 121,
//       TagActived: 0,
//       TagParentId: 105,
//       IsDefaultParent: 0,
//       TagUpdate: null,
//       TagShortName: null,
//       TagImageURL:
//         'https://cdn.shopify.com/s/files/1/0608/9618/2503/files/Child_Development_Icon-02.7c42f1c.svg?v=1638864639',
//       TagDesc: null,
//     },
//     {
//       TagHandle: 'intellectual-dev',
//       TagName: 'Intellectual',
//       TagId: 122,
//       TagActived: 0,
//       TagParentId: 105,
//       IsDefaultParent: 0,
//       TagUpdate: null,
//       TagShortName: null,
//       TagImageURL:
//         'https://cdn.shopify.com/s/files/1/0608/9618/2503/files/Child_Development_Icon-03.157d2fe.svg?v=1638864639',
//       TagDesc: null,
//     },
//     {
//       TagHandle: 'language-dev',
//       TagName: 'Language',
//       TagId: 123,
//       TagActived: 0,
//       TagParentId: 105,
//       IsDefaultParent: 0,
//       TagUpdate: null,
//       TagShortName: null,
//       TagImageURL:
//         'https://cdn.shopify.com/s/files/1/0608/9618/2503/files/Child_Development_Icon-04.a8b2cae.svg?v=1638864639',
//       TagDesc: null,
//     },
//     {
//       TagHandle: 'fine-motor',
//       TagName: 'Fine Motor',
//       TagId: 124,
//       TagActived: 1,
//       TagParentId: 107,
//       IsDefaultParent: 0,
//       TagUpdate: null,
//       TagShortName: null,
//       TagImageURL:
//         'https://cdn.shopify.com/s/files/1/0608/9618/2503/files/Icon_ChildDev-08_FineMotor.2d219be.svg?v=1638866543',
//       TagDesc: null,
//     },
//     {
//       TagHandle: 'gross-motor',
//       TagName: 'Gross Motor',
//       TagId: 125,
//       TagActived: 1,
//       TagParentId: 107,
//       IsDefaultParent: 0,
//       TagUpdate: null,
//       TagShortName: null,
//       TagImageURL:
//         'https://cdn.shopify.com/s/files/1/0608/9618/2503/files/Icon_ChildDev-09_GrossMotor.f9642d2.svg?v=1638866543',
//       TagDesc: null,
//     },
//     {
//       TagHandle: 'coordination',
//       TagName: 'Coordination',
//       TagId: 126,
//       TagActived: 1,
//       TagParentId: 107,
//       IsDefaultParent: 0,
//       TagUpdate: null,
//       TagShortName: null,
//       TagImageURL:
//         'https://cdn.shopify.com/s/files/1/0608/9618/2503/files/Icon_ChildDev-04_Coordination.2ce4e67.svg?v=1638866543',
//       TagDesc: null,
//     },
//     {
//       TagHandle: 'visual',
//       TagName: 'Visual',
//       TagId: 127,
//       TagActived: 1,
//       TagParentId: 107,
//       IsDefaultParent: 0,
//       TagUpdate: null,
//       TagShortName: null,
//       TagImageURL:
//         'https://cdn.shopify.com/s/files/1/0608/9618/2503/files/Icon_ChildDev-22_Visual.e1ebe8a.svg?v=1638866543',
//       TagDesc: null,
//     },
//     {
//       TagHandle: 'auditory',
//       TagName: 'Auditory',
//       TagId: 128,
//       TagActived: 1,
//       TagParentId: 107,
//       IsDefaultParent: 0,
//       TagUpdate: null,
//       TagShortName: null,
//       TagImageURL:
//         'https://cdn.shopify.com/s/files/1/0608/9618/2503/files/Icon_ChildDev-01_Auditory.c4e2daf.svg?v=1638866543',
//       TagDesc: null,
//     },
//     {
//       TagHandle: 'tactile',
//       TagName: 'Tactile',
//       TagId: 129,
//       TagActived: 1,
//       TagParentId: 107,
//       IsDefaultParent: 0,
//       TagUpdate: null,
//       TagShortName: null,
//       TagImageURL:
//         'https://cdn.shopify.com/s/files/1/0608/9618/2503/files/Icon_ChildDev-20_Tactile.b57de5c.svg?v=1638866543',
//       TagDesc: null,
//     },
//     {
//       TagHandle: 'physical',
//       TagName: 'Physical',
//       TagId: 130,
//       TagActived: 1,
//       TagParentId: 107,
//       IsDefaultParent: 0,
//       TagUpdate: null,
//       TagShortName: null,
//       TagImageURL:
//         'https://cdn.shopify.com/s/files/1/0608/9618/2503/files/Icon_ChildDev-15_Physical.c510f31.svg?v=1638866543',
//       TagDesc: null,
//     },
//     {
//       TagHandle: 'emotion',
//       TagName: 'Emotion',
//       TagId: 131,
//       TagActived: 1,
//       TagParentId: 107,
//       IsDefaultParent: 0,
//       TagUpdate: null,
//       TagShortName: null,
//       TagImageURL:
//         'https://cdn.shopify.com/s/files/1/0608/9618/2503/files/Icon_ChildDev-06_Emotion.7a0ac93.svg?v=1638869694',
//       TagDesc: null,
//     },
//     {
//       TagHandle: 'musical',
//       TagName: 'Musical',
//       TagId: 132,
//       TagActived: 1,
//       TagParentId: 107,
//       IsDefaultParent: 0,
//       TagUpdate: null,
//       TagShortName: null,
//       TagImageURL:
//         'https://cdn.shopify.com/s/files/1/0608/9618/2503/files/Icon_ChildDev-16_Musical.e798fb0.svg?v=1638869694',
//       TagDesc: null,
//     },
//     {
//       TagHandle: 'social',
//       TagName: 'Social',
//       TagId: 133,
//       TagActived: 1,
//       TagParentId: 107,
//       IsDefaultParent: 0,
//       TagUpdate: null,
//       TagShortName: null,
//       TagImageURL:
//         'https://cdn.shopify.com/s/files/1/0608/9618/2503/files/Icon_ChildDev-19_ocial.315423f.svg?v=1638869694',
//       TagDesc: null,
//     },
//     {
//       TagHandle: 'theory-of-mind',
//       TagName: 'Theory of Mind',
//       TagId: 134,
//       TagActived: 1,
//       TagParentId: 107,
//       IsDefaultParent: 0,
//       TagUpdate: null,
//       TagShortName: null,
//       TagImageURL:
//         'https://cdn.shopify.com/s/files/1/0608/9618/2503/files/Icon_ChildDev-21_TheoryofMind.99baa8c.svg?v=1638869694',
//       TagDesc: null,
//     },
//     {
//       TagHandle: 'cause-and-effect',
//       TagName: 'Cause & Effect',
//       TagId: 135,
//       TagActived: 1,
//       TagParentId: 107,
//       IsDefaultParent: 0,
//       TagUpdate: null,
//       TagShortName: null,
//       TagImageURL:
//         'https://cdn.shopify.com/s/files/1/0608/9618/2503/files/Icon_ChildDev-02_CauseEffect.c74a96c.svg?v=1638870238',
//       TagDesc: null,
//     },
//     {
//       TagHandle: 'explore',
//       TagName: 'Explore',
//       TagId: 136,
//       TagActived: 1,
//       TagParentId: 107,
//       IsDefaultParent: 0,
//       TagUpdate: null,
//       TagShortName: null,
//       TagImageURL:
//         'https://cdn.shopify.com/s/files/1/0608/9618/2503/files/Icon_ChildDev-07_Explore.4594ae2.svg?v=1638870238',
//       TagDesc: null,
//     },
//     {
//       TagHandle: 'concentration',
//       TagName: 'Concentration',
//       TagId: 137,
//       TagActived: 1,
//       TagParentId: 107,
//       IsDefaultParent: 0,
//       TagUpdate: null,
//       TagShortName: null,
//       TagImageURL:
//         'https://cdn.shopify.com/s/files/1/0608/9618/2503/files/Icon_ChildDev-03_Concentration.29c76ae.svg?v=1638870238',
//       TagDesc: null,
//     },
//     {
//       TagHandle: 'creative',
//       TagName: 'Creative',
//       TagId: 138,
//       TagActived: 1,
//       TagParentId: 107,
//       IsDefaultParent: 0,
//       TagUpdate: null,
//       TagShortName: null,
//       TagImageURL:
//         'https://cdn.shopify.com/s/files/1/0608/9618/2503/files/Icon_ChildDev-05_Creative.b032348.svg?v=1638870238',
//       TagDesc: null,
//     },
//     {
//       TagHandle: 'memory',
//       TagName: 'Memory',
//       TagId: 139,
//       TagActived: 1,
//       TagParentId: 107,
//       IsDefaultParent: 0,
//       TagUpdate: null,
//       TagShortName: null,
//       TagImageURL:
//         'https://cdn.shopify.com/s/files/1/0608/9618/2503/files/Icon_ChildDev-17_Memory.e8b7ac4.svg?v=1638870238',
//       TagDesc: null,
//     },
//     {
//       TagHandle: 'logical',
//       TagName: 'Logical',
//       TagId: 140,
//       TagActived: 1,
//       TagParentId: 107,
//       IsDefaultParent: 0,
//       TagUpdate: null,
//       TagShortName: null,
//       TagImageURL:
//         'https://cdn.shopify.com/s/files/1/0608/9618/2503/files/Icon_ChildDev-12_Logical.3617ad9.svg?v=1638870238',
//       TagDesc: null,
//     },
//     {
//       TagHandle: 'mathematical',
//       TagName: 'Mathematical',
//       TagId: 141,
//       TagActived: 1,
//       TagParentId: 107,
//       IsDefaultParent: 0,
//       TagUpdate: null,
//       TagShortName: null,
//       TagImageURL:
//         'https://cdn.shopify.com/s/files/1/0608/9618/2503/files/Icon_ChildDev-18_Mathematical.df65e17.svg?v=1638870238',
//       TagDesc: null,
//     },
//     {
//       TagHandle: 'problem-solving',
//       TagName: 'Problem Solving',
//       TagId: 142,
//       TagActived: 1,
//       TagParentId: 107,
//       IsDefaultParent: 0,
//       TagUpdate: null,
//       TagShortName: null,
//       TagImageURL:
//         'https://cdn.shopify.com/s/files/1/0608/9618/2503/files/Icon_ChildDev-23_ProblemSolving.765715e.svg?v=1638870238',
//       TagDesc: null,
//     },
//     {
//       TagHandle: 'imagination',
//       TagName: 'Imagination',
//       TagId: 143,
//       TagActived: 1,
//       TagParentId: 107,
//       IsDefaultParent: 0,
//       TagUpdate: null,
//       TagShortName: null,
//       TagImageURL:
//         'https://cdn.shopify.com/s/files/1/0608/9618/2503/files/Icon_ChildDev-10_Imagonation.19ae23c.svg?v=1638870238',
//       TagDesc: null,
//     },
//     {
//       TagHandle: 'language-and-communications',
//       TagName: 'Language & Communications',
//       TagId: 144,
//       TagActived: 1,
//       TagParentId: 107,
//       IsDefaultParent: 0,
//       TagUpdate: null,
//       TagShortName: null,
//       TagImageURL:
//         'https://cdn.shopify.com/s/files/1/0608/9618/2503/files/Icon_ChildDev-11_LanguageCommunication.1c3d631.svg?v=1638870667',
//       TagDesc: null,
//     },
//     {
//       TagHandle: 'sign-language',
//       TagName: 'Sign Language',
//       TagId: 145,
//       TagActived: 1,
//       TagParentId: 107,
//       IsDefaultParent: 0,
//       TagUpdate: null,
//       TagShortName: null,
//       TagImageURL:
//         'https://cdn.shopify.com/s/files/1/0608/9618/2503/files/Icon_ChildDev-13_SignLanguage.9bfe741.svg?v=1638870667',
//       TagDesc: null,
//     },
//     {
//       TagHandle: 'pre-braille',
//       TagName: 'Pre Braille',
//       TagId: 146,
//       TagActived: 1,
//       TagParentId: 107,
//       IsDefaultParent: 0,
//       TagUpdate: null,
//       TagShortName: null,
//       TagImageURL:
//         'https://cdn.shopify.com/s/files/1/0608/9618/2503/files/Icon_ChildDev-14_PreBraille.43315a7.svg?v=1638870667',
//       TagDesc: null,
//     },
//     {
//       TagHandle: 'active-play',
//       TagName: 'Active Play',
//       TagId: 147,
//       TagActived: 1,
//       TagParentId: 104,
//       IsDefaultParent: 0,
//       TagUpdate: null,
//       TagShortName: null,
//       TagImageURL:
//         'https://www.plantoys.com/cdn/shop/collections/3528f1ba703c4866a386553aadbe7072_1200x1200.png?v=1712797731',
//       TagDesc: null,
//     },
//     {
//       TagHandle: 'baby',
//       TagName: 'Baby',
//       TagId: 148,
//       TagActived: 1,
//       TagParentId: 104,
//       IsDefaultParent: 0,
//       TagUpdate: null,
//       TagShortName: null,
//       TagImageURL:
//         'https://www.plantoys.com/cdn/shop/collections/9d79da7db33e77f20f4825e1d4bde38b_1200x1200.webp?v=1712797803',
//       TagDesc: null,
//     },
//     {
//       TagHandle: 'better-aging',
//       TagName: 'Better Aging',
//       TagId: 149,
//       TagActived: 1,
//       TagParentId: 104,
//       IsDefaultParent: 0,
//       TagUpdate: null,
//       TagShortName: null,
//       TagImageURL:
//         'https://cdn.shopify.com/s/files/1/0781/4044/0901/files/Plantoys-Memo-Gale-Toys-Dementia.jpg',
//       TagDesc: null,
//     },
//     {
//       TagHandle: 'blocks-and-construction',
//       TagName: 'Blocks & Construction',
//       TagId: 150,
//       TagActived: 1,
//       TagParentId: 104,
//       IsDefaultParent: 0,
//       TagUpdate: null,
//       TagShortName: null,
//       TagImageURL:
//         'https://www.plantoys.com/cdn/shop/collections/04b9b20d7e277d5b39edd724f9b201c8_1200x1200.png?v=1712798063',
//       TagDesc: null,
//     },
//     {
//       TagHandle: 'games-and-puzzles',
//       TagName: 'Games & Puzzles',
//       TagId: 151,
//       TagActived: 1,
//       TagParentId: 104,
//       IsDefaultParent: 0,
//       TagUpdate: null,
//       TagShortName: null,
//       TagImageURL:
//         'https://www.plantoys.com/cdn/shop/collections/07efcf9096257fdb139b4b86a1113d1a_1200x1200.png?v=1712798086',
//       TagDesc: null,
//     },
//     {
//       TagHandle: 'education-and-learning',
//       TagName: 'Education & Learning',
//       TagId: 152,
//       TagActived: 1,
//       TagParentId: 104,
//       IsDefaultParent: 0,
//       TagUpdate: null,
//       TagShortName: null,
//       TagImageURL:
//         'https://www.plantoys.com/cdn/shop/collections/726633101c8afe8dd7fa50266c646b88_1200x1200.png?v=1712798101',
//       TagDesc: null,
//     },
//   ];

//   console.log(tags);

//   const recipes = [
//     {
//       name: 'elotes',
//       ingredients: [
//         'corn',
//         'mayonnaise',
//         'cotija cheese',
//         'sour cream',
//         'lime',
//       ],
//       prepTimeInMinutes: 35,
//     },
//     {
//       name: 'loco moco',
//       ingredients: [
//         'ground beef',
//         'butter',
//         'onion',
//         'egg',
//         'bread bun',
//         'mushrooms',
//       ],
//       prepTimeInMinutes: 54,
//     },
//     {
//       name: 'patatas bravas',
//       ingredients: [
//         'potato',
//         'tomato',
//         'olive oil',
//         'onion',
//         'garlic',
//         'paprika',
//       ],
//       prepTimeInMinutes: 80,
//     },
//     {
//       name: 'fried rice',
//       ingredients: [
//         'rice',
//         'soy sauce',
//         'egg',
//         'onion',
//         'pea',
//         'carrot',
//         'sesame oil',
//       ],
//       prepTimeInMinutes: 40,
//     },
//   ];

//   // try {
//   //   const insertManyResult = await collection.insertMany(tags);
//   //   console.log(
//   //     `${insertManyResult.insertedCount} tags successfully inserted.\n`
//   //   );
//   // } catch (err) {
//   //   console.error(
//   //     `Something went wrong trying to insert the new tags: ${err}\n`
//   //   );
//   // }

//   // *** FIND DOCUMENTS ***
//   // Find tags with TagActived set to 0
//   const findQuery = { TagActived: 0 };

//   try {
//     const cursor = await collection.find(findQuery).sort({ TagName: 1 });
//     await cursor.forEach((tag) => {
//       console.log(
//         `${tag.TagName} is inactive and has the handle ${tag.TagHandle}.`
//       );
//     });
//     console.log(); // Add a linebreak
//   } catch (err) {
//     console.error(`Something went wrong trying to find the tags: ${err}\n`);
//   }

//   // *** FIND ONE DOCUMENT ***
//   // Find a tag with 'Intellectual' in the TagName field
//   const findOneQuery = { TagName: 'Intellectual' };

//   try {
//     const findOneResult = await collection.findOne(findOneQuery);
//     if (findOneResult === null) {
//       console.log("Couldn't find any tag with the name 'Intellectual'.\n");
//     } else {
//       console.log(
//         `Found a tag with the name 'Intellectual':\n${JSON.stringify(findOneResult)}\n`
//       );
//     }
//   } catch (err) {
//     console.error(`Something went wrong trying to find one tag: ${err}\n`);
//   }

//   // *** UPDATE A DOCUMENT ***
//   // Update the TagActived status of a specific tag to 1
//   // const updateDoc = { $set: { TagActived: 1 } };
//   // const updateOptions = { returnOriginal: false };

//   // try {
//   //   const updateResult = await collection.findOneAndUpdate(
//   //     findOneQuery,
//   //     updateDoc,
//   //     updateOptions
//   //   );
//   //   console.log(
//   //     `Here is the updated tag:\n${JSON.stringify(updateResult.value)}\n`
//   //   );
//   // } catch (err) {
//   //   console.error(`Something went wrong trying to update the tag: ${err}\n`);
//   // }

//   // *** DELETE DOCUMENTS ***
//   // Delete tags where the TagName is either 'Social & Emotional' or 'Language'
//   // const deleteQuery = { TagName: { $in: ['Social & Emotional', 'Language'] } };

//   // try {
//   //   const deleteResult = await collection.deleteMany(deleteQuery);
//   //   console.log(`Deleted ${deleteResult.deletedCount} tags\n`);
//   // } catch (err) {
//   //   console.error(`Something went wrong trying to delete tags: ${err}\n`);
//   // }

//   // Make sure to call close() on your client to perform cleanup operations
//   await client.close();
// }

// run().catch(console.dir);
