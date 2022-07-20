const Joi = require('joi');
const { Category } = require('../database/models');
const { runSchema, throwError } = require('./utils');

const categoriesService = {
  validateBody: runSchema(Joi.object({
    name: Joi.string().required(),
  })),

  checkIfExists: async (id) => {
    const category = await Category.findByPk(id);
    if (!category) {
      throwError('"categoryIds" not found', 400);
    }
  },

  create: async ({ name }) => {
    const category = await Category.create({ name });
    return category.dataValues;
  },

  list: async () => {
    const categories = await Category.findAll();
    return categories;
  },
};

module.exports = categoriesService;