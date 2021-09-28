'use strict';

module.exports = {
  PASSWORD_HASH_SALT: 10,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
};
