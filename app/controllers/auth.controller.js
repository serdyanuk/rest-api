'use strict';
const usersStore = require('../store/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../conifg');
const { UnauthorizedError } = require('../errors');

exports.auth = async (req, res, next) => {
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
};

exports.register = async (req, res, next) => {
  const { login, password } = req.body;
  try {
    const user = await usersStore.addUser(login, password);
    const token = jwt.sign({ id: user.id }, config.JWT_SECRET_KEY);
    res.json({
      token,
    });
  } catch (e) {
    return next(e);
  }
};
