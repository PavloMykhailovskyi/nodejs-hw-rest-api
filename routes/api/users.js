const express = require('express');
const { controllerWrapper, auth, validation, upload } = require('../../middlewares');
const {
  subscriptionJoiSchema,
} = require('../../schemas/userSubscriptionSchema');
const { reSendValidationSchema } = require('../../schemas/reSendValidationSchema');
const { users: ctrl } = require('../../controllers');
const { reSendEmail } = require('../../helpers');

const { getCurrent, updateSubscription, updateAvatar, verifyEmail } = ctrl;

const validatePatch = validation(subscriptionJoiSchema);
const validateReSendEmail = validation(reSendValidationSchema);

const router = express.Router();

router.get('/current', auth, controllerWrapper(getCurrent));
router.get('/verify/:verificationToken', controllerWrapper(verifyEmail));
router.post('/verify', validateReSendEmail, controllerWrapper(reSendEmail))
router.patch(
  '/current/subscription',
  auth,
  validatePatch,
  controllerWrapper(updateSubscription)
);
router.patch('/avatars', auth, upload.single('avatar'), controllerWrapper(updateAvatar))

module.exports = router;
