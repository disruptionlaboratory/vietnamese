const Joi = require("joi");

const schema = Joi.object({
  slug: Joi.string().required(),
  name: Joi.string().required(),
});

const credentials = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = {
  schema,
  credentials,
};
