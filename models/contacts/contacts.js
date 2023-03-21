const { AppError } = require('../../helpers/appError');
const Contact = require('./contactsSchema');

async function listContactsModel(owner, request) {
  const { page, limit, favorite } = request;

  const skip = (page - 1) * limit;

  const user = { owner };

  if (typeof favorite === 'boolean') user.favorite = favorite;

  const contactsData = await Contact.find(user, '', { skip, limit }).select({
    __v: 0,
    owner: 0,
  });
  // .sort({ favorite: -1 });

  return contactsData;
}

async function getContactByIdModel(contactId, owner) {
  const contact = await Contact.findOne({ _id: contactId, owner }).select({
    __v: 0,
    owner: 0,
  });

  if (!contact) {
    throw new AppError(404, 'Not Found');
  }

  return contact;
}

module.exports = { listContactsModel, getContactByIdModel };
