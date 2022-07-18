const Joi = require('joi');
const { BlogPost } = require('../database/models');
const { runSchema } = require('./utils');

const postsService = {
  validateBody: runSchema(Joi.object({
    title: Joi.string().required()
      .messages({ 'string.empty': 'Some required fields are missing' }),
    content: Joi.string().required()
      .messages({ 'string.empty': 'Some required fields are missing' }),
    categoryIds: Joi.array().items(Joi.number()).required()
    .messages({ 'array.empty': 'Some required fields are missing' }),
  })),

  create: async ({ title, content, userId }) => {
    const blogPost = await BlogPost.create({ title, content, userId });

    return blogPost.dataValues;
  },
};

module.exports = postsService;