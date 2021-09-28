'use strict';

const Joi = require('joi');

const userLoginRule = Joi.string().min(3).max(32);
const userPassworRule = Joi.string().min(5).max(32);

module.exports = {
  auth: Joi.object({
    login: userLoginRule,
    password: userPassworRule,
  }),
  register: Joi.object({
    login: userLoginRule,
    password: userPassworRule,
  }),
};
