const ShortUniqueId = require('short-unique-id');
const uid = new ShortUniqueId({ length: 10 });

const createUserVerificationToken = async (req, res, next) => {
  const newVerificationToken = uid();

  req.body.verificationToken = newVerificationToken;

  next();
};

module.exports = createUserVerificationToken;
