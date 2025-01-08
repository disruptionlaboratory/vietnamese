const db = require("./../models");
const moment = require("moment");
const schema = require("../validators/translation");

const create = async (req, res) => {
  try {
    const { value, error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      res.status(400);
      return res.json(error.details);
    }
    const created = moment.utc().format("YYYY-MM-DD HH:mm:ss");
    const payload = {
      ...value,
      created,
      updated: created,
    };
    const translation = await db.translations.create(payload);
    res.status(201);
    res.json(translation.toJSON());
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e });
  }
};

const fetchOne = async (req, res) => {
  const { id } = req.params;
  const translation = await db.translations.findByPk(id);
  res.status(200);
  return res.json(translation.toJSON());
};

const updateOne = async (req, res) => {
  const { id } = req.params;
  let translation = await db.translations.findOne({
    where: {
      id,
    },
  });
  if (!translation) {
    res.status(404);
    res.json({ message: "Translation not found" });
    return;
  }
  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(400);
    return res.json(error.details);
  }
  const updated = moment.utc().format("YYYY-MM-DD HH:mm:ss");
  Object.assign(translation, value);
  translation.updated = updated;
  await translation.save();
  res.status(200);
  return res.json(translation.toJSON());
};

const fetchAll = async (req, res) => {
  const translations = await db.translations.findAll();
  console.log(translations);
  res.json(translations);
};

const paginate = async (req, res) => {
  try {
    const limit = Number(req.query.limit || process.env.PAGINATION_LIMIT);
    const offset = Number(req.query.offset || 0);
    const { count, rows } = await db.translations.findAndCountAll({
      limit,
      offset,
    });
    res.status(200);
    return res.json({ count, limit, offset, rows });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    await db.translations.destroy({
      where: {
        id,
      },
    });
    return res.status(200).send(null);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e });
  }
};

module.exports = {
  fetchOne,
  updateOne,
  fetchAll,
  paginate,
  create,
  remove,
};
