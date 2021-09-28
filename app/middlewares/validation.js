'use strict';

const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
  } catch (e) {
    return next(e);
  }
  next();
};

module.exports = validate;
