'use strict';

const router = require('express').Router();
const storeItems = require('../store/items');
const { auth } = require('../middlewares/auth');
const validate = require('../middlewares/validation');
const validations = require('../validations');

router.get('/items', async (req, res) => {
  try {
    const items = await storeItems.getItems();
    res.json(items);
  } catch (e) {
    res.json({
      error: e.message,
    });
  }
});

router.post(
  '/items',
  auth,
  validate(validations.items.addItem),
  async (req, res) => {
    try {
      const itemName = req.body.name;
      if (itemName) {
        await storeItems.addItem(itemName, req.user.id);
        res.json({ success: true });
      } else {
        res.json({ error: 'please send name' });
      }
    } catch (e) {
      res.json({ error: e.message });
    }
  }
);

router.delete('/items/:id', auth, async (req, res) => {
  try {
    const itemId = parseInt(req.params.id);
    await storeItems.deleteItem(itemId);
    res.json({ success: true });
  } catch (e) {
    res.json({ error: e.message });
  }
});

module.exports = router;
