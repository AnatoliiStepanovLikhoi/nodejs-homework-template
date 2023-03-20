const Contact = require('../models/contacts/contactsSchema');
const { listContactsModel } = require('../models/contacts/contacts');

async function listContacts(req, res) {
  const { _id: owner } = req.user;

  const { page = 1, limit = 5, favorite = null } = req.query;

  const favoriteState = favorite === 'true' || favorite === 'false';

  const findFavoriteState = favorite ? favoriteState : null;

  const contactsData = await listContactsModel(owner, {
    page,
    limit,
    favorite: findFavoriteState,
  });

  // console.log(req.user);

  // const { skip = 0, limit = 5 } = req.query;

  res.status(200).json(contactsData);
}

async function getContactById(req, res, next) {
  const { contactId } = req.params;
  const { _id: owner } = req.user;

  const contact = await Contact.findById({ _id: contactId, owner });

  res.status(200).json(contact);
}

async function addContact(req, res) {
  req.body.owner = req.user._id;
  // console.log(req.body);

  const newContactData = await Contact.create(req.body);

  res.status(201).json(newContactData);
}

async function removeContact(req, res, next) {
  const { _id: userId } = req.user;
  const { contactId } = req.params;

  await Contact.findByIdAndDelete({ _id: contactId, userId });

  res.status(200).json({
    message: 'contact deleted',
  });
}

async function updateContact(req, res, next) {
  const {
    body,
    params: { contactId },
  } = req;
  const { _id: userId } = req.user;

  const updatedContact = await Contact.findByIdAndUpdate(
    { _id: contactId, userId },
    body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedContact);
}

async function updateStatusContact(req, res, next) {
  const {
    body,
    params: { contactId },
  } = req;
  const { _id: userId } = req.user;

  const updatedContactStatus = await Contact.findByIdAndUpdate(
    { _id: contactId, userId },
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
