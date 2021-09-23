'use strict';

const router = require('express').Router();
const usersStore = require('../store/users');

router.post('/users', async (req, res) => {
  const { login, password } = req.body;
  try {
    const user = await usersStore.addUser(login, password);
    res.json(user);
  } catch (e) {
    res.json({ error: e.message });
  }
});

module.exports = router;
