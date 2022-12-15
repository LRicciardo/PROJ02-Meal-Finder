const User = require('./User');
const Recipe = require('./Recipe')
const RecipeIngredient = require('./RecipeIngredient')
const Unit = require('./Unit')
const Pantry = require('./Pantry');
const RecipeBox = require('./RecipeBox')

User.belongsToMany(Recipe, { through: RecipeBox, foreignKey: "user_id" });
Recipe.belongsToMany(User, { through: RecipeBox, foreignKey: "recipe_id" });

Recipe.belongsToMany(Pantry, { through: RecipeIngredient, foreignKey: "recipe_id" });
Pantry.belongsToMany(Recipe, { through: RecipeIngredient, foreignKey: "ingredient_id" });

Unit.belongsToMany(Recipe, { through: RecipeIngredient, foreignKey: "unit_id" });
Recipe.belongsToMany(Unit, { through: RecipeIngredient, foreignKey: "recipe_id" });

Unit.belongsToMany(RecipeBox, { through: RecipeIngredient, foreignKey: "unit_id" });
RecipeBox.belongsToMany(Unit, { through: RecipeIngredient, foreignKey: "recipe_id" });

module.exports = { User, Recipe, RecipeIngredient, Unit, Pantry, RecipeBox };