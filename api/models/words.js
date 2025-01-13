const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Word = sequelize.define(
    "Word",
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
      term: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      translation: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      definition: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      grammar: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phonetic: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      audio: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      image: {
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
      tableName: "words",
      timestamps: false,
    },
  );
  return Word;
};
