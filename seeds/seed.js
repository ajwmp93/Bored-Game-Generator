const sequelize = require('../config/connection');
const { Games, Favorites, User } = require('../models');

const gameData = require('./gameData.json');
const userData = require('./userData.json');
const favoriteData = require('./favoriteData.json');

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

  process.exit(0);
};

seedDatabase();
