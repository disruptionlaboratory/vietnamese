const Joi = require("joi");

const getCreateSchema = (isUniqueEmail) => {
  return Joi.object({
    title: Joi.string().allow("", null),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    phone: Joi.string().allow("", null),
    mobile: Joi.string().allow("", null),
    email: Joi.string()
      .email()
      .external(async (value, helpers) => {
        const isUnique = await isUniqueEmail(value);
        if (!isUnique) {
          return helpers.error("any.custom", {
            message: "Email already taken",
          });
        }
        return value;
      })
      .required(),
  });
};

const schema = Joi.object({
  title: Joi.string().allow("", null),
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  phone: Joi.string().allow("", null),
  mobile: Joi.string().allow("", null),
  email: Joi.string()
    .email()
    .external((value, helpers) => {
      throw Error("Email already exists!");
    })
    .required(),
});

module.exports = {
  getCreateSchema,
  schema,
};
