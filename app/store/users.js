'use strict';

const bcrypt = require('bcrypt');
const config = require('../conifg');
const { BadRequest } = require('../errors');
const { pool } = require('./connection');
/**
 *
 * @param {string} login
 * @param {string} password
 * @returns {Promise<object>}
 */
const addUser = async (login, password) => {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(
      'SELECT id FROM users WHERE login = $1',
      [login]
    );
    const user = rows[0];
    if (user) {
      throw new BadRequest('This login already exists');
    }
    const passwordHash = await bcrypt.hash(password, config.PASSWORD_HASH_SALT);
    const res = await client.query(
      'INSERT INTO users (login, password) VALUES($1, $2) RETURNING id',
      [login, passwordHash]
    );
    const { id } = res.rows[0];
    return {
      id,
      hash: passwordHash,
    };
  } finally {
    client.release();
  }
};

/**
 *
 * @param {string} login
 * @returns {Promise<?object>}
 */
const getUserByLogin = async (login) => {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(
      'SELECT * FROM users WHERE login = $1',
      [login]
    );
    return rows[0] ?? null;
  } finally {
    client.release();
  }
};

/**
 *
 * @param {number} id
 * @returns {Promise<?object>}
 */
const getUserById = async (id) => {
  const client = await pool.connect();
  try {
    const { rows } = await client.query('SELECT * FROM users WHERE id = $1', [
      id,
    ]);
    return rows[0] ?? null;
  } finally {
    client.release();
  }
};

module.exports = {
  addUser,
  getUserByLogin,
  getUserById,
};
