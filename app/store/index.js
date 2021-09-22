const connection = require('./connection');

module.exports = {
  init: connection.init,
  close: connection.close,
};
