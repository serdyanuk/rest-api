'use strict';

const router = require('express').Router();
const validate = require('../middlewares/validation');
const usersStore = require('../store/users');
const validations = require('../validations');

router.post(
  '/users',
  validate(validations.user.register),
  async (req, res, next) => {
    const { login, password } = req.body;
    try {
      const user = await usersStore.addUser(login, password);
      res.json(user);
    } catch (e) {
      return next(e);
    }
  }
);

module.exports = router;
