const express = require('express')
const cors = require('cors')

const app = express()

// Middleware to parse JSON requests
app.use(express.json())

// Middleware to handle CORS (Cross-Origin Resource Sharing)
app.use(
    cors({
        origin: '*', // Allow all origins (use cautiously in production)
    })
)

// Middleware to handle GET requests to the root endpoint
app.get('/', (req, res) => {
    res.send('Express on Vercel')
})

// Use the PORT from environment variables or default to 3000
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server ready on port ${PORT}.`)
})

// Export the Express app as a serverless function for Vercel
module.exports = (req, res) => {
    app(req, res) // Vercel invokes this handler for each request
}
