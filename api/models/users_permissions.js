const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const UserPermission = sequelize.define(
    "UserPermission",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      users_id: {
        type: DataTypes.INTEGER,
      },
      permissions_id: {
        type: DataTypes.INTEGER,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "created",
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "updated",
      },
    },
    {
      tableName: "users_permissions",
      timestamps: false,
      createdAt: "created",
      updatedAt: "updated",
      freezeTableName: true,
    },
  );
  UserPermission.associate = (models) => {
    const { permissions, users } = models;
    UserPermission.belongsTo(users, { foreignKey: "users_id" });
    UserPermission.belongsTo(permissions, {
      foreignKey: "permissions_id",
    });
  };
  return UserPermission;
};
