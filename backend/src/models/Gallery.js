// EcoMargin — Gallery Model (Sequelize)
// src/models/Gallery.js
'use strict'

const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../config/database')

class Gallery extends Model {}

Gallery.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: 'Factory & Manufacturing',
    },
    imageUrl: {
      type: DataTypes.STRING(500),
      field: 'image_url',
      allowNull: false,
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
    modelName: 'Gallery',
    tableName: 'gallery',
    timestamps: true,
    underscored: true,
  }
)

module.exports = Gallery
