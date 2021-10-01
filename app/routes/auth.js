'use strict';

const router = require('express').Router();
const validate = require('../middlewares/validation');
const validations = require('../validations');
const controller = require('../controllers/auth.controller');

router.post('/auth', validate(validations.user.auth), controller.auth);

router.post(
  '/register',
  validate(validations.user.register),
  controller.register
);

module.exports = router;
