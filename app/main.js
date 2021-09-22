const { index, addItem, deleteItem } = require('./routes');
const storage = require('./storage');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.get('/', index);
app.post('/add', addItem);
app.post('/delete', deleteItem);

storage
  .init()
  .then(() => {
    app.listen(3000, () => console.log('HTTP server running'));
  })
  .catch((e) => console.error(e));

const gracefulShutdown = () => {
  storage.close();
};

// process.on('SIGINT', gracefulShutdown);
// process.on('SIGTERM', gracefulShutdown);
// process.on('SIGUSR2', gracefulShutdown);
