// const User = require('../models/users/userSchema');
const { login, logout } = require('../services/authService');
const { registrationUserModel } = require('../models/users/users');
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

  res.status(200).json({ message: 'login successfully', token });
};

const logoutController = async (req, res) => {
  console.log(req.body);
  const { _id } = req.user;

  await logout(_id);

  res.status(204).json({});
};

module.exports = {
  registrationController,
  loginController,
  logoutController,
};
