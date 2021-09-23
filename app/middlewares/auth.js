'use strict';

const jwt = require('jsonwebtoken');
const conifg = require('../conifg');
const usersStore = require('../store/users');

const auth = async (req, res, next) => {
  const token = req.headers['authorization'];
  try {
    const payload = jwt.verify(token, conifg.JWT_SECRET_KEY);
    const user = await usersStore.getUserById(payload.id);
    req.user = user;
    next();
  } catch (e) {
    res.json({ error: 'Require authorization' });
  }
};

module.exports = {
  auth,
};
