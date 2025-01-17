const User = require('./userSchema');
const { AppError } = require('../../helpers/appError');

async function registrationUserModel(data) {
  const userEmailCheck = await User.findOne({ email: data.email });

  if (userEmailCheck) {
    throw new AppError(409, 'Email in use');
  }

  const user = new User(data);

  return await user.save();
}

async function findByIdUserModel(_id) {
  const user = await User.findById(_id);

  return user;
}

async function findByEmailModel(email) {
  const user = await User.findOne({ email });

  return user;
}

async function findByParamModel(param) {
  const user = await User.findOne(param);

  return user;
}

async function updateUserModel(user, body) {
  // console.log(user._id);
  await User.findByIdAndUpdate(user._id, body);
}

module.exports = {
  registrationUserModel,
  findByIdUserModel,
  findByEmailModel,
  updateUserModel,
  findByParamModel,
};
