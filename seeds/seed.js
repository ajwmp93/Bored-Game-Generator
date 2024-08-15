const sequelize = require('../config/connection');
const { Games, Favorites, User, Moods, GameMoods } = require('../models');

const gameData = require('./gameData.json');
const userData = require('./userData.json');
const favoriteData = require('./favoriteData.json');
const moodData = require('./moodData.json')
const gameMoodData = require('./gam')


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const games = await Games.bulkCreate(gameData, {
    individualHooks: true,
    returning: true,
  });
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  const favorites = await Favorites.bulkCreate(favoriteData, {
    individualHooks: true,
    returning: true,
  });
  const mood = await Moods.bulkCreate(moodData, {
    individualHooks: true,
    returning: true,
  });
  

  process.exit(0);
};

seedDatabase();
