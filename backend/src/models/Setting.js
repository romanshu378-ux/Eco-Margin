// EcoMargin — Website Settings Model (Sequelize)
// src/models/Setting.js

'use strict'

const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../config/database')

class Setting extends Model {}

Setting.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    key: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING(50),
      defaultValue: 'General',
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Setting',
    tableName: 'settings',
    timestamps: true,
    underscored: true,
  }
)

module.exports = Setting
