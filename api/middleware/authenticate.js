const db = require("./../models");

const authenticate = async (req, res, next) => {
  const header = req.headers.authorization || "";
  const [type, token] = header.split(" ");
  if (type !== "Bearer") {
    res.status(401);
    res.json({ message: "Unauthorised (401)" });
    return;
  }
  const tokenRow = await db.tokens.findOne({
    where: {
      access_token: token,
    },
  });
  if (!tokenRow) {
    res.status(401);
    res.json({ message: "Unauthorised (401)" });
    return;
  }
  const user = await db.users.findOne({
    where: {
      id: tokenRow.users_id,
    },
    include: [
      {
        model: db.permissions,
        as: "permissions",
      },
    ],
  });
  if (!user) {
    res.status(401);
    res.json({ message: "Unauthorised (401)" });
    return;
  }
  req.user = {
    ...user.toJSON(),
  };
  next();
};

module.exports = authenticate;
