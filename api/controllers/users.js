const { Op } = require("sequelize");
const moment = require("moment");
const db = require("./../models");
const { getCreateSchema, schema } = require("../validators/user");
const { generateUniqueSlug, isUniqueEmail } = require("./../services/users")(
  db,
);

const create = async (req, res) => {
  try {
    const createSchema = getCreateSchema(isUniqueEmail);
    let value = null;
    try {
      value = await createSchema.validateAsync(req.body, {
        abortEarly: false,
      });
    } catch (e) {
      res.status(400);
      return res.json(e.details);
    }
    const slug = await generateUniqueSlug(
      `${value.firstname}${value.lastname}`,
    );
    const created = moment.utc().format("YYYY-MM-DD HH:mm:ss");
    const payload = {
      ...value,
      status: "Active",
      slug,
      created,
      updated: created,
    };
    const userObject = await db.users.create(payload);
    res.status(201);
    res.json(userObject.toJSON());
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e });
  }
};

const fetchOne = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await db.users.findByPk(id);
    if (!user) {
      res.status(404);
      res.json({ message: "User not found" });
      return;
    }
    res.status(200);
    return res.json(user.toJSON());
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e });
  }
};

const updateOne = async (req, res) => {
  try {
    const { id } = req.params;
    let user = await db.users.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      res.status(404);
      res.json({ message: "User not found" });
      return;
    }
    const { error, value } = schema.validate(req.body);
    if (error) {
      res.status(400);
      return res.json(error.details);
    }
    const updated = moment.utc().format("YYYY-MM-DD HH:mm:ss");
    Object.assign(user, value);
    user.updated = updated;
    await user.save();
    res.status(200);
    return res.json(user.toJSON());
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e });
  }
};

const fetchAll = async (req, res) => {
  try {
    const users = await db.users.findAll();
    res.json(users);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e });
  }
};

const paginate = async (req, res) => {
  try {
    const limit = Number(req.query.limit || process.env.PAGINATION_LIMIT);
    const offset = Number(req.query.offset || 0);
    const { count, rows } = await db.users.findAndCountAll({
      limit,
      offset,
      where: {
        status: {
          [Op.in]: ["Active", "New"],
        },
        // status: { [Op.notIn]: ["Removed"] },
      },
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
    await db.users.update(
      {
        status: "Removed",
        updated: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
      },
      { where: { id } },
    );
    return res.status(200).send(null);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e });
  }
};

module.exports = {
  create,
  remove,
  fetchOne,
  updateOne,
  fetchAll,
  paginate,
};
