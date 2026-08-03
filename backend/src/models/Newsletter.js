// EcoMargin — Newsletter Subscriber Model (Sequelize)
// src/models/Newsletter.js

'use strict'

const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../config/database')

class Newsletter extends Model {}

Newsletter.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    status: {
      type: DataTypes.ENUM('Subscribed', 'Unsubscribed'),
      defaultValue: 'Subscribed',
    },
  },
  {
    sequelize,
    modelName: 'Newsletter',
    tableName: 'newsletters',
    timestamps: true,
    underscored: true,
  }
)

module.exports = Newsletter
