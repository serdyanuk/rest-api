const mysql = require('mysql2/promise');
const waitPort = require('wait-port');

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;

let connection = null;

const init = async () => {
  await waitPort({ host: MYSQL_HOST, port: 3306 });
  connection = await mysql.createConnection({
    host: MYSQL_HOST,
    password: MYSQL_PASSWORD,
    user: MYSQL_USER,
    database: MYSQL_DATABASE,
  });
  console.log('CONNECTED TO MYSQL');

  await connection.execute(
    'CREATE TABLE IF NOT EXISTS items (id int AUTO_INCREMENT, `name` varchar(255), completed boolean, PRIMARY KEY(id))'
  );
};

const close = async () => {};

const addItem = async (name) => {
  await connection.execute('INSERT INTO items(name, completed) VALUES(?,0)', [
    name,
  ]);
};

const getItems = async () => {
  return await connection.execute('SELECT * FROM items');
};

module.exports = {
  init,
  close,
  addItem,
  getItems,
};
