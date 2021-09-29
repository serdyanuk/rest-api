'use strict';

const { HTTP } = require('../conifg');
const BaseError = require('./BaseError');

class InternalError extends BaseError {
  constructor(message = 'Internal error') {
    super(message, HTTP.STATUS_INTERNAL_SERVER_ERROR);
  }
}

class UnauthorizedError extends BaseError {
  constructor(message = 'Unauthorized') {
    super(message, HTTP.STATUS_UNAUTHORIZED);
  }
}

class BadRequest extends BaseError {
  constructor(message = 'Bad Request') {
    super(message, HTTP.STATUS_BAD_REQUEST);
  }
}

module.exports = {
  InternalError,
  UnauthorizedError,
  BadRequest,
};
