'use strict';

const router = require('express').Router();
const usersStore = require('../store/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../conifg');
const validate = require('../middlewares/validation');
const validations = require('../validations');
const { UnauthorizedError } = require('../errors');

router.post(
  '/auth',
  validate(validations.user.auth),
  async (req, res, next) => {
    const { login, password } = req.body;
    try {
      const error = new UnauthorizedError('Wrong login or password');
      const user = await usersStore.getUserByLogin(login);
      if (!user) {
        throw error;
      }
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        throw error;
      }
      const token = jwt.sign({ id: user.id }, config.JWT_SECRET_KEY);
      res.json({
        token,
      });
    } catch (e) {
      return next(e);
    }
  }
);

module.exports = router;
