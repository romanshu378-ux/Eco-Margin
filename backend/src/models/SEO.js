// EcoMargin — SEO CMS Model (Sequelize)
// src/models/SEO.js
'use strict'

const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../config/database')

class SEO extends Model {}

SEO.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    pageRoute: {
      type: DataTypes.STRING(255),
      field: 'page_route',
      allowNull: true,
      defaultValue: '/',
    },
    metaTitle: {
      type: DataTypes.STRING(255),
      field: 'meta_title',
      allowNull: true,
    },
    metaDescription: {
      type: DataTypes.TEXT,
      field: 'meta_description',
      allowNull: true,
    },
    keywords: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    canonicalUrl: {
      type: DataTypes.STRING(500),
      field: 'canonical_url',
      allowNull: true,
    },
    ogTitle: {
      type: DataTypes.STRING(255),
      field: 'og_title',
      allowNull: true,
    },
    ogImage: {
      type: DataTypes.STRING(500),
      field: 'og_image',
      allowNull: true,
    },
    organizationSchema: {
      type: DataTypes.TEXT,
      field: 'organization_schema',
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'SEO',
    tableName: 'seo',
    timestamps: true,
    underscored: true,
  }
)

module.exports = SEO
