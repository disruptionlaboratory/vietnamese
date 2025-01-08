const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Permission = sequelize.define(
        "Permission",
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
            name: {
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
            tableName: "permissions",
            timestamps: false,
        },
    );
    // @ts-ignore
    Permission.associate = (models) => {
        const { users } = models;
        Permission.belongsToMany(users, {
            through: "users_permissions",
            foreignKey: "permissions_id",
            otherKey: "users_id",
            as: "permissions",
        });
    };
    return Permission;
};
