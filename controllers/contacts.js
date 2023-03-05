const {
  listContactsData,
  getContactDataById,
  removeContactData,
  addContactData,
  updateContactData,
} = require('../models/contacts');

const {
  addContactSchema,
  updateContactSchema,
} = require('../middlewars/schema/schema');

const listContacts = async (req, res, next) => {
  const contactsData = await listContactsData();

  if (!contactsData) {
    return res
      .status(500)
      .json({ msg: 'Ops, nothing found, try again later.' });
  }

  res.json(contactsData);
};

async function getContactById(req, res, next) {
  const { contactId } = req.params;
  const contact = await getContactDataById(contactId);

  if (!contact)
    return res.status(404).json({
      message: `Contact with ID ${contactId} did not found`,
    });

  res.status(200).json(contact);
}

async function addContact(req, res, next) {
  try {
    const { error } = addContactSchema.validate(req.body);
    if (error) {
      throw new Error(error.message);
    }

    const newContactData = await addContactData(req.body);

    res.status(201).json({
      message: 'Contact has created',
      newContactData,
    });
  } catch (error) {
    next(error);
  }
}

async function removeContact(req, res, next) {
  const { contactId } = req.params;
  const contact = await removeContactData(contactId);

  if (contact.error === 'notFound') {
    return res.status(404).json({
      message: `Contact with ID ${contactId} did not found`,
    });
  }

  res.status(200).json({
    message: 'contact has deleted',
    contact,
  });
}

async function updateContact(req, res, next) {
  const {
    body,
    params: { contactId },
  } = req;

  try {
    const { error } = updateContactSchema.validate(body);
    if (error) {
      throw new Error(error.message);
    }

    const contact = await updateContactData(contactId, body);

    if (contact.error === 'notFound') {
      return res.status(404).json({
        message: `Contact with ID ${contactId} did not found`,
      });
    }

    res.status(200).json({
      message: 'contact has updated',
      contact,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
