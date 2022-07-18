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
  getAll: async () => {
    const categories = await Category.findAll();
    return categories;
  },

  checkIfExists: async (id) => {
    const category = await Category.findByPk(id);
    if (!category) {
      const error = new Error('"categoryIds" not found');
      error.code = 400;
      throw error;
    }
  },
};

module.exports = categoriesService;