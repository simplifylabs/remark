require('module-alias/register');
require('@util/logger')();
require('@util/dotenv')();

import express from 'express';
import cookies from 'cookie-parser';
import cors from '@middleware/cors';
import error from '@middleware/error';
import auth from '@router/auth';
import comment from '@router/comment';
import user from '@router/user';
import feedback from '@router/feedback';

(async () => {
  const app = express();

  // Global Middleware
  app.use(express.json());
  app.use(cookies());
  app.use(cors());

  // Routers
  app.use('/auth', auth);
  app.use('/comment', comment);
  app.use('/user', user);
  app.use('/feedback', feedback);

  // Error Handler
  app.use(error());

  // 404 Not Found
  app.use((_, res) => {
    res.status(404).json({
      error: 'NOT_FOUND',
      message: 'The requested ressource was not found',
    });
  });

  // Start the server
  app.listen(process.env.PORT, () => {
    console.info(`Remark API is listening on port ${process.env.PORT}`);
  });

  return 0;
})();
