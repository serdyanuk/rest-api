const router = require('express').Router();
const storeItems = require('../store/items');

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

router.post('/items', async (req, res) => {
  try {
    const itemName = req.body.name;
    if (itemName) {
      await storeItems.addItem(itemName);
      res.json({ success: true });
    } else {
      res.json({ error: 'please send name' });
    }
  } catch (e) {
    res.json({ error: e.message });
  }
});

router.delete('/items/:id', async (req, res) => {
  try {
    const itemId = parseInt(req.params.id);
    await storeItems.deleteItem(itemId);
    res.json({ success: true });
  } catch (e) {
    res.json({ error: e.message });
  }
});

module.exports = router;
