const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
  try {
    console.log("inside userRoute post / ");
    const userData = await User.create({
      name: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    console.log(userData);
    req.session.save(() => {
      console.log(req.session)
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      return res.status(200)
      .json(userData);
    });
  } catch (err) {
    return res.status(400).json(err);
  }
});

router.post('/users/login', async (req, res) => {
  try {
    console.log("inside userRoute post /users/login ");
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ 
          message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ 
          message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      console.log(req.session.cookie)
      
      res.status(200)
       .json({ 
        user: userData, 
        message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(450).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
