'use strict';

const { pool } = require('./connection');

/**
 *
 * @param {string} name
 * @param {number} authorId
 * @returns {Promise<void>}
 */
const addItem = async (name, authorId) => {
  const client = await pool.connect();
  try {
    await client.query('INSERT INTO items(name, authorId) VALUES($1, $2)', [
      name,
      authorId,
    ]);
  } finally {
    client.release();
  }
};

/**
 *
 * @returns {Promise<Array>}
 */
const getItems = async () => {
  const client = await pool.connect();
  try {
    const res = await client.query('SELECT * FROM items');
    return res.rows;
  } catch {
    client.release();
  }
};

/**
 *
 * @param {number} id
 * @returns {Promise<void>}
 */
const deleteItem = async (id) => {
  const client = await pool.connect();
  try {
    await client.query('DELETE FROM items WHERE id = $1', [id]);
  } catch {
    client.release();
  }
};

module.exports = {
  addItem,
  getItems,
  deleteItem,
};
