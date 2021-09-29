'use strict';

const mysql = require('mysql2/promise');
const logger = require('../conifg/logger');

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;

/**
 * @type {mysql.Connection}
 */
let connection = null;

const init = async () => {
  connection = await mysql.createConnection({
    host: MYSQL_HOST,
    password: MYSQL_PASSWORD,
    user: MYSQL_USER,
    database: MYSQL_DATABASE,
  });
  logger.info('Connected to MySQL');

  await connection.execute(
    'CREATE TABLE IF NOT EXISTS users (id int AUTO_INCREMENT, login VARCHAR(32), password VARCHAR(64), PRIMARY KEY(id), UNIQUE(login))'
  );
  await connection.execute(
    'CREATE TABLE IF NOT EXISTS items (id int AUTO_INCREMENT, `name` varchar(255), completed boolean, authorId int not null, foreign key (authorId) references users(id), PRIMARY KEY(id))'
  );
};

const close = async () => {};

/**
 *
 * @returns {mysql.Connection}
 */
const getConnection = () => connection;

module.exports = {
  init,
  close,
  getConnection,
};
