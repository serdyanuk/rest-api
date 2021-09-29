'use strict';

const logger = require('../conifg/logger');
const { InternalError } = require('../errors');
const BaseError = require('../errors/BaseError');

const errorHandler = (err, req, res, next) => {
  if (err instanceof BaseError) {
    res.status(err.httpCode).json({ error: err.message });
  } else {
    logger.error(`${err.message}\nstack:${err.stack}`);
    const internalError = new InternalError();
    res.status(internalError.httpCode).json({ error: internalError.message });
  }
  return next();
};

module.exports = errorHandler;
