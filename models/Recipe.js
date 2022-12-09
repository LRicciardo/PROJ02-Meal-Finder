const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Recipe extends Model {}

Recipe.init(
  {
    api_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    instructions: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    source_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    servings: {
      type: DataTypes.STRING,
      references: {
        model: 'user',
        key: 'id',
      },
      ready_time: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
  },
  {
    sequelize,
    modelName: 'recipe'
  }
);

module.exports = Recipe;
