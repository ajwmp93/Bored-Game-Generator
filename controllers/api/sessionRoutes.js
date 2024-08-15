const express = require('express');
const router = express.Router();

// Check if user is logged in
router.get('/', (req, res) => {
  console.log('Session data:', req.session);
  res.json({ logged_in: !!req.session.user_id });
});

module.exports = router;