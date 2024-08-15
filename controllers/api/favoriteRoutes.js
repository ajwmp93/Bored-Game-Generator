const router = require('express').Router();
// Import the Project model from the models folder
const { Favorites } = require('../../models');

// If a POST request is made to /api/projects, a new project is created. If there is an error, the function returns with a 400 error. 
router.post('/', async (req, res) => {
  const { title, img_url, site_url, description } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO favorites(title, img_url, site_url, description) VALUES($1, $2, $3, $4)',
      [title, img_url, site_url, description]
    );
    res.status(200).send('Data saved');
  } catch (error) {
    console.error('Error saving data', error);
    res.status(500).send('Failed to save data');
  }
});

// If a DELETE request is made to /api/projects/:id, that project is deleted. 
router.delete('/:id', async (req, res) => {
  try {
    const postData = await Favorites.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
