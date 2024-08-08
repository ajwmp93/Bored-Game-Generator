const User = require('./User');
const Favorites = require('./Favorites');

// Creates a relationship between User and Project model, with the User having a "has many" relationship with Project model.
User.hasMany(Favorites, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

// Creates a relationship between User and Project model, with a "belongs to" relationship of the Project to the User.
Favorites.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Favorites };
