const User = require('../models/users/userSchema');
const { NotAuthorized } = require('../helpers/appError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { findByIdUserModel, updateUserModel } = require('../models/users/users');

async function login(email, password) {
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new NotAuthorized('Wrong email or password');
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw new NotAuthorized('Not authorized');
  }

  user.password = undefined;

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });

  await updateUserModel(user, { token });

  return token;
}

async function logout(_id) {
  const user = await findByIdUserModel(_id);

  if (!user) {
    throw new NotAuthorized('Not authorized');
  }

  await updateUserModel(user, { token: null });
}

module.exports = { login, logout };
