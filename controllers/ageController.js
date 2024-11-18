// Import the Tag model using ES Module syntax
import Tag from '../models/Tag.js' // Ensure to add the .js extension

// Controller function to get tags where isActive is true and parentTagNumber is 106
const getActiveAgeTags = async (req, res) => {
    try {
        // Filter the tags by isActive: true and parentTagNumber: 106
        const tags = await Tag.find({ isActive: true, parentTagNumber: 106 })

        // If no tags are found, send a 404 response with a message
        if (tags.length === 0) {
            return res
                .status(404)
                .json([
                    'No active tags found for the specified parentTagNumber',
                ])
        }

        // Send the tags directly as an array response
        return res.status(200).json(tags) // Sending the array of tags directly
    } catch (error) {
        // Handle any errors that occur during the query
        console.error('Error fetching tags:', error)
        return res
            .status(500)
            .json(['An error occurred while fetching the tags'])
    }
}

// Export the controller function using ES Module syntax
export { getActiveAgeTags }
