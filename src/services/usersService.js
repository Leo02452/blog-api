const Joi = require('joi');
const { User } = require('../database/models');
const jwtService = require('./jwtService');
const { runSchema, throwError } = require('./utils');

const usersService = {
  validateBody: runSchema(Joi.object({
    displayName: Joi.string().required().min(8),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
    image: Joi.string(),
  })),

  checkIfNotExists: async (email) => {
    const isUserAlreadyCreated = await User.findOne({ where: { email } });
    if (isUserAlreadyCreated !== null) {
      throwError('User already registered', 409);
    }
  },

  checkIfExists: async (id) => {
    const user = await User.findByPk(id);
    if (!user) {
      throwError('User does not exist', 404);
    }
  },

  createUserAndToken: async ({ displayName, email, pword, image }) => {
    const user = await User.create({ displayName, email, password: pword, image });
    const { password, ...userWithoutPassword } = user.dataValues;

    const token = jwtService.createToken(userWithoutPassword);

    return token;
  },

  list: async () => {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });

    return users;
  },

  getById: async (id) => {
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] } });
    return user.dataValues;
  },

  remove: async (id) => {
    await User.destroy({ where: { id } });
  },
};

module.exports = usersService;