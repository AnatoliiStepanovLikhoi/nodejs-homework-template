const {
  listContactsData,
  // getContactDataById,
  // removeContactData,
  // addContactData,
  // updateContactData,
} = require('../models/contacts');

const listContacts = async (req, res, next) => {
  const contactsData = await listContactsData();

  console.log(contactsData);

  if (!contactsData) {
    return res
      .status(500)
      .json({ msg: 'Ops, nothing found, try again later.' });
  }

  res.json(contactsData);
};

async function getContactById(req, res, next) {
  res.json({ message: 'template message' });
}

async function addContact(req, res, next) {
  res.json({ message: 'template message' });
}

async function removeContact(req, res, next) {
  res.json({ message: 'template message' });
}

async function updateContact(req, res, next) {
  res.json({ message: 'template message' });
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
