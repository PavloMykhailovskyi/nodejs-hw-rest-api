const Joi = require('joi');

const subscriptionJoiSchema = Joi.object({
  subscription: Joi.string(),
});

module.exports = {
  subscriptionJoiSchema,
};
