const db = require("./../models");
const moment = require("moment");
const { schema } = require("../validators/permission");

const fetchOne = async (req, res) => {
  const { id } = req.params;
  const permission = await db.permissions.findByPk(id);
  res.status(200);
  return res.json(permission.toJSON());
};

const updateOne = async (req, res) => {
  const { id } = req.params;
  let permission = await db.permissions.findOne({
    where: {
      id,
    },
  });
  if (!permission) {
    res.status(404);
    res.json({ message: "Permission not found" });
    return;
  }
  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(400);
    return res.json(error.details);
  }
  const updated = moment.utc().format("YYYY-MM-DD HH:mm:ss");
  Object.assign(permission, value);
  permission.updated = updated;
  await permission.save();
  res.status(200);
  return res.json(permission.toJSON());
};

const fetchAll = async (req, res) => {
  const permissions = await db.permissions.findAll();
  res.json(permissions);
};

const paginate = async (req, res) => {
  try {
    const limit = Number(req.query.limit || process.env.PAGINATION_LIMIT);
    const offset = Number(req.query.offset || 0);
    const { count, rows } = await db.permissions.findAndCountAll({
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

module.exports = {
  fetchOne,
  updateOne,
  fetchAll,
  paginate,
};
