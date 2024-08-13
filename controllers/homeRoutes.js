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

router.get('/moods', async (req, res) => {

  console.log('moods route')
  try {
    const selectedMood = req.query.mood;

    // Query the database for games with the selected mood
    const games = await Games.findAll({
      where: {
        mood: selectedMood,
      },
    });
console.log(games)
    // Render the view with the list of games and the selected mood
    res.render('moods', { games: games.map(game => game.toJSON()), mood: selectedMood });
  } catch (err) {
    console.error('Error fetching games:', err);
    res.status(500).json({ message: 'An error occurred while fetching games' });
  }
});

module.exports = router;
