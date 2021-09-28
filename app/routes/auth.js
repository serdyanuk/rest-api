'use strict';

const router = require('express').Router();
const usersStore = require('../store/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../conifg');
const validate = require('../middlewares/validation');
const validations = require('../validations');

router.post('/auth', validate(validations.user.auth), async (req, res) => {
  const { login, password } = req.body;
  try {
    const authenticateError = new Error('Wrong login or password');
    const user = await usersStore.getUserByLogin(login);
    if (!user) {
      throw authenticateError;
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw authenticateError;
    }
    const token = jwt.sign({ id: user.id }, config.JWT_SECRET_KEY);
    res.json({
      token,
    });
  } catch (e) {
    res.json({ error: e.message });
  }
});

module.exports = router;
