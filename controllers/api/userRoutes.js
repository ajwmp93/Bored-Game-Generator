const express = require('express');
const router = express.Router();
const { User } = require('../../models');
const withAuth = require('../../middleware/auth');

// Validate input function
const validateUserInput = (input) => {
  const { email, password, name } = input;
  if (!email || !password || !name) {
    return 'All fields are required';
  }

  return null;
};

// Create a new user
router.post('/', async (req, res) => {
  const validationError = validateUserInput(req.body);
  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  try {
    const userData = await User.create(req.body);
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(201).json(userData); 
    });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ message: 'Failed to create user' });
  }
});

// Log in a user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !user.checkPassword(password)) { // Assuming you have a method to validate password
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    req.session.user_id = user.id; // Store user ID in session
    req.session.logged_in = true;

    res.json({ redirect: '/favorites'});
  } catch (err) {
    res.status(500).json({ message: 'An error occurred during login' });
  }
});

// Log out a user
router.post('/logout', (req, res) => {
  // Assuming you are using sessions
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to log out' });
      }
      res.status(200).json({ message: 'Logged out successfully' });
    });
  } else {
    res.status(400).json({ message: 'No active session' });
  }
});

module.exports = router;