const Joi = require("joi");

const schema = Joi.object({
    key: Joi.string().required(),
    value: Joi.string().required(),
    language: Joi.string().required()
});

module.exports = schema
