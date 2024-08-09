const User = require('./User');
const Favorites = require('./Favorites');
const Games = require('./Games')


User.belongsToMany(Games, {
  through: Favorites
});

Games.belongsToMany(User, {
  through: Favorites 
})

module.exports = { User, Favorites, Games };
