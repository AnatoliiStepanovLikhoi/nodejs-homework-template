const fs = require('fs/promises');
const path = require('path');
const ShortUniqueId = require('short-unique-id');

const contactsPath = path.join(__dirname, './contacts.json');
const uid = new ShortUniqueId({ length: 3, dictionary: 'number' });

async function getContactsData() {
  try {
    const contactsData = await fs.readFile(contactsPath);
    const data = JSON.parse(contactsData);

    return data;
  } catch (error) {
    return error;
  }
}

async function listContactsData() {
  try {
    const contactsList = await getContactsData();

    return contactsList;
  } catch (error) {
    return error;
  }
}

async function getContactDataById(contactId) {
  try {
    const contactsData = await getContactsData();

    return contactsData.find(({ id }) => id === contactId);
  } catch (error) {
    return error;
  }
}

async function removeContactData(contactId) {
  const contactsData = await getContactsData();

  const filteredData = contactsData.filter(({ id }) => id !== contactId);

  if (filteredData.length === contactsData.length) {
    return { error: 'notFound' };
  }

  const updatedContacts =
    (await fs.writeFile(contactsPath, JSON.stringify(filteredData))) ??
    filteredData;

  return updatedContacts;
}

async function addContactData({ name, email, phone }) {
  const contactsData = await getContactsData();

  const newContact = {
    id: uid(),
    name,
    email,
    phone,
  };

  const newContactsList = [...contactsData, newContact];

  const newData =
    (await fs.writeFile(contactsPath, JSON.stringify(newContactsList))) ??
    newContact;

  return newData;
}

const updateContactData = async (contactId, body) => {
  const contactsData = await getContactsData();

  const contactById = contactsData.findIndex(({ id }) => id === contactId);

  if (contactById === -1) {
    return { error: 'notFound' };
  }

  const updatedContact = { id: contactId, ...body };

  contactsData[contactById] = updatedContact;

  const newData =
    (await fs.writeFile(contactsPath, JSON.stringify(contactsData))) ??
    updatedContact;

  return newData;
};

module.exports = {
  listContactsData,
  getContactDataById,
  removeContactData,
  addContactData,
  updateContactData,
};
