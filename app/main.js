const store = require('./store');
const express = require('express');
const { items, users } = require('./routes');
const app = express();

app.use(express.json());
app.use([items, users]);

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
