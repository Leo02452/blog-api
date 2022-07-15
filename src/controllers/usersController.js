const usersService = require('../services/usersService');

const usersController = {
  create: async (req, res) => {
    const { displayName, email, password, image } = usersService.validateBody(req.body);

    const token = await usersService.create({ displayName, email, password, image });

    res.status(201).json({ token });
  },

  getAll: async (_req, res) => {
    const users = await usersService.getAll();

    res.status(200).json(users);
  },
};

module.exports = usersController;