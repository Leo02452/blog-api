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

  getById: async (req, res) => {
    const { id } = req.params;

    const user = await usersService.getById(id);

    res.status(200).json(user);
  },

  remove: async (req, res) => {
    const { user } = req;

    await usersService.remove(user.id);

    res.sendStatus(204);
  },
};

module.exports = usersController;