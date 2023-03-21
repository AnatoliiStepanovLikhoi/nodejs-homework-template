// const User = require('../models/users/userSchema');
const { login, logout } = require('../services/authService');
const {
  registrationUserModel,
  findByEmailModel,
} = require('../models/users/users');
// const { AppError } = require('../helpers/appError');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

const registrationController = async (req, res) => {
  try {
    const newUser = await registrationUserModel(req.body);

    const { email, subscription } = newUser;

    res.status(201).json({ user: { email, subscription } });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Email in use' });
    }

    res.status(400).json({ message: error.message });
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;

  const token = await login(email, password);

  const user = await findByEmailModel(email);

  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const logoutController = async (req, res) => {
  console.log(req.body);
  const { _id } = req.user;

  await logout(_id);

  res.status(204).json({});
};

const currentUserController = async (req, res) => {
  const { email, subscription } = req.user;

  res.status(200).json({ user: { email, subscription } });
};

module.exports = {
  registrationController,
  loginController,
  logoutController,
  currentUserController,
};
