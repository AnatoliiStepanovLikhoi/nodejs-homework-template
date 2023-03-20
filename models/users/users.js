const User = require('./userSchema');

async function registrationUserModel(data) {
  const user = new User(data);

  const result = await user.save();

  return result;
}

async function findByIdUserModel(_id) {
  const user = await User.findById(_id);

  return user;
}

async function findByEmailModel(email) {
  const user = await User.findOne({ email });

  return user;
}

async function updateUserModel(user, body) {
  await user.updateOne(body);
}

module.exports = {
  registrationUserModel,
  findByIdUserModel,
  findByEmailModel,
  updateUserModel,
};
