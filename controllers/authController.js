const { login, logout } = require('../services/authService');
const {
  registrationUserModel,
  findByEmailModel,
  updateUserModel,
  findByIdUserModel,
} = require('../models/users/users');
const { NotAuthorized } = require('../helpers/appError');

const registrationController = async (req, res) => {
  const newUser = await registrationUserModel(req.body);

  const { email, subscription } = newUser;

  res.status(201).json({ user: { email, subscription } });
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
  const { _id } = req.user;

  await logout(_id);

  res.status(204).json({});
};

const currentUserController = async (req, res) => {
  const { email, subscription } = req.user;

  res.status(200).json({ user: { email, subscription } });
};

const updateUserStatusController = async (req, res) => {
  const { _id } = req.user;

  const user = await findByIdUserModel(_id);

  if (!user) {
    throw new NotAuthorized('Not authorized');
  }

  await updateUserModel(user, req.body);

  console.log(req.body);

  res
    .status(200)
    .json({ email: user.email, subscription: req.body.subscription });
};

module.exports = {
  registrationController,
  loginController,
  logoutController,
  currentUserController,
  updateUserStatusController,
};
