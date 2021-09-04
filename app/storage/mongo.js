const { MongoClient } = require('mongodb');

const { MONGO_URI } = process.env;

const ITEMS_COLLECTION = 'items';

let client = null;
let db = null;

const init = async () => {
  client = await MongoClient.connect(MONGO_URI);
  console.log('Mongo client connected');
  db = client.db('todos');
};

const close = async () => {
  await client.close();
};

const addItem = async (name) => {
  await db.collection(ITEMS_COLLECTION).insertOne({
    name,
  });
};

const getItems = async () => {
  return await db.collection(ITEMS_COLLECTION).find();
};

module.exports = {
  init,
  close,
  addItem,
  getItems,
};
