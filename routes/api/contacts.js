const express = require('express');
const router = express.Router();

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require('../../controllers/contacts');

const {
  addContactValidation,
  updateContactValidation,
} = require('../../middlewars/validationMiddlewars/validation');

const asyncWrapper = require('../../helpers/asyncWrapper');

router.get('/', asyncWrapper(listContacts));
router.get('/:contactId', asyncWrapper(getContactById));
router.post('/', addContactValidation, asyncWrapper(addContact));
router.delete('/:contactId', asyncWrapper(removeContact));
router.put('/:contactId', updateContactValidation, asyncWrapper(updateContact));

module.exports = router;
