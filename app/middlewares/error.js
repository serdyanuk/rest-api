'use strict';

const { InternalError } = require('../errors');
const BaseError = require('../errors/BaseError');

const errorHandler = (err, req, res, next) => {
  if (err instanceof BaseError) {
    res.status(err.httpCode).json({ error: err.message });
  } else {
    const internalError = new InternalError();
    res.status(internalError.httpCode).json({ error: internalError.message });
  }
  next();
};

module.exports = errorHandler;
