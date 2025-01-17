const {
  usersValidationSchema,
  usersSubscriptionValidationSchema,
  usersResendVerificationSchema,
} = require('./schema');

const { AppError } = require('../../helpers/appError');

const addUserValidation = (req, res, next) => {
  const requestMethod = req.method;
  const requestPath = req.path;

  const validationResult = usersValidationSchema.validate(req.body);

  const subscriptionValidationResult =
    usersSubscriptionValidationSchema.validate(req.body);

  const resendVerificationValidationResult =
    usersResendVerificationSchema.validate(req.body);

  if (
    requestMethod === 'POST' &&
    validationResult.error &&
    requestPath !== '/verify'
  ) {
    const [postError] = validationResult.error.details;

    return next(new AppError(400, postError.message));
  }

  if (
    requestMethod === 'POST' &&
    resendVerificationValidationResult.error &&
    requestPath === '/verify'
  ) {
    const [postError] = resendVerificationValidationResult.error.details;

    return next(new AppError(400, postError.message));
  }

  if (requestMethod === 'PATCH' && subscriptionValidationResult.error) {
    const [postError] = subscriptionValidationResult.error.details;

    return next(new AppError(400, postError.message));
  }

  next();
};

module.exports = addUserValidation;
