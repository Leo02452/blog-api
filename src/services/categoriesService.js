const Joi = require('joi');
const { Category } = require('../database/models');
const { runSchema } = require('./utils');

const categoriesService = {
  validateBody: runSchema(Joi.object({
    name: Joi.string().required(),
  })),

  create: async ({ name }) => {
    const category = await Category.create({ name });
    return category.dataValues;
  },

};

module.exports = categoriesService;