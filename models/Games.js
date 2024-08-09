const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Create Project model and datatypes, including the user_id foreign key.
class Games extends Model {}

Games.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mood: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img_url: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
      },
      allowNull: false,
    },
    site_url: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
      },
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'games',
  }
);

module.exports = Games;