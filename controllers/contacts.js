const {
  listContactsData,
  getContactDataById,
  removeContactData,
  addContactData,
  updateContactData,
} = require('../models/contacts');

const listContacts = async (req, res, next) => {
  const contactsData = await listContactsData();

  if (!contactsData) {
    return res
      .status(500)
      .json({ message: 'Ops, nothing found, try again later.' });
  }

  res.status(200).json(contactsData);
};

async function getContactById(req, res, next) {
  const { contactId } = req.params;
  const contact = await getContactDataById(contactId);

  if (!contact)
    return res.status(404).json({
      message: `Contact with ID ${contactId} not found`,
    });

  res.status(200).json(contact);
}

async function addContact(req, res, next) {
  const newContactData = await addContactData(req.body);

  res.status(201).json(newContactData);
}

async function removeContact(req, res, next) {
  const { contactId } = req.params;
  const contact = await removeContactData(contactId);

  if (contact.error === 'notFound') {
    return res.status(404).json({
      message: 'Not found',
    });
  }

  res.status(200).json({
    message: 'contact deleted',
  });
}

async function updateContact(req, res, next) {
  const {
    body,
    params: { contactId },
  } = req;

  const contact = await updateContactData(contactId, body);

  if (contact.error === 'notFound') {
    return res.status(404).json({
      message: 'Not found',
    });
  }

  res.status(200).json(contact);
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
