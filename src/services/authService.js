const Joi = require('joi');
const db = require('../database/models');
const jwtService = require('./jwtService');
const { runSchema, throwError } = require('./utils');

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
      throwError('Invalid fields', 400);
    }

    const { password, ...userWithoutPassword } = user.dataValues;

    const token = jwtService.createToken(userWithoutPassword);

    return token;
  },

  validateToken: (token) => {
    if (!token) {
      throwError('Token not found', 401);
    }
    const userData = jwtService.validateToken(token);
    return userData;
  },
};

module.exports = authService;