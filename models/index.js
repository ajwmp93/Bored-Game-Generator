const User = require('./User');
const Favorites = require('./Favorites');
const Games = require('./Games')
const Moods = require('./Moods')
const GameMoods = require('./GameMoods')

User.belongsToMany(Games, {
  through: Favorites
});

Games.belongsToMany(User, {
  through: Favorites 
});

Games.belongsToMany(Moods, {
  through: GameMoods
});

Moods.belongsToMany(Games, {
  through: GameMoods
});

module.exports = { User, Favorites, Games, Moods, GameMoods };
