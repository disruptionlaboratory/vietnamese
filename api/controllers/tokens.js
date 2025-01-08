const db = require("./../models");
const moment = require("moment");
const { credentials: credentialsSchema } = require("../validators/token");
const { hash, uuid } = require("../library/auth");

const create = async (req, res) => {
  const { error, value } = credentialsSchema.validate(req.body);
  if (error) {
    res.status(400);
    res.json(error.details);
    return;
  }
  try {
    const { email, password } = value;
    const user = await db.users.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      res.status(400);
      res.json({
        message: "Unable to find the user using the email or username provided",
      });
      return;
    }
    const isAuthenticated = user.password === hash(password);
    if (!isAuthenticated) {
      res.status(400);
      res.json({ message: "You provided incorrect credentials" });
      return;
    }
    const created = moment.utc().format("YYYY-MM-DD HH:mm:ss");
    const expiry = moment.utc().add("days", 90).format("YYYY-MM-DD HH:mm:ss");
    let payload = {
      access_token: uuid(),
      users_id: user.id,
      expiry,
      created,
      updated: created,
    };
    const token = await db.tokens.create(payload);
    if (!token) {
      res.status(500);
      res.json({ message: "Internal Server Error" });
      return;
    }
    res.status(201);
    res.json({
      access_token: token.access_token,
      expiry: token.expiry,
    });
  } catch (e) {
    res.status(500);
    res.json({ message: e });
  }
};

module.exports = {
  create,
};
