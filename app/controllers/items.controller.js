'use strict';
const storeItems = require('../store/items');

exports.getItems = async (req, res, next) => {
  try {
    const items = await storeItems.getItems();
    res.json(items);
  } catch (e) {
    return next(e);
  }
};

exports.addItem = async (req, res, next) => {
  try {
    const itemName = req.body.name;
    if (itemName) {
      await storeItems.addItem(itemName, req.user.id);
      res.json({ success: true });
    } else {
      res.json({ error: 'please send name' });
    }
  } catch (e) {
    return next(e);
  }
};

exports.deleteItem = async (req, res, next) => {
  try {
    const itemId = parseInt(req.params.id);
    await storeItems.deleteItem(itemId);
    res.json({ success: true });
  } catch (e) {
    return next(e);
  }
};
