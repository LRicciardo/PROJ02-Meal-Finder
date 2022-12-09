const User = require('./User');
const Recipe = require('./Recipe')
const RecipeIngredient = require('./RecipeIngredient')
const Unit = require('./Unit')
const Pantry = require('./Pantry');


User.belongsToMany(Recipe, { through: 'Recipe_Box' });
Recipe.belongsToMany(User, { through: 'Recipe_Box' });

Recipe.belongsToMany(Pantry, { through: RecipeIngredient });
Pantry.belongsToMany(Recipe, { through: RecipeIngredient });

Unit.belongsToMany(Recipe, { through: RecipeIngredient });
Recipe.belongsToMany(Unit, { through: RecipeIngredient });

module.exports = { User, Recipe, RecipeIngredient, Unit, Pantry };
