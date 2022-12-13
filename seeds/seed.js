const sequelize = require('../config/connection');
const { User, 
        Recipe, 
        RecipeBox, 
        RecipeIngredient, 
        Pantry, 
        Unit } = require('../models');

const userData = require('./userData.json');
const unitData = require('./unitData.json');
const pantryData = require('./pantryData.json');
const recipeData = require('./recipeData.json');
const recipeIngredientData = require('./recipeIngredientData.json');
const recipeBoxData = require('./recipeData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const unit = await Unit.bulkCreate(unitData);
  const pantry = await Pantry.bulkCreate(pantryData);
  const recipe = await Recipe.bulkCreate(recipeData);

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
