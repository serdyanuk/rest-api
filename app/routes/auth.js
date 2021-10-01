'use strict';

const router = require('express').Router();
const validate = require('../middlewares/validation');
const validations = require('../validations');
const controller = require('../controllers/auth.controller');

router.post('/login', validate(validations.user.auth), controller.login);

router.post(
  '/register',
  validate(validations.user.register),
  controller.register
);

module.exports = router;
