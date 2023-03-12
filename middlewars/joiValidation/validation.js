const {
  addContactSchema,
  updateContactSchema,
  updateContactStatusSchema,
} = require('./schema');

const AppError = require('../../helpers/appError');

const addContactValidation = (req, res, next) => {
  const validationResult = addContactSchema.validate(req.body);

  if (validationResult.error) {
    const fieldName = validationResult.error.details[0].path[0];

    return next(new AppError(400, `missing required ${fieldName} field`));
  }

  next();
};

const updateContactValidation = (req, res, next) => {
  const validationResult = updateContactSchema.validate(req.body);

  if (validationResult.error) {
    return next(new AppError(400, `missing fields`));
  }

  next();
};

const updateContactStatusValidation = (req, res, next) => {
  const validationResult = updateContactStatusSchema.validate(req.body);

  if (validationResult.error) {
    return next(new AppError(400, `missing favorite field`));
  }

  next();
};

module.exports = {
  addContactValidation,
  updateContactValidation,
  updateContactStatusValidation,
};
