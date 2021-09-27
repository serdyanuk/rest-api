'use strict';

const store = require('./store');
const express = require('express');
const { items, users, auth } = require('./routes');
const helmet = require('helmet');

const app = express();

app.use(helmet());
app.use(express.json());
app.use([items, users, auth]);

store
  .init()
  .then(() => {
    app.listen(3000, () => console.log('HTTP server running'));
  })
  .catch((e) => console.error(e));

const gracefulShutdown = () => {
  store.close();
};

// process.on('SIGINT', gracefulShutdown);
// process.on('SIGTERM', gracefulShutdown);
// process.on('SIGUSR2', gracefulShutdown);
