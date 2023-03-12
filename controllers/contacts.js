const Contact = require('../models/contactsSchema');
const validObjId = require('../middlewars/idValidation');

const AppError = require('../helpers/appError');

async function listContacts(req, res) {
  const contactsData = await Contact.find().sort({ favorite: -1 });

  res.status(200).json(contactsData);
}

async function getContactById(req, res, next) {
  const { contactId } = req.params;

  validObjId(req, res, next);

  const contact = await Contact.findById(contactId);

  if (!contact) {
    return new AppError(404, `Contact with ID ${contactId} not found`);
  }
  res.status(200).json(contact);
}

async function addContact(req, res) {
  console.log(req.body);

  const newContactData = await Contact.create(req.body);

  res.status(201).json(newContactData);
}

async function removeContact(req, res, next) {
  const { contactId } = req.params;

  validObjId(req, res, next);

  const contact = await Contact.findByIdAndDelete(contactId);

  if (!contact) {
    return new AppError(404, `Not found`);
  }

  res.status(204).json({
    message: 'contact deleted',
  });
}

async function updateContact(req, res, next) {
  const {
    body,
    params: { contactId },
  } = req;

  validObjId(req, res, next);

  const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });

  if (!updatedContact) {
    return new AppError(404, `Not found`);
  }

  res.status(200).json(updatedContact);
}

async function updateStatusContact(req, res, next) {
  const {
    body,
    params: { contactId },
  } = req;

  validObjId(req, res, next);

  const updatedContactStatus = await Contact.findByIdAndUpdate(
    contactId,
    body,
    {
      new: true,
    }
  );

  if (!updatedContactStatus) {
    return new AppError(404, `Not found`);
  }

  res.status(200).json(updatedContactStatus);
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
};
