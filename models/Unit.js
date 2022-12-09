const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Unit extends Model { }

Unit.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'unit',
  }
);

module.exports = Unit;
