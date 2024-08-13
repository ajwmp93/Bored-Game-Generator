// const express = require('express');
// const router = express.Router();
// const { Games } = require('../../models'); // Adjust the path as needed

// // Route to display games based on the selected mood
// router.get('/moods', async (req, res) => {

//   console.log('moods route')
//   try {
//     const selectedMood = req.query.mood;

//     // Query the database for games with the selected mood
//     const games = await Games.findAll({
//       where: {
//         mood: selectedMood,
//       },
//     });
// console.log(selectedMood)
//     // Render the view with the list of games and the selected mood
//     res.render('moods', { games: games.map(game => game.toJSON()), mood: selectedMood });
//   } catch (err) {
//     console.error('Error fetching games:', err);
//     res.status(500).json({ message: 'An error occurred while fetching games' });
//   }
// });

// module.exports = router;