'use strict';

const pg = require('pg');
const { PG_USER, PG_PASSWORD, PG_DB, PG_HOST } = process.env;
const logger = require('../conifg/logger');

const pool = new pg.Pool({
  user: PG_USER,
  password: PG_PASSWORD,
  host: PG_HOST,
  database: PG_DB,
});

const init = async () => {
  const client = await pool.connect();
  try {
    await client.query(
      'CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, login VARCHAR(32) UNIQUE NOT NULL, password VARCHAR(64) NOT NULL)'
    );
    await client.query(
      'CREATE TABLE IF NOT EXISTS items (id SERIAL PRIMARY KEY, name VARCHAR(255), authorId INT NOT NULL, FOREIGN KEY (authorId) REFERENCES users(id))'
    );
  } finally {
    client.release();
  }
  logger.info('Database inited');
};

const close = async () => {};

module.exports = {
  init,
  close,
  pool,
};
