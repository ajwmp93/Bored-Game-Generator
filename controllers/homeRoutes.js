const express = require('express');
const router = express.Router();
const { Games, User, GameMoods, Moods } = require('../models'); 

// Home route
router.get('/', async (req, res) => {
  res.render('homepage');
});

// Login route
router.get('/login', (req, res) => {
  res.render('login');
});

// Favorites route
router.get('/favorites', async (req, res) => {
  try {
    const userData = await User.findByPk(1, {
      include: Games
    });
    const user = userData.get({ plain: true });
    res.render('favorites', { user });
  } catch (err) {
    console.error('Error fetching favorites:', err);
    res.status(500).json({ message: 'An error occurred while fetching favorites' });
  }
});
// Route to list all available moods (if needed)
router.get('/moods', async (req, res) => {

  console.log('moods route')
  try {
    const selectedMood = req.query.mood;

    // Query the database for games with the selected mood
    const games = await Games.findAll({
      include: {model: Moods, where: {name:selectedMood}} 
      
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