// insertTags.js
const mongoose = require('mongoose')
const Tag = require('./models/Tag') // Assuming the Tag model is in models/Tag.js
require('dotenv').config() // Load environment variables from .env file
// const { MongoClient } = require('mongodb');

// Connect to MongoDB using mongoose
const connectToDatabase = async () => {
    const uri = process.env.MONGO_URI

    if (!uri) {
        console.error('MongoDB URI is not defined in .env file')
        process.exit(1) // Exit if no URI
    }

    try {
        await mongoose.connect(uri)
        console.log('Connected to MongoDB')
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error)
        process.exit(1) // Exit on connection failure
    }
}

const tags = [
    {
        handle: 'root',
        name: 'Root Tag',
        tagNumber: 100,
        isActive: false,
        parentTagNumber: 100,
        imageUrl: null,
        isDefaultParent: false,
        relativeHandle: [],
        description: '',
    },
    {
        handle: 'all',
        name: 'All Toys',
        tagNumber: 101,
        isActive: true,
        parentTagNumber: 100,
        imageUrl:
            'https://cdn.shopify.com/s/files/1/0608/9618/2503/files/Child_Development_Icon-02.7c42f1c.svg?v=1638864639',
        isDefaultParent: true,
        relativeHandle: [],
        description: '',
    },
    {
        handle: 'others',
        name: 'Others',
        tagNumber: 102,
        isActive: true,
        parentTagNumber: 101,
        imageUrl: null,
        isDefaultParent: false,
        relativeHandle: [],
        description: '',
    },
    {
        handle: 'miscellaneous',
        name: 'Miscellaneous',
        tagNumber: 103,
        isActive: false,
        parentTagNumber: 101,
        imageUrl: null,
        isDefaultParent: false,
        relativeHandle: ['all'],
        description: '',
    },
    {
        handle: 'categories',
        name: 'Categories',
        tagNumber: 104,
        isActive: true,
        parentTagNumber: 101,
        imageUrl: null,
        isDefaultParent: false,
        relativeHandle: ['all'],
        description: '',
    },
    {
        handle: 'collections',
        name: 'Collections',
        tagNumber: 105,
        isActive: false,
        parentTagNumber: 101,
        imageUrl: null,
        isDefaultParent: false,
        relativeHandle: ['all'],
        description: '',
    },
    {
        handle: 'age',
        name: 'Age',
        tagNumber: 106,
        isActive: true,
        parentTagNumber: 101,
        imageUrl: null,
        isDefaultParent: false,
        relativeHandle: ['all'],
        description: '',
    },
    {
        handle: 'child-development',
        name: 'Child Development',
        tagNumber: 107,
        isActive: true,
        parentTagNumber: 101,
        imageUrl: null,
        isDefaultParent: false,
        relativeHandle: ['all'],
        description: '',
    },
    {
        handle: 'events',
        name: 'Events',
        tagNumber: 108,
        isActive: false,
        parentTagNumber: 101,
        imageUrl: null,
        isDefaultParent: false,
        relativeHandle: ['all'],
        description: '',
    },
    {
        handle: 'promotions',
        name: 'Promotions',
        tagNumber: 109,
        isActive: false,
        parentTagNumber: 101,
        imageUrl: null,
        isDefaultParent: false,
        relativeHandle: ['all'],
        description: '',
    },
    {
        handle: '0-6m',
        name: '0-6M',
        tagNumber: 110,
        isActive: true,
        parentTagNumber: 106,
        imageUrl: null,
        isDefaultParent: false,
        relativeHandle: ['age'],
        description: '',
    },
    {
        handle: '6m',
        name: '6M+',
        tagNumber: 111,
        isActive: true,
        parentTagNumber: 106,
        imageUrl: null,
        isDefaultParent: false,
        relativeHandle: ['age'],
        description: '',
    },
    {
        handle: '12m',
        name: '12M+',
        tagNumber: 112,
        isActive: true,
        parentTagNumber: 106,
        imageUrl: null,
        isDefaultParent: false,
        relativeHandle: ['age'],
        description: '',
    },
    {
        handle: '18m',
        name: '18M+',
        tagNumber: 113,
        isActive: true,
        parentTagNumber: 106,
        imageUrl: null,
        isDefaultParent: false,
        relativeHandle: ['age'],
        description: '',
    },
    {
        handle: '24m',
        name: '24M+',
        tagNumber: 114,
        isActive: false,
        parentTagNumber: 106,
        imageUrl: null,
        isDefaultParent: false,
        relativeHandle: ['age'],
        description: '',
    },
    {
        handle: '2yrs',
        name: '2Yrs+',
        tagNumber: 115,
        isActive: true,
        parentTagNumber: 106,
        imageUrl: null,
        isDefaultParent: false,
        relativeHandle: ['age'],
        description: '',
    },
    {
        handle: '36m',
        name: '36M+',
        tagNumber: 116,
        isActive: false,
        parentTagNumber: 106,
        imageUrl: null,
        isDefaultParent: false,
        relativeHandle: ['age'],
        description: '',
    },
    {
        handle: '3yrs',
        name: '3Yrs+',
        tagNumber: 117,
        isActive: false,
        parentTagNumber: 106,
        imageUrl: null,
        isDefaultParent: false,
        relativeHandle: ['age'],
        description: '',
    },
    {
        handle: '60m',
        name: '60M+',
        tagNumber: 118,
        isActive: false,
        parentTagNumber: 106,
        imageUrl: null,
        isDefaultParent: false,
        relativeHandle: ['age'],
        description: '',
    },
    {
        handle: '5yrs',
        name: '5Yrs+',
        tagNumber: 119,
        isActive: true,
        parentTagNumber: 106,
        imageUrl: null,
        isDefaultParent: false,
        relativeHandle: ['age'],
        description: '',
    },
    {
        handle: 'physical-dev',
        name: 'Physical Dev',
        tagNumber: 120,
        isActive: false,
        parentTagNumber: 105,
        imageUrl:
            'https://cdn.shopify.com/s/files/1/0608/9618/2503/files/Child_Development_Icon-01.e9c8918.svg?v=1638864639',
        isDefaultParent: false,
        relativeHandle: ['all'],
        description: '',
    },
    {
        handle: 'social-and-emotional-dev',
        name: 'Social & Emotional Dev',
        tagNumber: 121,
        isActive: false,
        parentTagNumber: 105,
        imageUrl:
            'https://cdn.shopify.com/s/files/1/0608/9618/2503/files/Child_Development_Icon-02.7c42f1c.svg?v=1638864639',
        isDefaultParent: false,
        relativeHandle: ['all'],
        description: '',
    },
    {
        handle: 'intellectual-dev',
        name: 'Intellectual Dev',
        tagNumber: 122,
        isActive: false,
        parentTagNumber: 105,
        imageUrl:
            'https://cdn.shopify.com/s/files/1/0608/9618/2503/files/Child_Development_Icon-03.157d2fe.svg?v=1638864639',
        isDefaultParent: false,
        relativeHandle: ['all'],
        description: '',
    },
    {
        handle: 'language-dev',
        name: 'Language Dev',
        tagNumber: 123,
        isActive: false,
        parentTagNumber: 105,
        imageUrl:
            'https://cdn.shopify.com/s/files/1/0608/9618/2503/files/Child_Development_Icon-04.a8b2cae.svg?v=1638864639',
        isDefaultParent: false,
        relativeHandle: ['all'],
        description: '',
    },
    {
        handle: 'fine-motor',
        name: 'Fine Motor',
        tagNumber: 124,
        isActive: true,
        parentTagNumber: 107,
        imageUrl:
            'https://cdn.shopify.com/s/files/1/0608/9618/2503/files/Icon_ChildDev-08_FineMotor.2d219be.svg?v=1638866543',
        isDefaultParent: false,
        relativeHandle: ['child-development', 'physical-dev'],
        description: '',
    },
    {
        handle: 'gross-motor',
        name: 'Gross Motor',
        tagNumber: 125,
        isActive: true,
        parentTagNumber: 107,
        imageUrl:
            'https://cdn.shopify.com/s/files/1/0608/9618/2503/files/Icon_ChildDev-09_GrossMotor.f9642d2.svg?v=1638866543',
        isDefaultParent: false,
        relativeHandle: ['child-development', 'physical-dev'],
        description: '',
    },
    {
        handle: 'coordination',
        name: 'Coordination',
        tagNumber: 126,
        isActive: false,
        parentTagNumber: 107,
        imageUrl:
            'https://cdn.shopify.com/s/files/1/0608/9618/2503/files/Icon_ChildDev-04_Coordination.2ce4e67.svg?v=1638866543',
        isDefaultParent: false,
        relativeHandle: ['child-development', 'physical-dev'],
        description: '',
    },
    {
        handle: 'visual',
        name: 'Visual',
        tagNumber: 127,
        isActive: false,
        parentTagNumber: 107,
        imageUrl:
            'https://cdn.shopify.com/s/files/1/0608/9618/2503/files/Icon_ChildDev-22_Visual.e1ebe8a.svg?v=1638866543',
        isDefaultParent: false,
        relativeHandle: ['child-development', 'physical-dev'],
        description: '',
    },
    {
        handle: 'auditory',
        name: 'Auditory',
        tagNumber: 128,
        isActive: false,
        parentTagNumber: 107,
        imageUrl:
            'https://cdn.shopify.com/s/files/1/0608/9618/2503/files/Icon_ChildDev-01_Auditory.c4e2daf.svg?v=1638866543',
        isDefaultParent: false,
        relativeHandle: ['child-development', 'physical-dev'],
        description: '',
    },
    {
        handle: 'tactile',
        name: 'Tactile',
        tagNumber: 129,
        isActive: false,
        parentTagNumber: 107,
        imageUrl:
            'https://cdn.shopify.com/s/files/1/0608/9618/2503/files/Icon_ChildDev-20_Tactile.b57de5c.svg?v=1638866543',
        isDefaultParent: false,
        relativeHandle: ['child-development', 'physical-dev'],
        description: '',
    },
    {
        handle: 'physical',
        name: 'Physical',
        tagNumber: 130,
        isActive: false,
        parentTagNumber: 107,
        imageUrl:
            'https://cdn.shopify.com/s/files/1/0608/9618/2503/files/Icon_ChildDev-15_Physical.c510f31.svg?v=1638866543',
        isDefaultParent: false,
        relativeHandle: ['child-development', 'physical-dev'],
        description: '',
    },
    {
        handle: 'emotion',
        name: 'Emotion',
        tagNumber: 131,
        isActive: true,
        parentTagNumber: 107,
        imageUrl:
            'https://cdn.shopify.com/s/files/1/0608/9618/2503/files/Icon_ChildDev-06_Emotion.7a0ac93.svg?v=1638869694',
        isDefaultParent: false,
        relativeHandle: ['child-development', 'social-and-emotional-dev'],
        description: '',
    },
    {
        handle: 'musical',
        name: 'Musical',
        tagNumber: 132,
        isActive: true,
        parentTagNumber: 107,
        imageUrl:
            'https://cdn.shopify.com/s/files/1/0608/9618/2503/files/Icon_ChildDev-16_Musical.e798fb0.svg?v=1638869694',
        isDefaultParent: false,
        relativeHandle: ['child-development', 'social-and-emotional-dev'],
        description: '',
    },
    {
        handle: 'social',
        name: 'Social',
        tagNumber: 133,
        isActive: true,
        parentTagNumber: 107,
        imageUrl:
            'https://cdn.shopify.com/s/files/1/0608/9618/2503/files/Icon_ChildDev-19_ocial.315423f.svg?v=1638869694',
        isDefaultParent: false,
        relativeHandle: ['child-development', 'social-and-emotional-dev'],
        description: '',
    },
    {
        handle: 'theory-of-mind',
        name: 'Theory of Mind',
        tagNumber: 134,
        isActive: false,
        parentTagNumber: 107,
        imageUrl:
            'https://cdn.shopify.com/s/files/1/0608/9618/2503/files/Icon_ChildDev-21_TheoryofMind.99baa8c.svg?v=1638869694',
        isDefaultParent: false,
        relativeHandle: ['child-development', 'social-and-emotional-dev'],
        description: '',
    },
    {
        handle: 'cause-and-effect',
        name: 'Cause & Effect',
        tagNumber: 135,
        isActive: false,
        parentTagNumber: 107,
        imageUrl:
            'https://cdn.shopify.com/s/files/1/0608/9618/2503/files/Icon_ChildDev-02_CauseEffect.c74a96c.svg?v=1638870238',
        isDefaultParent: false,
        relativeHandle: ['child-development', 'intellectual-dev'],
        description: '',
    },
    {
        handle: 'explore',
        name: 'Explore',
        tagNumber: 136,
        isActive: false,
        parentTagNumber: 107,
        imageUrl:
            'https://cdn.shopify.com/s/files/1/0608/9618/2503/files/Icon_ChildDev-07_Explore.4594ae2.svg?v=1638870238',
        isDefaultParent: false,
        relativeHandle: ['child-development', 'intellectual-dev'],
        description: '',
    },
    {
        handle: 'concentration',
        name: 'Concentration',
        tagNumber: 137,
        isActive: false,
        parentTagNumber: 107,
        imageUrl:
            'https://cdn.shopify.com/s/files/1/0608/9618/2503/files/Icon_ChildDev-03_Concentration.29c76ae.svg?v=1638870238',
        isDefaultParent: false,
        relativeHandle: ['child-development', 'intellectual-dev'],
        description: '',
    },
    {
        handle: 'creative',
        name: 'Creative',
        tagNumber: 138,
        isActive: true,
        parentTagNumber: 107,
        imageUrl:
            'https://cdn.shopify.com/s/files/1/0608/9618/2503/files/Icon_ChildDev-05_Creative.b032348.svg?v=1638870238',
        isDefaultParent: false,
        relativeHandle: ['child-development', 'intellectual-dev'],
        description: '',
    },
    {
        handle: 'memory',
        name: 'Memory',
        tagNumber: 139,
        isActive: false,
        parentTagNumber: 107,
        imageUrl:
            'https://cdn.shopify.com/s/files/1/0608/9618/2503/files/Icon_ChildDev-17_Memory.e8b7ac4.svg?v=1638870238',
        isDefaultParent: false,
        relativeHandle: ['child-development', 'intellectual-dev'],
        description: '',
    },
    {
        handle: 'logical',
        name: 'Logical',
        tagNumber: 140,
        isActive: false,
        parentTagNumber: 107,
        imageUrl:
            'https://cdn.shopify.com/s/files/1/0608/9618/2503/files/Icon_ChildDev-12_Logical.3617ad9.svg?v=1638870238',
        isDefaultParent: false,
        relativeHandle: ['child-development', 'intellectual-dev'],
        description: '',
    },
    {
        handle: 'mathematical',
        name: 'Mathematical',
        tagNumber: 141,
        isActive: false,
        parentTagNumber: 107,
        imageUrl:
            'https://cdn.shopify.com/s/files/1/0608/9618/2503/files/Icon_ChildDev-18_Mathematical.df65e17.svg?v=1638870238',
        isDefaultParent: false,
        relativeHandle: ['child-development', 'intellectual-dev'],
        description: '',
    },
    {
        handle: 'problem-solving',
        name: 'Problem Solving',
        tagNumber: 142,
        isActive: false,
        parentTagNumber: 107,
        imageUrl:
            'https://cdn.shopify.com/s/files/1/0608/9618/2503/files/Icon_ChildDev-23_ProblemSolving.765715e.svg?v=1638870238',
        isDefaultParent: false,
        relativeHandle: ['child-development', 'intellectual-dev'],
        description: '',
    },
    {
        handle: 'imagination',
        name: 'Imagination',
        tagNumber: 143,
        isActive: false,
        parentTagNumber: 107,
        imageUrl:
            'https://cdn.shopify.com/s/files/1/0608/9618/2503/files/Icon_ChildDev-10_Imagonation.19ae23c.svg?v=1638870238',
        isDefaultParent: false,
        relativeHandle: ['child-development', 'intellectual-dev'],
        description: '',
    },
    {
        handle: 'language-and-communications',
        name: 'Language & Communications',
        tagNumber: 144,
        isActive: false,
        parentTagNumber: 107,
        imageUrl:
            'https://cdn.shopify.com/s/files/1/0608/9618/2503/files/Icon_ChildDev-11_LanguageCommunication.1c3d631.svg?v=1638870667',
        isDefaultParent: false,
        relativeHandle: ['child-development', 'language-dev'],
        description: '',
    },
    {
        handle: 'sign-language',
        name: 'Sign Language',
        tagNumber: 145,
        isActive: false,
        parentTagNumber: 107,
        imageUrl:
            'https://cdn.shopify.com/s/files/1/0608/9618/2503/files/Icon_ChildDev-13_SignLanguage.9bfe741.svg?v=1638870667',
        isDefaultParent: false,
        relativeHandle: ['child-development', 'language-dev'],
        description: '',
    },
    {
        handle: 'pre-braille',
        name: 'Pre Braille',
        tagNumber: 146,
        isActive: false,
        parentTagNumber: 107,
        imageUrl:
            'https://cdn.shopify.com/s/files/1/0608/9618/2503/files/Icon_ChildDev-14_PreBraille.43315a7.svg?v=1638870667',
        isDefaultParent: false,
        relativeHandle: ['child-development', 'language-dev'],
        description: '',
    },
    {
        handle: 'active-play',
        name: 'Active Play',
        tagNumber: 147,
        isActive: true,
        parentTagNumber: 104,
        imageUrl:
            'https://www.plantoys.com/cdn/shop/collections/3528f1ba703c4866a386553aadbe7072_1200x1200.png?v=1712797731',
        isDefaultParent: false,
        relativeHandle: ['categories'],
        description: '',
    },
    {
        handle: 'baby',
        name: 'Baby',
        tagNumber: 148,
        isActive: true,
        parentTagNumber: 104,
        imageUrl:
            'https://www.plantoys.com/cdn/shop/collections/9d79da7db33e77f20f4825e1d4bde38b_1200x1200.webp?v=1712797803',
        isDefaultParent: false,
        relativeHandle: ['categories'],
        description: '',
    },
    {
        handle: 'better-aging',
        name: 'Better Aging',
        tagNumber: 149,
        isActive: true,
        parentTagNumber: 104,
        imageUrl:
            'https://cdn.shopify.com/s/files/1/0781/4044/0901/files/Plantoys-Memo-Gale-Toys-Dementia.jpg',
        isDefaultParent: false,
        relativeHandle: ['categories'],
        description: '',
    },
    {
        handle: 'blocks-and-construction',
        name: 'Blocks & Construction',
        tagNumber: 150,
        isActive: true,
        parentTagNumber: 104,
        imageUrl:
            'https://www.plantoys.com/cdn/shop/collections/04b9b20d7e277d5b39edd724f9b201c8_1200x1200.png?v=1712798063',
        isDefaultParent: false,
        relativeHandle: ['categories'],
        description: '',
    },
    {
        handle: 'games-and-puzzles',
        name: 'Games & Puzzles',
        tagNumber: 151,
        isActive: true,
        parentTagNumber: 104,
        imageUrl:
            'https://www.plantoys.com/cdn/shop/collections/07efcf9096257fdb139b4b86a1113d1a_1200x1200.png?v=1712798086',
        isDefaultParent: false,
        relativeHandle: ['categories'],
        description: '',
    },
    {
        handle: 'education-and-learning',
        name: 'Education & Learning',
        tagNumber: 152,
        isActive: true,
        parentTagNumber: 104,
        imageUrl:
            'https://www.plantoys.com/cdn/shop/collections/726633101c8afe8dd7fa50266c646b88_1200x1200.png?v=1712798101',
        isDefaultParent: false,
        relativeHandle: ['categories'],
        description: '',
    },
    {
        handle: 'music',
        name: 'Music',
        tagNumber: 153,
        isActive: true,
        parentTagNumber: 104,
        imageUrl:
            'https://www.plantoys.com/cdn/shop/collections/af2f249a662d1c20c97e08ba3d907f53_1200x1200.png?v=1712798120',
        isDefaultParent: false,
        relativeHandle: ['categories'],
        description: '',
    },
    {
        handle: 'home',
        name: 'Home',
        tagNumber: 154,
        isActive: true,
        parentTagNumber: 104,
        imageUrl:
            'https://www.plantoys.com/cdn/shop/collections/dcb0bee72bcc8dabec80881fe691257a_1200x1200.png?v=1712798141',
        isDefaultParent: false,
        relativeHandle: ['categories'],
        description: '',
    },
    {
        handle: 'mini',
        name: 'Mini',
        tagNumber: 155,
        isActive: true,
        parentTagNumber: 104,
        imageUrl:
            'https://www.plantoys.com/cdn/shop/collections/8f0e0b1f57b98cd91cccfdb0e8b33d14_1200x1200.png?v=1712798229',
        isDefaultParent: false,
        relativeHandle: ['categories'],
        description: '',
    },
    {
        handle: 'pretend-play',
        name: 'Pretend Play',
        tagNumber: 156,
        isActive: true,
        parentTagNumber: 104,
        imageUrl:
            'https://www.plantoys.com/cdn/shop/collections/f9974d458076196ffddd8eea5517d17f_1200x1200.png?v=1712798317',
        isDefaultParent: false,
        relativeHandle: ['categories'],
        description: '',
    },
    {
        handle: 'push-and-pull',
        name: 'Push & Pull',
        tagNumber: 157,
        isActive: true,
        parentTagNumber: 104,
        imageUrl:
            'https://www.plantoys.com/cdn/shop/collections/b6cb67169e059f2a073e4eac9d3f9673_1200x1200.png?v=1712798345',
        isDefaultParent: false,
        relativeHandle: ['categories'],
        description: '',
    },
    {
        handle: 'water-play',
        name: 'Water Play',
        tagNumber: 158,
        isActive: true,
        parentTagNumber: 104,
        imageUrl:
            'https://www.plantoys.com/cdn/shop/collections/3b3434d15b2087eb4300ebd6b1414563_1200x1200.png?v=1712798409',
        isDefaultParent: false,
        relativeHandle: ['categories'],
        description: '',
    },
]

// Insert tags into the database, skipping duplicates based on the handle
const insertTags = async () => {
    try {
        // Insert tags one by one, skipping if the handle already exists
        const insertPromises = tags.map(async (tag) => {
            const existingTag = await Tag.findOne({ handle: tag.handle })
            if (!existingTag) {
                await Tag.create(tag)
                console.log(`Inserted tag: ${tag.handle}`)
            } else {
                console.log(`Tag with handle ${tag.handle} already exists.`)
            }
        })

        // Wait for all insertions to complete
        await Promise.all(insertPromises)

        console.log('Tag insertion process complete.')
    } catch (error) {
        console.error('Error inserting tags:', error)
    } finally {
        mongoose.connection.close() // Close the connection after the operation
    }
}

// Main function to execute the insertion
const main = async () => {
    await connectToDatabase() // Connect to the database
    await insertTags() // Insert tags
}

// Run the main function
main()
