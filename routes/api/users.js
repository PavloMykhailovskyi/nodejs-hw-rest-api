const express = require('express');
const { controllerWrapper, auth, validation, upload } = require('../../middlewares');
const {
  subscriptionJoiSchema,
} = require('../../schemas/userSubscriptionSchema');
const { users: ctrl } = require('../../controllers');

const { getCurrent, updateSubscription, updateAvatar } = ctrl;

const validatePatch = validation(subscriptionJoiSchema);

const router = express.Router();

router.get('/current', auth, controllerWrapper(getCurrent));
router.patch(
  '/current/subscription',
  auth,
  validatePatch,
  controllerWrapper(updateSubscription)
);
router.patch('/avatars', auth, upload.single('avatar'), controllerWrapper(updateAvatar))

module.exports = router;
