const Contact = require('./contactsSchema');

async function listContactsModel(owner, request) {
  const { page, limit, favorite } = request;

  //   const parsedPage = parseInt(page);
  //   const parsedLimit = parseInt(limit);

  const skip = (page - 1) * limit;

  const user = { owner };

  if (typeof favorite === 'boolean') user.favorite = favorite;

  //   console.log(skip, limit);

  const contactsData = await Contact.find(user, '', { skip, limit }).select({
    __v: 0,
    owner: 0,
  });
  // .sort({ favorite: -1 });

  return contactsData;
}

module.exports = { listContactsModel };
