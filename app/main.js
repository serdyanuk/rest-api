'use strict';

const store = require('./store');
const express = require('express');
const { items, auth } = require('./routes');
const helmet = require('helmet');
const errorHandler = require('./middlewares/error');
const logger = require('./conifg/logger');

const app = express();

app.use(helmet());
app.use(express.json());
app.use([items, auth]);
app.use(errorHandler);

let server = null;

store
  .init()
  .then(() => {
    server = app.listen(3000, () =>
      logger.info('HTTP server running on PORT: 3000')
    );
  })
  .catch((e) => logger.error(e.message));

const gracefulShutdown = () => {
  store.close();
  if (server) {
    server.close((err) => {
      if (err) logger.error(err.message);

      logger.info('HTTP server gracefuly shutdown');
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
};

process.on('SIGINT', gracefulShutdown); // ctrl+c
process.on('SIGTERM', gracefulShutdown); // kill
process.on('SIGUSR2', gracefulShutdown); // nodemon
