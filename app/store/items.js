const { getConnection } = require('./connection');

const addItem = async (name) => {
  await getConnection().execute(
    'INSERT INTO items(name, completed) VALUES(?,0)',
    [name]
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
