const express = require('express');
const { auth, validation, controllerWrapper } = require('../../middlewares');
const { auth: ctrl } = require('../../controllers');
const { joiSchema } = require('../../models/user');

const { logout, signup, login } = ctrl;

const router = express.Router();

router.post('/signup', validation(joiSchema), controllerWrapper(signup));
router.post('/login', validation(joiSchema), controllerWrapper(login));
router.get('/logout', auth, controllerWrapper(logout));

module.exports = router;
