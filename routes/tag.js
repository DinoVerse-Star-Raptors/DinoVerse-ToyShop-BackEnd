import express from 'express';
import Tag from '../models/Tag'; // Import the Tag model

const router = express.Router();

// POST endpoint to create a new tag
router.post('/tags', async (req, res) => {
    try {
        const {
            handle,
            name,
            tagNumber,
            isActive,
            parentTagNumber,
            imageUrl,
            isDefaultParent,
            relativeHandle,
            description
        } = req.body;

        // Create a new tag
        const newTag = new Tag({
            handle,
            name,
            tagNumber,
            isActive,
            parentTagNumber,
            imageUrl,
            isDefaultParent,
            relativeHandle,
            description
        });

        // Validate and save the tag
        await newTag.validate(); // Trigger Mongoose validation

        // Save to MongoDB
        await newTag.save();

        res.status(201).json({
            message: 'Tag created successfully',
            tag: newTag
        });
    } catch (error) {
        // If there are validation errors or other issues
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                message: 'Validation failed',
                errors: error.errors
            });
        }

        // Other errors (e.g., database errors)
        console.error(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
});

export default router;
