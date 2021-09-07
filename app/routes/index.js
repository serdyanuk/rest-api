const { util } = require('../lib');
const storage = require('../storage');

const index = async (req, res) => {
  res.writeHead(200, {
    'Content-type': 'text/html',
  });
  try {
    const items = await storage.getItems();
    items.forEach((item) => {
      res.write(
        `item: id(${item.id}) ${item.name}, completed ${item.completed}<br>`
      );
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

const deleteItem = async (req, res) => {
  res.writeHead(200, {
    'Content-type': 'text/html',
  });
  try {
    const postData = await util.parseHTTPBodyToJSON(req);
    if (typeof postData.id === 'number') {
      await storage.deleteItem(postData.id);
      res.end('success');
    } else {
      res.end('please send item id for delete');
    }
  } catch (e) {
    res.end(e.message);
  }
};

module.exports = {
  index,
  addItem,
  deleteItem,
};