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

// app.get('/hello-world', (req, res) => {
//   try {
//     /* Start log */
//     logger.info(
//       {
//         method: req.method,
//         path: req.originalUrl,
//         queryParams: req.query,
//         username: 'Dino (from auth middleware)',
//         timestamp: new Date().toISOString()
//       },
//       'Received request'
//     );
//     /* End log */

//     const { query } = req;
//     if (query.animal === 'cat') {
//       throw { message: 'Cats are banned' };
//     }

//     /* Start log */
//     logger.info(
//       {
//         username: 'Dino (from auth middleware)',
//         timestamp: new Date().toISOString()
//       },
//       'Response success!'
//     );
//     /* End log */

//     res.status(200).send('success!');
//   } catch (err) {
//     /* Start log */
//     logger.customError(req, err);
//     /* End log */

//     res.status(400).send({
//       status: 'failure',
//       message: err.message
//     });
//   }
// });
