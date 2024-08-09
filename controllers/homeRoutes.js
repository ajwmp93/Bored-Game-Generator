const { Games, User } = require('../models');

const router = require('express').Router();

// home, login, individual project
router.get('/', async (req, res) => {
    const userData = await User.findByPk(1, {
      include: Games
    });
    console.log(userData)
    const user = userData.get({plain: true})
    console.log(user)
    res.render('homepage',  { user }) ;
})

router.get('/login', (req, res) => {
  res.render('login');
})

router.get('/favorites', (req, res) => {
  res.render('favorites')
})

router.get('/spoopy', (req, res) => {
  res.render('spoopy')
})


router.get('/sus', (req, res) => {
  res.render('sus')
})

router.get('/heroic', (req, res) => {
  res.render('heroic')
})

router.get('/survival', (req, res) => {
  res.render('survival')
})



module.exports = router;












