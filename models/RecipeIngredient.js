const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class RecipeIngredient extends Model { }

RecipeIngredient.init(
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
            type: DataTypes.INTEGER,
            allowNull: false,
            uniqueFlag: false,
            references: {
                model: 'units',
                key: 'id',
                unique: false
            }
        },
        amount: {
            type: DataTypes.INTEGER(4,3),
            allowNull: false,
            validate:{isDecimal:true}
        }
    },

    {
        sequelize,
        modelName: 'recipeingredient',
    }
);

module.exports = RecipeIngredient;
