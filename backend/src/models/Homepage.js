// EcoMargin — Homepage CMS Model (Sequelize)
// src/models/Homepage.js
'use strict'

const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../config/database')

class Homepage extends Model {}

Homepage.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    heroTitle: {
      type: DataTypes.STRING(255),
      field: 'hero_title',
      allowNull: true,
    },
    heroSubtitle: {
      type: DataTypes.TEXT,
      field: 'hero_subtitle',
      allowNull: true,
    },
    heroVideoUrl: {
      type: DataTypes.STRING(500),
      field: 'hero_video_url',
      allowNull: true,
    },
    background_video_url: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.getDataValue('heroVideoUrl')
      },
      set(val) {
        if (val !== undefined) this.setDataValue('heroVideoUrl', val)
      }
    },
    heroVideoPublicId: {
      type: DataTypes.STRING(255),
      field: 'hero_video_public_id',
      allowNull: true,
    },
    video_public_id: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.getDataValue('heroVideoPublicId')
      },
      set(val) {
        if (val !== undefined) this.setDataValue('heroVideoPublicId', val)
      }
    },
    primaryButtonText: {
      type: DataTypes.STRING(100),
      field: 'primary_button_text',
      allowNull: true,
    },
    secondaryButtonText: {
      type: DataTypes.STRING(100),
      field: 'secondary_button_text',
      allowNull: true,
    },
    brochureButtonText: {
      type: DataTypes.STRING(100),
      field: 'brochure_button_text',
      allowNull: true,
    },
    stats: {
      type: DataTypes.JSON,
      field: 'stats',
      allowNull: true,
    },
    sectionVisibility: {
      type: DataTypes.JSON,
      field: 'section_visibility',
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Homepage',
    tableName: 'homepage',
    timestamps: true,
    underscored: true,
  }
)

module.exports = Homepage
