const { getConnection } = require('./connection');
const bcrypt = require('bcrypt');
const config = require('../conifg');

const addUser = async (login, password) => {
  const [rows] = await getConnection().execute(
    'SELECT id FROM users WHERE login = ?',
    [login]
  );
  if (rows.length) {
    throw new Error('This login already exists');
  }
  const hash = await bcrypt.hash(password, config.PASSWORD_HASH_SALT);
  const [res] = await getConnection().execute(
    'INSERT INTO users SET login = ?, password = ?',
    [login, password]
  );
  return {
    id: res.insertId,
    hash,
  };
};

module.exports = {
  addUser,
};
