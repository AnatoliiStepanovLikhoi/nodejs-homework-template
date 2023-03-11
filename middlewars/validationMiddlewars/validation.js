const {
  addContactSchema,
  updateContactSchema,
  updateContactStatusSchema,
} = require('../schema/schema');

const addContactValidation = (req, res, next) => {
  const validationResult = addContactSchema.validate(req.body);

  if (validationResult.error) {
    const fieldName = validationResult.error.details[0].path[0];

    return res
      .status(400)
      .json({ message: `missing required ${fieldName} field` });
  }

  next();
};

const updateContactValidation = (req, res, next) => {
  const validationResult = updateContactSchema.validate(req.body);

  if (validationResult.error) {
    return res.status(400).json({ message: `missing fields` });
  }

  next();
};

const updateContactStatusValidation = (req, res, next) => {
  const validationResult = updateContactStatusSchema.validate(req.body);

  if (validationResult.error) {
    return res.status(400).json({ message: `missing field` });
  }

  next();
};

module.exports = {
  addContactValidation,
  updateContactValidation,
  updateContactStatusValidation,
};
