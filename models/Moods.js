const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Create Project model and datatypes, including the user_id foreign key.
class Moods extends Model {}

Moods.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'moods',
  }
);

module.exports = Moods;