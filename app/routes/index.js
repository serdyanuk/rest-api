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
    res.end('<br>items list 1');
  } catch (e) {
    res.end(e.message);
  }
};

const addItem = async (req, res) => {
  try {
    const itemName = req.body.name;
    if (itemName) {
      await storage.addItem(itemName);
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
    const itemId = req.body.id;
    if (typeof itemId === 'number') {
      await storage.deleteItem(itemId);
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
