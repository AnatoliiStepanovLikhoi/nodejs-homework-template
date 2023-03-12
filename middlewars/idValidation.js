const { isValidObjectId } = require('mongoose');
const AppError = require('../helpers/appError');

function validObjId(req, res, next) {
  const { contactId } = req.params;

  if (!isValidObjectId(contactId)) {
    const error = new AppError(
      400,
      `Contact with ID ${contactId} is not found`
    );

    next(error);
  }
}

module.exports = validObjId;
