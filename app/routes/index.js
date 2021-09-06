const { util } = require('../lib');
const storage = require('../storage');

const index = async (req, res) => {
  res.writeHead(200, {
    'Content-type': 'text/html',
  });
  try {
    const [rows, fields] = await storage.getItems();
    rows.forEach((item) => {
      res.write(`item: ${item.name}, completed ${item.completed}<br>`);
    });
    res.end('<br>items list');
  } catch (e) {
    res.end(e.message);
  }
};

const addItem = async (req, res) => {
  try {
    const postData = await util.parseHTTPBodyToJSON(req);
    if (postData.name) {
      await storage.addItem(postData.name);
      res.end('success');
    } else {
      res.end('please send name');
    }
  } catch (e) {
    res.end(e.message);
  }
};

module.exports = {
  index,
  addItem,
};
