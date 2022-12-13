const router = require('express').Router();
const { Recipe, Unit, RecipeIngredient, Pantry } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const newPantry = await Pantry.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPantry);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const pantryData = await Pantry.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!pantryData) {
      res.status(404).json({ message: `No pantry found with id ${req.params.id} for user ${req.session.user.id} !` });
      return;
    }

    res.status(200).json(pantryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;