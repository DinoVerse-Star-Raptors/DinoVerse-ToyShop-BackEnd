// const express = require('express');
// const app = express();

// app.get('/', (req, res) => res.send('Express on Vercel'));

// app.listen(3000, () => console.log('Server ready on port 3000.'));

// module.exports = app;

const express = require('express');
const app = express();

// Middleware to handle requests
app.get('/', (req, res) => {
  res.send('Express on Vercel');
});

// Export the express app to be used as a serverless function
module.exports = (req, res) => {
  app(req, res);
};
