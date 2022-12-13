const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Recipe extends Model { }

Recipe.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    api_id: {
      type: DataTypes.INTEGER(8),
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: { notNull: true }
    },
    instructions: {
      type: DataTypes.STRING(2000),
      validate: { notNull: true }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isUrl: true },
    },
    source_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isUrl: true },
    },
    servings: {
      type: DataTypes.INTEGER(4),
      validate: { isInt: true }
    },
    ready_time: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      validate: { isInt: true },
    },
  },

  {
    sequelize,
    modelName: 'recipe'
  }
);

module.exports = Recipe;
