require('dotenv/config');
const jwt = require('jsonwebtoken');
const { throwError } = require('./utils');

const jwtService = {
  createToken: (data) => {
    const token = jwt.sign({ data }, process.env.JWT_SECRET);
    return token;
  },

  validateToken: (token) => {
    try {
      const { data } = jwt.verify(token, process.env.JWT_SECRET);
      return data;
    } catch (e) {
      throwError('Expired or invalid token', 401);
    }
  },
};

module.exports = jwtService;