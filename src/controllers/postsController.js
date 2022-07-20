const Sequelize = require('sequelize');
const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const postsService = require('../services/postsService');
const categoriesService = require('../services/categoriesService');
const postCategoryService = require('../services/postCategoryService');

const postsController = {
  create: async (req, res) => {
    const { user } = req;

    const { title, content, categoryIds } = postsService.validateBody(req.body);

    const categoryIdsPromises = categoryIds
    .map((categoryId) => categoriesService.checkIfExists(categoryId));
    await Promise.all(categoryIdsPromises);
    
    const newBlogPost = await sequelize.transaction(async (t) => {
      const blogPostCreated = await postsService
        .create({ title, content, userId: user.id }, { transaction: t });

      const postCategoryPromises = categoryIds
        .map((categoryId) => postCategoryService
          .create({ postId: blogPostCreated.id, categoryId }), { transaction: t });
      await Promise.all(postCategoryPromises);

      return blogPostCreated;
    });

    res.status(201).json(newBlogPost);
  },

  list: async (_req, res) => {
    const allPosts = await postsService.list();

    res.status(200).json(allPosts);
  },

  getById: async (req, res) => {
    const { id } = req.params;

    const post = await postsService.getById(id);

    res.status(200).json(post);
  },

  update: async (req, res) => {
    const { id } = req.params;
    const { user } = req;

    const { title, content } = postsService.validateBody(req.body);
    const post = await postsService.getById(id);
    await postsService.checkPostOwner(user.id, post.user.id);

    await postsService.update(title, content, id, user.id);

    const postUpdated = await postsService.getById(id);

    res.status(200).json(postUpdated);
  },

  remove: async (req, res) => {
    const { id } = req.params;
    const { user } = req;

    await postsService.checkIfExists(id);
    const post = await postsService.getById(id);
    await postsService.checkPostOwner(user.id, post.user.id);

    await postsService.remove(id);
    res.sendStatus(204);
  },
};

module.exports = postsController;