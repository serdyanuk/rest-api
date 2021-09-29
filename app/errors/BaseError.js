'use strict';

class BaseError extends Error {
  constructor(message, httpCode) {
    super(message);
    this.httpCode = httpCode;
  }
}

module.exports = BaseError;
