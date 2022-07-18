const { PostCategory } = require('../database/models');

const postCategoryService = {
  create: async ({ postId, categoryId }) => {
    const blogPost = await PostCategory.create({ postId, categoryId });

    return blogPost.dataValues;
  },
};

module.exports = postCategoryService;