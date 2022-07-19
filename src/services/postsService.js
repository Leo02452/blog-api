const Joi = require('joi');
const db = require('../database/models');
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
    const blogPost = await db.BlogPost.create({ title, content, userId });

    return blogPost.dataValues;
  },

  list: async () => {
    const data = await db.BlogPost.findAll({
      include: [
        { model: db.User, as: 'user', attributes: { exclude: ['password'] } },
        { model: db.Category, as: 'categories', through: { attributes: []} },
      ],
    });

    return data;
  },
};

module.exports = postsService;