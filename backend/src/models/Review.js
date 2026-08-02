// EcoMargin — Review Model (Sequelize)
// src/models/Review.js
'use strict'

const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../config/database')

class Review extends Model {}

Review.init(
  {
    id:         { type: DataTypes.UUID,    defaultValue: DataTypes.UUIDV4, primaryKey: true },
    user_id:    { type: DataTypes.UUID,    allowNull: false },
    station_id: { type: DataTypes.UUID,    allowNull: false },
    booking_id: { type: DataTypes.UUID,    allowNull: true },
    rating:     { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 5 } },
    comment:    { type: DataTypes.TEXT,    allowNull: true },
    is_verified:{ type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    sequelize,
    modelName: 'Review',
    tableName: 'reviews',
  },
)

module.exports = Review
