const express = require('express');
const app = express();

app.use(express.json());

const myCallback = (req, res) => {
  res.send('This is my callback function');
};

app.get('/', myCallback);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
