import app from './app';
import http from 'http';
import config from './config/config';

const server = http.createServer(app);

server.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});

server.on('error', (error) => {
    console.error('Server error:', error);
});
