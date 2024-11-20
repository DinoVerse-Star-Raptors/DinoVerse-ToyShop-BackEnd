import pino from 'pino';

const logger = pino(
  {
    level: 'info',
    messageKey: 'payload',
    transport: {
      targets: [
        {
          target: 'pino-pretty',
          level: 'trace'
        },
        {
          target: 'pino/file',
          options: { destination: './logs/app.log' },
          level: 'trace'
        }
      ]
    }
  },
  pino.destination('./logs/app.log')
);

logger.customError = (req, err) => {
  if (err.logActive === false) {
    return;
  }
  logger.error(
    JSON.stringify({
      username: 'Dino (from auth middleware)',
      method: req.method,
      originalUrl: req.originalUrl,
      error: err,
      params: req.params,
      query: req.query,
      body: req.body,
      headers: req.headers
    })
  );
};

export default logger;

// logger.fatal('fatal');
// logger.error('error');
// logger.warn('warn');
// logger.info('Info level');
