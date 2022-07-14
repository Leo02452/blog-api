const Joi = require('joi');
const { User } = require('../database/models');
const jwtService = require('./jwtService');
const { runSchema } = require('./utils');

const usersService = {
  validateBody: runSchema(Joi.object({
    displayName: Joi.string().required().min(8),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
    image: Joi.string(),
  })),

  create: async ({ displayName, email, pword, image }) => {
    const isUserAlreadyCreated = await User.findOne({ where: { email } });
    if (isUserAlreadyCreated !== null) {
      const error = new Error('User already registered');
      error.name = 'ConflictError';
      error.code = 409;
      throw error;
    }
    const user = await User.create({ displayName, email, password: pword, image });
    const { password, ...userWithoutPassword } = user.dataValues;

    const token = jwtService.createToken(userWithoutPassword);

    return token;
  },
};

module.exports = usersService;