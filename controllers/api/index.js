const router = require('express').Router();
const userRoutes = require('./userRoutes');
const favoriteRoutes = require('./favoriteRoutes');
const currentUserRoutes = require('./currentUserRoutes')
const sessionRoutes = require('./sessionRoutes')


router.use('/current-user', currentUserRoutes) 
router.use('/users', userRoutes);
router.use('/favorites', favoriteRoutes);
router.use('/check-session', sessionRoutes)


module.exports = router;

