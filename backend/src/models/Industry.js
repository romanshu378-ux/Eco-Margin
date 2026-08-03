// EcoMargin — Industry Model (Sequelize)
// src/models/Industry.js
'use strict'

const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../config/database')

class Industry extends Model {}

Industry.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    icon: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: '⚡',
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    imageUrl: {
      type: DataTypes.STRING(500),
      field: 'image_url',
      allowNull: true,
    },
    displayOrder: {
      type: DataTypes.INTEGER,
      field: 'display_order',
      defaultValue: 0,
    },
    status: {
      type: DataTypes.ENUM('Active', 'Draft'),
      defaultValue: 'Active',
    },
  },
  {
    sequelize,
    modelName: 'Industry',
    tableName: 'industries',
    timestamps: true,
    underscored: true,
  }
)

module.exports = Industry
