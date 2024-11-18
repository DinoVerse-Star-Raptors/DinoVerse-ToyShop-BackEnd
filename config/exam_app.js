const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
// const config = require('./config/config');

// Middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

// Routes
const v1Routes = require('./src/api/v1/index');
const v2Routes = require('./src/api/v2/index');

app.use('/api/v1', v1Routes);
app.use('/api/v2', v2Routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  if (next && req) console.error('Error handling middleware');
  res.status(500).send('Something went wrong!');
});

module.exports = app;
