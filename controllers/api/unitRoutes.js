const router = require('express').Router();
const { Recipe, Unit, RecipeIngredient, Pantry } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const newUnit = await Unit.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newUnit);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const unitData = await Unit.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!unitData) {
      res.status(404).json({ message: `No unit found with id ${req.params.id} for user ${req.session.user.id} !` });
      return;
    }

    res.status(200).json(unitData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;