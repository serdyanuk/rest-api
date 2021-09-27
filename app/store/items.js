'use strict';

const { getConnection } = require('./connection');

const addItem = async (name, authorId) => {
  await getConnection().execute(
    'INSERT INTO items(name, completed, authorId) VALUES(?,0,?)',
    [name, authorId]
  );
};

const getItems = async () => {
  const [rows] = await getConnection().execute('SELECT * FROM items');
  return rows;
};

const deleteItem = async (id) => {
  await getConnection().execute('DELETE FROM items WHERE id = ?', [id]);
};

module.exports = {
  addItem,
  getItems,
  deleteItem,
};
