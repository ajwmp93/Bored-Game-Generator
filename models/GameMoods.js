const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class GameMoods extends Model {}

GameMoods.init(
  {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    game_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'game',
        key: 'id',
      },
    },
    mood_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'mood',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'gameMoods',
  }
);

module.exports = GameMoods;
