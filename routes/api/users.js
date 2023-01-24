const express = require('express');
const { controllerWrapper, auth, validation } = require('../../middlewares');
const {
  subscriptionJoiSchema,
} = require('../../schemas/userSubscriptionSchema');
const { users: ctrl } = require('../../controllers');

const { getCurrent, updateSubscription } = ctrl;

const validatePatch = validation(subscriptionJoiSchema);

const router = express.Router();

router.get('/current', auth, controllerWrapper(getCurrent));
router.patch(
  '/current/subscription',
  auth,
  validatePatch,
  controllerWrapper(updateSubscription)
);

module.exports = router;
