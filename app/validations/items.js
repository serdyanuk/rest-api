'use strict';

const Joi = require('joi');

module.exports = {
  addItem: Joi.object({
    name: Joi.string().min(5).max(255),
  }),
};
