const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Pantry extends Model { }

Pantry.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        ingredient: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'pantry',
    }
);

module.exports = Pantry;
