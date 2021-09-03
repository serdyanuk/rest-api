const http = require('http');
const { Router, util } = require('./lib');

const router = new Router();

router.get('/', (req, res) => {
  res.end('hello from router handler');
});

router.get('/items', (req, res) => {
  res.end('hello from items');
});

router.post('/add', async (req, res) => {
  res.writeHead(200, {
    'Content-type': 'application/json',
  });
  try {
    const data = await util.parseHTTPBodyToJSON(req);
    res.end(JSON.stringify(data));
  } catch (e) {
    res.end(e.message);
  }
});

http
  .createServer((req, res) => router.handler(req, res))
  .listen(3000, () => console.log('Server running'));
