const {
  getContactsDataModel,
  getContactDataByIdModel,
  removeContactDataModel,
  addContactDataModel,
  updateContactDataModel,
  updateContactStatusModel,
} = require('../models/contacts');

const listContacts = async (req, res) => {
  const contactsData = await getContactsDataModel();

  // if (!contactsData) {
  //   return res
  //     .status(500)
  //     .json({ message: 'Ops, nothing found, try again later.' });
  // }

  res.status(200).json(contactsData);
};

async function getContactById(req, res) {
  const { contactId } = req.params;

  console.log(contactId);

  const contact = await getContactDataByIdModel(contactId);

  if (!contact)
    return res.status(404).json({
      message: `Contact with ID ${contactId} not found`,
    });

  res.status(200).json(contact);
}

async function addContact(req, res) {
  console.log(req.body);

  const newContactData = await addContactDataModel(req.body);

  res.status(201).json(newContactData);
}

async function removeContact(req, res) {
  const { contactId } = req.params;
  const contact = await removeContactDataModel(contactId);

  if (!contact) {
    return res.status(404).json({
      message: 'Not found',
    });
  }

  res.status(200).json({
    message: 'contact deleted',
  });
}

async function updateContact(req, res) {
  const {
    body,
    params: { contactId },
  } = req;

  const updatedContact = await updateContactDataModel(contactId, body);

  if (!updatedContact) {
    return res.status(404).json({
      message: 'Not found',
    });
  }

  res.status(200).json(updatedContact);
}

async function updateStatusContact(req, res) {
  const {
    body,
    params: { contactId },
  } = req;

  const updatedContactStatus = await updateContactStatusModel(contactId, body);

  if (!updatedContactStatus) {
    return res.status(404).json({
      message: 'Not found',
    });
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
