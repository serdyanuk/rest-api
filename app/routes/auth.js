'use strict';

const router = require('express').Router();
const validate = require('../middlewares/validation');
const validations = require('../validations');
const controller = require('../controllers/auth.controller');

/**
 * @swagger
 * /login:
 *  post:
 *    description: login in system
 *    responses:
 *      200:
 *        description: "Login successful"
 *      400:
 *        description: "Invalid login/password"
 *
 */
router.post('/login', validate(validations.user.auth), controller.login);

/**
 * @swagger
 * /register:
 *  post:
 *    description: registration in system
 *    requestBody:
 *      required: true
 *    responses:
 *      200:
 *        description: "Registration successful"
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *      400:
 *        description: "Invalid login/password"
 *      401:
 *        description: "require auth token"
 */
router.post(
  '/register',
  validate(validations.user.register),
  controller.register
);

module.exports = router;
