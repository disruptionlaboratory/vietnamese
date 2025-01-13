const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config("./../.env");

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    // port: process.env.DATABASE_PORT,
    host: process.env.MYSQL_HOST,
    dialect: process.env.DATABASE_DIALECT,
    define: {
      timestamps: false,
    },
  },
);

const db = {
  sequelize: sequelize,
  tokens: require("./tokens")(sequelize),
  users: require("./users")(sequelize),
  permissions: require("./permissions")(sequelize),
  translations: require("./translations")(sequelize),
  words: require("./words")(sequelize),
};

Object.keys(db).forEach((modelName) => {
  if (modelName !== "sequelize") {
    // @ts-ignore
    if (db[modelName].associate) {
      // @ts-ignore
      db[modelName].associate(db);
    }
  }
});

module.exports = db;
