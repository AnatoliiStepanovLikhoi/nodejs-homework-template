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
  updateContactValidation,
  updateContactStatusValidation,
} = require('../../middlewars/joiValidation/validation');

const { checkUserData, validObjId } = require('../../middlewars/idValidation');

const asyncWrapper = require('../../helpers/asyncWrapper');

router.use('/:contactId', asyncWrapper(validObjId));
router.get('/', asyncWrapper(listContacts));
router.get('/:contactId', asyncWrapper(getContactById));
router.post('/', checkUserData, asyncWrapper(addContact));
router.delete('/:contactId', asyncWrapper(removeContact));
router.put('/:contactId', updateContactValidation, asyncWrapper(updateContact));
router.patch(
  '/:contactId/favorite',
  updateContactStatusValidation,
  asyncWrapper(updateStatusContact)
);

module.exports = router;
