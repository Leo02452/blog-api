const categoriesService = require('../services/categoriesService');

const categoriesController = {
  create: async (req, res) => {
    const { name } = categoriesService.validateBody(req.body);

    const categoryCreated = await categoriesService.create({ name });

    res.status(201).json(categoryCreated);
  },
};

module.exports = categoriesController;