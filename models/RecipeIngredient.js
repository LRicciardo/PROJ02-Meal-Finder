const { Model, DataTypes } = require('sequelize');
const { RecipeIngredient } = require('.');
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
        ingredient_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            uniqueFlag: false,
            references: {
                model: 'pantry',
                key: 'id',
                unique: false
            }
        },
        unit_id: {
            type: DataTypes.STRING,
            allowNull: false,
            uniqueFlag: false,
            references: {
                model: 'units',
                key: 'id',
                unique: false
            }
        },
        measurement: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },

    {
        sequelize,
        modelName: 'recipeingredient',
    }
);

module.exports = RecipeIngredient;
