const express = require('express');
const router = express.Router();

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require('../../controllers/contacts');

const {
  addContactValidation,
  updateContactValidation,
  updateContactStatusValidation,
} = require('../../middlewars/joiValidation/validation');

const asyncWrapper = require('../../helpers/asyncWrapper');

router.get('/', asyncWrapper(listContacts));
router.get('/:contactId', asyncWrapper(getContactById));
router.post('/', addContactValidation, asyncWrapper(addContact));
router.delete('/:contactId', asyncWrapper(removeContact));
router.put('/:contactId', updateContactValidation, asyncWrapper(updateContact));
router.patch(
  '/:contactId/favorite',
  updateContactStatusValidation,
  asyncWrapper(updateStatusContact)
);

module.exports = router;
