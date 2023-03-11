// const fs = require('fs/promises');
// const path = require('path');
// const ShortUniqueId = require('short-unique-id');

// const contactsPath = path.join(__dirname, './contacts.json');
// const uid = new ShortUniqueId({ length: 3, dictionary: 'number' });

const Contact = require('../contacts/contactsSchema');

async function getContactsDataModel() {
  // const contactsData = await fs.readFile(contactsPath);
  // const data = JSON.parse(contactsData);
  const contactsData = await Contact.find();

  return contactsData;
}

// async function listContactsData() {
//   try {
//     const contactsList = await getContactsData();

//     return contactsList;
//   } catch (error) {
//     return error;
//   }
// }

async function getContactDataByIdModel(contactId) {
  // const contactsData = await getContactsData();
  // return contactsData.find(({ id }) => id === contactId);

  const contactData = await Contact.findById(contactId);

  return contactData;
}

async function removeContactDataModel(contactId) {
  // const contactsData = await getContactsData();
  // const filteredData = contactsData.filter(({ id }) => id !== contactId);
  // if (filteredData.length === contactsData.length) {
  //   return { error: 'notFound' };
  // }
  // const updatedContacts =
  //   (await fs.writeFile(contactsPath, JSON.stringify(filteredData))) ??
  //   filteredData;

  const deletedData = await Contact.findByIdAndDelete(contactId);

  return deletedData;
}

async function addContactDataModel(data) {
  // const contactsData = await getContactsData();
  // const newContact = {
  //   id: uid(),
  //   name,
  //   email,
  //   phone,
  // };
  // const newContactsList = [...contactsData, newContact];
  // const newData =
  //   (await fs.writeFile(contactsPath, JSON.stringify(newContactsList))) ??
  //   newContact;

  const newData = await Contact.create(data);

  return newData;
}

async function updateContactDataModel(contactId, body) {
  // const contactsData = await getContactsData();
  // const contactById = contactsData.findIndex(({ id }) => id === contactId);
  // if (contactById === -1) {
  //   return { error: 'notFound' };
  // }
  // const updatedContact = { id: contactId, ...body };
  // contactsData[contactById] = updatedContact;
  // const newData =
  //   (await fs.writeFile(contactsPath, JSON.stringify(contactsData))) ??
  //   updatedContact;

  const newData = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });

  return newData;
}

async function updateContactStatusModel(contactId, body) {
  const newData = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });

  return newData;
}

module.exports = {
  getContactsDataModel,
  getContactDataByIdModel,
  removeContactDataModel,
  addContactDataModel,
  updateContactDataModel,
  updateContactStatusModel,
};
