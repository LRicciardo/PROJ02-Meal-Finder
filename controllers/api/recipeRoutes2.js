const router = require('express').Router();
const { Recipe, Unit, RecipeIngredient, Pantry, User } = require('../../models');

// ENDPOINT : http://localhost:3001/api/recipe/
router.get('/', async (req, res) => {
  try {
    const recipeBoxData = await Recipe.findAll({
      include: [ User ],
      where: { 
        user_id: req.session.user_id,
      }
    });

    res.status(200).json(recipeBoxData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// SELECT 
// recipe.api_id, recipe.image, recipe.name 

router.get('/:id', async (req, res) => {
  try {
    const recipeBoxData = await Recipe.findbyPK({
      include: [ Unit, RecipeIngredient, Pantry ],
      where: { 
        id: req.params.id
        // user_id: req.session.user_id
      }
    });

    res.status(200).json(recipeBoxData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const incomingData = req.body;
    let itemArr = [];

    // for every ingredient find ingredient in pantry
    // for (item in incomingData.ingredient) {
    //   const itemData = await Pantry.findOne({ 
    //     where :{
    //       name: item       
    // }}),
    // if (itemData) {
    //   itemArr.push(itemData.id)
    // } else {
    //   const newItemData = await Pantry.create(incomingData.ingredient_name),
    // }
    // for every ingredient find unit in units
    // if ingredient not in Pantry, add Ingredient
    // if unit not in units , add unit
    // if ingredient in pantry and unit in unit add measurment in recipeIngredients
    // create a new recipeData object that contains the recipe info and an arr of ingredients
    // ingredient arr [1,2,3,4]

    // populate the recipe
  
    const newRecipe = await Recipe.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newRecipe);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const recipeData = await Recipe.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!recipeData) {
      res.status(404).json({ message: `No recipe found with id ${req.params.id} for user ${req.session.user.id} !` });
      return;
    }

    res.status(200).json(recipeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
