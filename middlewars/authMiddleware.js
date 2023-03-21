const { NotAuthorized } = require('../helpers/appError');
const jwt = require('jsonwebtoken');
const { findByIdUserModel } = require('../models/users/users');

const authMiddleware = async (req, res, next) => {
  try {
    const token =
      req.headers.authorization?.startsWith('Bearer') &&
      req.headers.authorization.split(' ')[1];

    if (!token) {
      throw new NotAuthorized('Not authorized');
    }

    const { _id } = await jwt.verify(token, process.env.JWT_SECRET);

    const user = await findByIdUserModel(_id);

    if (!user) {
      throw new NotAuthorized('Not authorized');
    }

    //! Token comparing validation
    if (user.token !== token) {
      throw new NotAuthorized('Not authorized');
    }

    req.token = token;
    req.user = user;

    next();
  } catch (error) {
    next(new NotAuthorized('Not authorized'));
  }
};

module.exports = authMiddleware;
