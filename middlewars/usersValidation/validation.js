const {
  usersValidationSchema,
  //   usersSubscriptionValidationSchema,
} = require('./schema');

const { AppError } = require('../../helpers/appError');

const addUserValidation = (req, res, next) => {
  const requestMethod = req.method;

  //   let error = null;

  const validationResult = usersValidationSchema.validate(req.body);

  if (requestMethod === 'POST' && validationResult.error) {
    const [postError] = validationResult.error.details;

    return next(new AppError(400, postError.message));
  }

  next();
};

module.exports = addUserValidation;
