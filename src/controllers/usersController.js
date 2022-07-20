const usersService = require('../services/usersService');

const usersController = {
  create: async (req, res) => {
    const { displayName, email, password, image } = usersService.validateBody(req.body);
    await usersService.checkIfNotExists(email);

    const token = await usersService.createUserAndToken({ displayName, email, password, image });

    res.status(201).json({ token });
  },

  list: async (_req, res) => {
    const allUsers = await usersService.list();

    res.status(200).json(allUsers);
  },

  getById: async (req, res) => {
    const { id } = req.params;

    await usersService.checkIfExists(id);

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