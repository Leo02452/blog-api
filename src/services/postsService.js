const Joi = require('joi');
const db = require('../database/models');
const { runSchema } = require('./utils');

const postsService = {
  validateBody: runSchema(Joi.object({
    title: Joi.string().required()
      .messages({ 'string.empty': 'Some required fields are missing' }),
    content: Joi.string().required()
      .messages({ 'string.empty': 'Some required fields are missing' }),
    categoryIds: Joi.array().items(Joi.number())
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
        { model: db.Category, as: 'categories', through: { attributes: [] } },
      ],
    });

    return data;
  },

  getById: async (id) => {
    const post = await db.BlogPost.findByPk(id, {
      include: [
        { model: db.User, as: 'user', attributes: { exclude: ['password'] } },
        { model: db.Category, as: 'categories', through: { attributes: [] } },
      ],
    });

    if (!post) {
      const error = new Error('Post does not exist');
      error.code = 404;
      throw error;
    }

    return post;
  },

  checkPostOwner: async (reqUserId, postOwnerId) => {
    if(reqUserId !== postOwnerId) {
      const error = new Error('Unauthorized user');
      error.code = 401;
      throw error;
    }
  },
  
  update: async (title, content, postId, userId) => {
    await db.BlogPost.upsert({ id: postId, title, content, userId });
  },
};

module.exports = postsService;