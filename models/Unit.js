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
      type: DataTypes.STRING(15),
      allowNull: false,
      validate:{notNull:true, notEmpty:false}
    },
    name_short: {
      type: DataTypes.STRING(5),
      allowNull: false,
      validate:{notNull:true, notEmpty:false}
    },
  },
  {
    sequelize,
    modelName: 'unit',
  }
);

module.exports = Unit;
