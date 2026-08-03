// EcoMargin — Footer CMS Model (Sequelize)
// src/models/Footer.js
'use strict'

const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../config/database')

class Footer extends Model {}

Footer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    companyName: {
      type: DataTypes.STRING(255),
      field: 'company_name',
      allowNull: true,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    altPhone: {
      type: DataTypes.STRING(50),
      field: 'alt_phone',
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    supportEmail: {
      type: DataTypes.STRING(255),
      field: 'support_email',
      allowNull: true,
    },
    whatsapp: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    googleMapsEmbedUrl: {
      type: DataTypes.TEXT,
      field: 'google_maps_embed_url',
      allowNull: true,
    },
    businessHours: {
      type: DataTypes.STRING(255),
      field: 'business_hours',
      allowNull: true,
    },
    linkedin: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    twitter: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    facebook: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    copyright: {
      type: DataTypes.STRING(255),
      field: 'copyright',
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Footer',
    tableName: 'footer',
    timestamps: true,
    underscored: true,
  }
)

module.exports = Footer
