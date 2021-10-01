'use strict';

const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const controller = require('../controllers/items.controller');

router.get('/items', controller.getItems);

router.post('/items', auth, controller.addItem);

router.delete('/items/:id', auth, controller.deleteItem);

module.exports = router;
