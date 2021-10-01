'use strict';

const router = require('express').Router();
const validate = require('../middlewares/validation');
const usersStore = require('../store/users');
const validations = require('../validations');
const jwt = require('jsonwebtoken');
const conifg = require('../conifg');

router.post(
  '/users',
  validate(validations.user.register),
  async (req, res, next) => {
    const { login, password } = req.body;
    try {
      const user = await usersStore.addUser(login, password);
      const token = jwt.sign({ id: user.id }, conifg.JWT_SECRET_KEY);
      res.json({
        token,
      });
    } catch (e) {
      return next(e);
    }
  }
);

module.exports = router;
