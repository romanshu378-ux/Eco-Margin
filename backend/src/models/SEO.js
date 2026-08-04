// EcoMargin — Enterprise SEO CMS Model (Sequelize)
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
      allowNull: false,
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
    focusKeyword: {
      type: DataTypes.STRING(255),
      field: 'focus_keyword',
      allowNull: true,
    },
    canonicalUrl: {
      type: DataTypes.STRING(500),
      field: 'canonical_url',
      allowNull: true,
    },
    robots: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: 'index, follow',
    },
    ogTitle: {
      type: DataTypes.STRING(255),
      field: 'og_title',
      allowNull: true,
    },
    ogDescription: {
      type: DataTypes.TEXT,
      field: 'og_description',
      allowNull: true,
    },
    ogImage: {
      type: DataTypes.STRING(500),
      field: 'og_image',
      allowNull: true,
    },
    twitterCard: {
      type: DataTypes.STRING(100),
      field: 'twitter_card',
      allowNull: true,
      defaultValue: 'summary_large_image',
    },
    schemaType: {
      type: DataTypes.STRING(100),
      field: 'schema_type',
      allowNull: true,
      defaultValue: 'Organization',
    },
    structuredData: {
      type: DataTypes.TEXT,
      field: 'structured_data',
      allowNull: true,
    },
    organizationSchema: {
      type: DataTypes.TEXT,
      field: 'organization_schema',
      allowNull: true,
    },
    // Verification & Analytics Identifiers
    gscVerification: {
      type: DataTypes.STRING(255),
      field: 'gsc_verification',
      allowNull: true,
    },
    bingVerification: {
      type: DataTypes.STRING(255),
      field: 'bing_verification',
      allowNull: true,
    },
    gaMeasurementId: {
      type: DataTypes.STRING(100),
      field: 'ga_measurement_id',
      allowNull: true,
    },
    gtmContainerId: {
      type: DataTypes.STRING(100),
      field: 'gtm_container_id',
      allowNull: true,
    },
    clarityId: {
      type: DataTypes.STRING(100),
      field: 'clarity_id',
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
