const Joi = require("joi");

const schema = Joi.object({
    slug: Joi.string().required(),
    name: Joi.string().required()
});

module.exports = schema
