const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profile: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      profile_size: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      profile_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      profile_mimetype: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      created: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "users",
      timestamps: false,
    },
  );
  User.associate = (models) => {
    const { channels, permissions } = models;
    User.belongsToMany(permissions, {
      through: "users_permissions",
      foreignKey: "users_id",
      otherKey: "permissions_id",
      as: "permissions",
    });

    User.belongsToMany(channels, {
      through: "channels_has_users",
      foreignKey: "users_id",
      otherKey: "channels_id",
      as: "channels",
    });
  };
  return User;
};
