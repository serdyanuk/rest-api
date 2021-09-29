'use strict';

const { getConnection } = require('./connection');

/**
 *
 * @param {string} name
 * @param {number} authorId
 * @returns {Promise<void>}
 */
const addItem = async (name, authorId) => {
  await getConnection().execute(
    'INSERT INTO items(name, completed, authorId) VALUES(?,0,?)',
    [name, authorId]
  );
};

/**
 *
 * @returns {Promise<[]object>}
 */
const getItems = async () => {
  const [rows] = await getConnection().execute('SELECT * FROM items');
  return rows;
};

/**
 *
 * @param {number} id
 * @returns {Promise<void>}
 */
const deleteItem = async (id) => {
  await getConnection().execute('DELETE FROM items WHERE id = ?', [id]);
};

module.exports = {
  addItem,
  getItems,
  deleteItem,
};
