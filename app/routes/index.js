const { util } = require('../lib');
const storage = require('../storage');

const index = async (req, res) => {
  try {
    const items = await storage.getItems();
    items.forEach((item) => {
      console.log(2);
    });
    res.end('');
    console.log(3);
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
