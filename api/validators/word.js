const Joi = require("joi");

const schema = Joi.object({
  slug: Joi.string().required(),
  term: Joi.string().required(),
  translation: Joi.string().allow("", null),
  definition: Joi.string().required(),
  grammar: Joi.string().required(),
  phonetic: Joi.string().allow("", null),
  image: Joi.string().allow("", null),
  audio: Joi.string().allow("", null),
});

module.exports = schema;
