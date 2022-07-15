const categoriesService = require('../services/categoriesService');

const categoriesController = {
  create: async (req, res) => {
    const { name } = categoriesService.validateBody(req.body);

    const categoryCreated = await categoriesService.create({ name });

    res.status(201).json(categoryCreated);
  },

  getAll: async (req, res) => {
    const categories = await categoriesService.getAll();

    res.status(200).json(categories);
  },
};

module.exports = categoriesController;