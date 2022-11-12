const jsonwebtoken = require('jsonwebtoken');
const { JWT_SECRET } = require('../constants');
// const UnauthorizedError = require('../errors/UnauthorizedError');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { jwt } = req.cookies;

  if (!jwt) {
    // return next(new UnauthorizedError('Необходима авторизация'));
  }

  let payload;

  try {
    payload = jsonwebtoken.verify(jwt, JWT_SECRET);
  } catch (err) {
    // return next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload;
  next();
};
