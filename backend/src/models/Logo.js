// EcoMargin — Website Logo CMS Model (Sequelize)
// src/models/Logo.js
'use strict'

const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../config/database')

class Logo extends Model {}

Logo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    logoType: {
      type: DataTypes.ENUM('header', 'footer', 'favicon', 'white_logo'),
      field: 'logo_type',
      allowNull: false,
      unique: true,
    },
    imageUrl: {
      type: DataTypes.STRING(500),
      field: 'image_url',
      allowNull: false,
    },
    publicId: {
      type: DataTypes.STRING(255),
      field: 'public_id',
      allowNull: true,
    },
    altText: {
      type: DataTypes.STRING(255),
      field: 'alt_text',
      allowNull: true,
      defaultValue: 'EcoMargin Logo',
    },
  },
  {
    sequelize,
    modelName: 'Logo',
    tableName: 'website_logo',
    timestamps: true,
    underscored: true,
  }
)

module.exports = Logo
