const { Games, User } = require('../models');

const router = require('express').Router();

// home, login, individual project
router.get('/', async (req, res) => {

    res.render('homepage') ;
})

router.get('/login', (req, res) => {
  res.render('login');
})

router.get('/favorites', async (req, res) => {
  const userData = await User.findByPk(1, {
    include: Games
  });
  console.log(userData)
  const user = userData.get({plain: true})
  console.log(user)
  res.render('favorites',  { user })
})

router.get('/moods', (req, res) => {
  res.render('moods')
})



module.exports = router;












