const User = require('./User');
const Recipe = require('./Recipe')
const RecipeBox = require('./RecipeBox')

User.belongsToMany(Recipe, { through: RecipeBox, foreignKey: "user_id" });
Recipe.belongsToMany(User, { through: RecipeBox, foreignKey: "recipe_id" });

module.exports = { User, Recipe, RecipeBox };