const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Translation = sequelize.define(
        "Translation",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            key: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            value: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            language: {
                type: DataTypes.STRING,
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
            tableName: "translations",
            timestamps: false,
        },
    );
    return Translation;
};
