const express = require('express');
const { contacts: ctrl } = require('../../controllers');
const { auth, validation, controllerWrapper } = require('../../middlewares');
const {
  contactSchema,
  favoriteJoiSchema,
} = require('../../schemas/contactSchema');

const {
  getAll,
  getContactById,
  add,
  deleteById,
  updateById,
  updateStatusContact,
} = ctrl;

const validateMiddleware = validation(contactSchema);
const validatePatch = validation(favoriteJoiSchema);

const router = express.Router();

router.get('/', auth, controllerWrapper(getAll));

router.get('/:contactId', controllerWrapper(getContactById));

router.post('/', auth, validateMiddleware, controllerWrapper(add));

router.delete('/:contactId', controllerWrapper(deleteById));

router.put('/:contactId', validateMiddleware, controllerWrapper(updateById));

router.patch(
  '/:contactId/favorite',
  validatePatch,
  controllerWrapper(updateStatusContact)
);

module.exports = router;
