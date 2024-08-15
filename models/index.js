const User = require('./User');
const Favorites = require('./Favorites');
const Games = require('./Games')
const Moods = require('./Moods')
const GameMoods = require('./GameMoods')

User.belongsToMany(Games, {
  through: Favorites,
  foreignKey: 'user_id',
});

Games.belongsToMany(User, {
  through: Favorites,
  foreignKey: 'game_id',
});

Games.belongsToMany(Moods, {
  through: GameMoods,
  foreignKey: 'game_id',
});

Moods.belongsToMany(Games, {
  through: GameMoods,
  foreignKey: 'mood_id',
});

module.exports = { User, Favorites, Games, Moods, GameMoods };
