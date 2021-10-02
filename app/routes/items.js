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
 *  responses:
 *    UnauthoraziedError:
 *      description: Access token is missing or invalid
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: jwt
 * security:
 *  - bearerAuth: []
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
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *      400:
 *        description: invalid input data
 *      401:
 *        $ref: '#/components/responses/UnauthoraziedError'
 */
router.post('/items', auth, controller.addItem);

/**
 * @swagger
 * /items/{id}:
 *  delete:
 *    description: delete item
 *    parameters:
 *      - name: id
 *        required: true
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *      401:
 *        $ref: '#/components/responses/UnauthoraziedError'
 */
router.delete('/items/:id', auth, controller.deleteItem);

module.exports = router;
