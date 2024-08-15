const router = require('express').Router();
const userRoutes = require('./userRoutes');
const favoriteRoutes = require('./favoriteRoutes');
const currentUserRoutes = require('./currentUserRoutes')


router.use('/current-user', currentUserRoutes) 
router.use('/users', userRoutes);
router.use('/favorites', favoriteRoutes);


module.exports = router;

