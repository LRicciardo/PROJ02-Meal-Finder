const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class RecipeBox extends Model { }

RecipeBox.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      uniqueFlag: false,
      references: {
        model: 'user',
        key: 'id',
        unique: false
      }
    },
    recipe_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      uniqueFlag: false,
      references: {
        model: 'recipe',
        key: 'id',
        unique: false
      }
    },
  },

  {
    sequelize,
    modelName: 'recipebox',
  }
);

module.exports = RecipeBox;