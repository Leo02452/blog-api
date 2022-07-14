const Joi = require('joi');
const db = require('../database/models');
const jwtService = require('./jwtService');
const { runSchema } = require('./utils');

const authService = {
  validateBody: runSchema(Joi.object({
      email: Joi.string()
        .email()
        .required()
        .not()
        .empty()
        .messages({ 'string.empty': 'Some required fields are missing' }),
      password: Joi.string()
        .required()
        .not()
        .empty()
        .messages({ 'string.empty': 'Some required fields are missing' }),
    })),

  login: async (email, loginPassword) => {
    const user = await db.User.findOne({ 
      where: { email }, 
    });

    if (!user || user.password !== loginPassword) {
      const error = new Error('Invalid fields');
      error.name = 'UnauthorizedError';
      throw error;
    }

    const { password, ...userWithoutPassword } = user.dataValues;

    const token = jwtService.createToken(userWithoutPassword);

    return token;
  },
};

module.exports = authService;