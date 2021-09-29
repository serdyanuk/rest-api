'use strict';

const store = require('./store');
const express = require('express');
const { items, users, auth } = require('./routes');
const helmet = require('helmet');
const errorHandler = require('./middlewares/error');
const logger = require('./conifg/logger');

const app = express();

app.use(helmet());
app.use(express.json());
app.use([items, users, auth]);
app.use(errorHandler);

store
  .init()
  .then(() => {
    app.listen(3000, () => logger.info('Server running on PORT: 3000'));
  })
  .catch((e) => logger.error(e.message));

const gracefulShutdown = () => {
  store.close();
};

// process.on('SIGINT', gracefulShutdown);
// process.on('SIGTERM', gracefulShutdown);
// process.on('SIGUSR2', gracefulShutdown);
