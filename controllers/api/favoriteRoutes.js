const express = require('express');
const router = express.Router();
const { Favorites } = require('../../models');
const authMiddleware = require('../../middleware/auth');

// Add a favorite
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { game_id } = req.body;
    const user_id = req.session.user_id;

    if (!user_id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Check if the favorite already exists
    const existingFavorite = await Favorites.findOne({
      where: { game_id, user_id }
    });

    if (existingFavorite) {
      // If the favorite already exists, you can choose to either
      // return a message indicating that it's already a favorite
      return res.status(400).json({ message: 'Favorite already exists' });
    }

    // Create a favorite entry in the database
    const favorite = await Favorites.create({ game_id, user_id });

    res.status(200).json(favorite);
  } catch (err) {
    console.error('Error adding favorite:', err.message);
    res.status(500).json({ message: 'Error adding favorite', error: err.message });
  }
});

// Get user's favorites
router.get('/', authMiddleware, async (req, res) => {
  try {
    const user_id = req.session.user_id;
    if (!user_id) {
      return res.redirect('/login'); // Redirect to login if not authenticated
    }

    const favorites = await Favorites.findAll({
      where: { user_id },
      include: [Games]
    });

    res.render('favorites', { favorites, logged_in: !!user_id });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a favorite by ID
router.delete('/:id', async (req, res) => {
  try {
    const rowsDeleted = await Favorites.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id, // Ensure the favorite belongs to the current user
      },
    });

    if (rowsDeleted === 0) {
      return res.status(404).json({ message: 'Favorite not found or not authorized' });
    }

    res.status(200).json({ message: 'Favorite deleted successfully' });
  } catch (error) {
    console.error('Error deleting favorite:', error);
    res.status(500).json({ error: 'Failed to delete favorite' });
  }
});

module.exports = router;