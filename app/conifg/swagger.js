'use strict';

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'todo',
      version: '1.0.0',
    },
  },
  apis: ['./app/routes/*'],
};

module.exports = () => {
  return swaggerUi.setup(swaggerJsdoc(options));
};
