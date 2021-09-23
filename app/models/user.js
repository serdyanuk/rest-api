'use strict';

const Joi = require('joi');

const userLoginSchema = Joi.string().required();
const userPasswordSchema = Joi.string().required();

const userAuthSchema = Joi.object({
  login: userLoginSchema,
  password: userPasswordSchema,
});

const userRegistartionSchema = Joi.object({
  login: userLoginSchema,
  password: userPasswordSchema,
});

module.exports = {
  userAuthSchema,
  userRegistartionSchema,
};
