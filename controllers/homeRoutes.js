const router = require('express').Router();
const { Recipe, User } = require('../models');
const withAuth = require('../utils/auth');
//   using withAuth as Middleware, when withAuth completes it continue (next()), to the function
router.get('/', async (req, res) => {
  try {
    const recipeData = await Recipe.findAll({
      include: [
        {
          model: User,
        },
      ],
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });

    const recipeBox = recipeData.map((recipe) => recipe.get({ plain: true }));

    res.render('homepage', {
      ...recipeBox,
      // Pass the login flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log('err', err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  //   if user is already logged in, redirect to homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  //   if user is already logged in, redirect to homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;
