const db = require("./../models");
const moment = require("moment");
const schema = require("../validators/word");
const { Sequelize } = require("sequelize");

const fetchOne = async (req, res) => {
  const { id } = req.params;
  const word = db.words.findByPk(id);
  res.status(200);
  return res.json(word.toJSON());
};

const updateOne = async (req, res) => {
  const { id } = req.params;
  let word = await db.words.findOne({
    where: {
      id,
    },
  });
  if (!word) {
    res.status(404);
    res.json({ message: "Word not found" });
    return;
  }
  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(400);
    return res.json(error.details);
  }
  const updated = moment.utc().format("YYYY-MM-DD HH:mm:ss");
  Object.assign(word, value);
  word.updated = updated;
  await word.save();
  res.status(200);
  return res.json(word.toJSON());
};

const paginate = async (req, res) => {
  try {
    const limit = Number(req.query.limit || process.env.PAGINATION_LIMIT);
    const offset = Number(req.query.offset || 0);

    // Optional filtering
    const filterField = req?.query?.f;
    const filterValue = req?.query?.v;
    const filterOperator = req?.query?.o;

    if (filterField && filterValue && filterOperator) {
      const getSequelizeOperator = (operator) => {
        switch (operator) {
          case "lt":
            return Sequelize.Op.lt;
          case "gt":
            return Sequelize.Op.gt;
          case "eq":
            return Sequelize.Op.eq;
          case "like":
            return Sequelize.Op.like;
        }
      };

      const where = {
        [filterField]: { [getSequelizeOperator(filterOperator)]: filterValue },
      };

      const { count, rows } = await db.words.findAndCountAll({
        limit,
        offset,
        where,
      });
      res.status(200);
      return res.json({ count, limit, offset, rows });
    } else {
      const { count, rows } = await db.words.findAndCountAll({
        limit,
        offset,
      });
      res.status(200);
      return res.json({ count, limit, offset, rows });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e });
  }
};

module.exports = {
  fetchOne,
  updateOne,
  paginate,
};
