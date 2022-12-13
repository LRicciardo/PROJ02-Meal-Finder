const router = require('express').Router();
const userRoutes = require('./userRoutes');
const recipeRoutes = require('./recipeRoutes');
const unitRoutes = require('./unitRoutes');
const pantryRoutes = require('./pantryRoutes');
const recipeIngredientRoutes = require('./recipeIngredientRoutes');

router.use('/users', userRoutes);
router.use('/recipe', recipeRoutes);

module.exports = router;
