'use strict';

module.exports = {
  PASSWORD_HASH_SALT: 10,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  HTTP: {
    STATUS_BAD_REQUEST: 400,
    STATUS_UNAUTHORIZED: 401,
    STATUS_INTERNAL_SERVER_ERROR: 500,
  },
};
