const Joi = require('joi');
const { Op } = require('sequelize');
const db = require('../database/models');
const { runSchema, throwError } = require('./utils');

const postsService = {
  validateBody: runSchema(Joi.object({
    title: Joi.string().required()
      .messages({ 'string.empty': 'Some required fields are missing' }),
    content: Joi.string().required()
      .messages({ 'string.empty': 'Some required fields are missing' }),
    categoryIds: Joi.array().items(Joi.number())
    .messages({ 'array.empty': 'Some required fields are missing' }),
  })),

  checkIfExists: async (id) => {
    const post = await db.BlogPost.findByPk(id);
    if (!post) {
      throwError('Post does not exist', 404);
    }
  },

  checkPostOwner: async (reqUserId, postId) => {
    const { userId } = await db.BlogPost.findByPk(postId);
    if (reqUserId !== userId) {
      throwError('Unauthorized user', 401);
    }
  },

  create: async ({ title, content, userId }) => {
    const blogPost = await db.BlogPost.create({ title, content, userId });

    return blogPost;
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
      throwError('Post does not exist', 404);
    }

    return post;
  },

  update: async (title, content, postId, userId) => {
    await db.BlogPost.upsert({ id: postId, title, content, userId });
  },

  remove: async (id) => {
    await db.BlogPost.destroy({ where: { id } });
  },

  getByTitleOrContent: async (searchTerm) => {
    const searchResult = await db.BlogPost.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${searchTerm}%` } },
          { content: { [Op.like]: `%${searchTerm}%` } },
        ],
      },
      include: [
        { model: db.User, as: 'user', attributes: { exclude: ['password'] } },
        { model: db.Category, as: 'categories', through: { attributes: [] } },
      ],
    });

    return searchResult;
  },
};

module.exports = postsService;