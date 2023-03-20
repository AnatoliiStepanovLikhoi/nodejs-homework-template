const Contact = require('../models/contactsSchema');

async function listContacts(req, res) {
  const contactsData = await Contact.find().sort({ favorite: -1 });

  res.status(200).json(contactsData);
}

async function getContactById(req, res, next) {
  const { contactId } = req.params;

  const contact = await Contact.findById(contactId);

  res.status(200).json(contact);
}

async function addContact(req, res) {
  console.log(req.body);

  const newContactData = await Contact.create(req.body);

  res.status(201).json(newContactData);
}

async function removeContact(req, res, next) {
  const { contactId } = req.params;

  await Contact.findByIdAndDelete(contactId);

  res.status(200).json({
    message: 'contact deleted',
  });
}

async function updateContact(req, res, next) {
  const {
    body,
    params: { contactId },
  } = req;

  const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });

  res.status(200).json(updatedContact);
}

async function updateStatusContact(req, res, next) {
  const {
    body,
    params: { contactId },
  } = req;

  const updatedContactStatus = await Contact.findByIdAndUpdate(
    contactId,
    body,
    {
      new: true,
    }
  );

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
