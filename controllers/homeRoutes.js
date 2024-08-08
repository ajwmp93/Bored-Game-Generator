const { Favorites, User } = require('../models');

const router = require('express').Router();

// home, login, individual project
router.get('/', async (req, res) => {
    const favoriteData = await Favorites.findAll({

    });
    const favorites = favoriteData.map((favorite) => favorite.get({plain: true}));
    res.render('homepage', { favorites });
})

router.get('/login', (req, res) => {
  res.render('login');
})

module.exports = router;












