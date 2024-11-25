import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
// import config from './config/config'; // Uncomment this if you have a config module

// Create an Express app
const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

// Routes
import v1Routes from './src/api/v1/index.js';
import v2Routes from './src/api/v2/index.js';

app.use('/api/v1', v1Routes);
app.use('/api/v2', v2Routes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    if (next && req) console.error('Error handling middleware');
    res.status(500).send('Something went wrong!');
});

// Export the app
export default app;
