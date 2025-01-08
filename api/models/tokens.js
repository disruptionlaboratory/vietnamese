const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Token = sequelize.define(
        "Token",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            users_id: {
                type: DataTypes.INTEGER,
            },
            access_token: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            expiry: {
                type: DataTypes.DATE,
                allowNull: false,
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
            tableName: "tokens",
            timestamps: false,
        },
    );
    Token.associate = (models) => {
        const { users } = models;
        Token.belongsTo(users, { foreignKey: "users_id" });
    };
    return Token;
};
