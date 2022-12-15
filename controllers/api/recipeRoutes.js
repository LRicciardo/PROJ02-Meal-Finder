const router = require('express').Router();
const {
  Recipe,
  Unit,
  RecipeIngredient,
  Pantry,
  User,
} = require('../../models');
const axios = require('axios');
require('dotenv').config();

router.get('/getRecipeData', async (req, res) => {
  try {
    // Chooses an apiKey at random from the arrApiKeys to be used in the fetch api call

  const randomApiKey = () => {
        let arrApiKeys = [
      process.env.API_KEY1,
      process.env.API_KEY2,
      process.env.API_KEY3,
      process.env.API_KEY4,
      process.env.API_KEY5,
      process.env.API_KEY6,
      process.env.API_KEY7
      ];
    return arrApiKeys[Math.floor(Math.random() * arrApiKeys.length)];
  } 
    const apiData = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?query=${req.query.query}&number=5&addRecipeInformation=true&apiKey=${randomApiKey}`
    );
    return res.status(200).json(apiData.data);
    console.log('data', apiData.data);
  } catch (e) {
    res.status(500).send(e);
  }
});

// ENDPOINT : http://localhost:3001/api/recipe/
router.get('/', async (req, res) => {
  try {
    const recipeBoxData = await Recipe.findAll({
      include: [User],
      where: {
        user_id: req.session.user_id,
      },
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
      include: [User],
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      }
    });

    res.status(200).json(recipeBoxData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
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
      res.status(404).json({
        message: `No recipe found with id ${req.params.id} for user ${req.session.user.id} !`,
      });
      return;
    }

    res.status(200).json(recipeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
