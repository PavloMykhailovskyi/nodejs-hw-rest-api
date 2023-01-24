const Joi = require('joi');

const contactSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const favoriteJoiSchema = Joi.object({
  favorite: Joi.bool().valid(true, false).required(),
});

module.exports = { contactSchema, favoriteJoiSchema };
