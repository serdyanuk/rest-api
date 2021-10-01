'use strict';

const { getConnection } = require('./connection');
const bcrypt = require('bcrypt');
const config = require('../conifg');
const { BadRequest } = require('../errors');
/**
 *
 * @param {string} login
 * @param {string} password
 * @returns {Promise<object>}
 */
const addUser = async (login, password) => {
  const [[user]] = await getConnection().execute(
    'SELECT id FROM users WHERE login = ?',
    [login]
  );
  if (user) {
    throw new BadRequest('This login already exists');
  }
  const hash = await bcrypt.hash(password, config.PASSWORD_HASH_SALT);
  const [res] = await getConnection().execute(
    'INSERT INTO users SET login = ?, password = ?',
    [login, hash]
  );
  return {
    id: res.insertId,
    hash,
  };
};

/**
 *
 * @param {string} login
 * @returns {Promise<?object>}
 */
const getUserByLogin = async (login) => {
  const [[user]] = await getConnection().execute(
    'SELECT * FROM users WHERE logisn = ?',
    [login]
  );
  return user;
};

/**
 *
 * @param {number} id
 * @returns {Promise<?object>}
 */
const getUserById = async (id) => {
  const [[user]] = await getConnection().execute(
    'SELECT * FROM users WHERE id = ?',
    [id]
  );
  return user;
};

module.exports = {
  addUser,
  getUserByLogin,
  getUserById,
};
