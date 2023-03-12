const AppError = require('../helpers/appError');
const { addContactSchema } = require('./joiValidation/schema');
const Contact = require('../models/contactsSchema');
const {
  Types: { ObjectId },
} = require('mongoose');

async function validObjId(req, _, next) {
  const { contactId } = req.params;

  if (!ObjectId.isValid(contactId)) {
    return next(new AppError(404, 'Not found'));
  }

  const contactExists = await Contact.exists({ _id: contactId });

  if (!contactExists) return next(new AppError(404, 'Not found'));

  next();
}

async function checkUserData(req, res, next) {
  const validationResult = addContactSchema.validate(req.body);

  if (validationResult.error) {
    const fieldName = validationResult.error.details[0].path[0];

    return next(new AppError(400, `missing required ${fieldName} field`));
  }

  const { email } = validationResult.value;

  const userExists = await Contact.findOne({ email }).select('_id');

  if (userExists)
    return next(new AppError(409, 'User with this email already exists'));

  req.body = validationResult.value;

  next();
}

module.exports = { validObjId, checkUserData };
