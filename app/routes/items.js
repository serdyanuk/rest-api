'use strict';

const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const controller = require('../controllers/items.controller');

/**
 * @swagger
 * components:
 *  schemas:
 *    Item:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        name:
 *          type: string
 *        authorId:
 *          type: number
 */

/**
 * @swagger
 * /items:
 *  get:
 *    description: get todo items
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Item'
 */
router.get('/items', controller.getItems);

/**
 * @swagger
 * /items:
 *  post:
 *    description: add todo item
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *      403:
 *        description: user bad request
 */
router.post('/items', auth, controller.addItem);

/**
 * @swagger
 * /items/{id}:
 *  delete:
 *    description: delete item
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 */
router.delete('/items/:id', auth, controller.deleteItem);

module.exports = router;
