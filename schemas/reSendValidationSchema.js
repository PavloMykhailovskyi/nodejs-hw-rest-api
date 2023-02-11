const Joi = require('joi');

const reSendValidationSchema = Joi.object({
    email: Joi.string().email().required(),
})

module.exports = {
    reSendValidationSchema
}