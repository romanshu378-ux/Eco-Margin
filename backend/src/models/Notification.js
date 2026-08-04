// EcoMargin — Notification Model (Sequelize)
// src/models/Notification.js
'use strict'

const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../config/database')

class Notification extends Model {}

Notification.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: 'Lead', // Lead, Email, Quotation, Reminder, System
    },
    is_read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    link: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Notification',
    tableName: 'notifications',
    timestamps: true,
    underscored: true,
  }
)

module.exports = Notification
