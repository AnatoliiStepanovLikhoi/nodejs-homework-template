const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, './contacts.json');

async function getContactsData() {
  const contactsData = await fs.readFile(contactsPath);
  const data = JSON.parse(contactsData);

  return data;
}

async function listContactsData() {
  try {
    const contactsList = await getContactsData();

    return contactsList;
  } catch (error) {
    return error;
  }
}

const getContactDataById = async contactId => {};

const removeContactData = async contactId => {};

const addContactData = async body => {};

const updateContactData = async (contactId, body) => {};

module.exports = {
  listContactsData,
  getContactDataById,
  removeContactData,
  addContactData,
  updateContactData,
};
