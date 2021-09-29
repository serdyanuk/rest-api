'use strict';

const winston = require('winston');
const { IS_DEVELOPMENT } = require('../conifg');

const rawFormat = winston.format.printf(({ message, timestamp }) => {
  return `[${timestamp}]: ${message}`;
});

const logger = winston.createLogger({
  format: winston.format.combine(winston.format.timestamp(), rawFormat),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'info.log', level: 'info' }),
  ],
});

if (IS_DEVELOPMENT) {
  logger.add(new winston.transports.Console());
}

module.exports = logger;
