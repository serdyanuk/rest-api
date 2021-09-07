const http = require('http');
const { Router } = require('./lib');
const { index, addItem, deleteItem } = require('./routes');
const storage = require('./storage');

const router = new Router();

router.get('/', index);
router.post('/add', addItem);
router.post('/delete', deleteItem);

const server = http.createServer((req, res) => router.handler(req, res));

storage
  .init()
  .then(() => {
    server.listen(3000, () => console.log('HTTP server running'));
  })
  .catch((e) => console.error(e));

const gracefulShutdown = () => {
  storage.close();
};

// process.on('SIGINT', gracefulShutdown);
// process.on('SIGTERM', gracefulShutdown);
// process.on('SIGUSR2', gracefulShutdown);
