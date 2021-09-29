'use strict';

const { BadRequest } = require('../errors');

const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
  } catch (e) {
    return next(new BadRequest(e.message));
  }
  next();
};

module.exports = validate;
