// EcoMargin — About CMS Model (Sequelize)
// src/models/About.js
'use strict'

const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../config/database')

class About extends Model {}

About.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    sectionEyebrow: {
      type: DataTypes.STRING(255),
      field: 'section_eyebrow',
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    secondaryDescription: {
      type: DataTypes.TEXT,
      field: 'secondary_description',
      allowNull: true,
    },
    imageUrl: {
      type: DataTypes.STRING(500),
      field: 'image_url',
      allowNull: true,
    },
    imageAlt: {
      type: DataTypes.STRING(255),
      field: 'image_alt',
      allowNull: true,
    },
    primaryButtonText: {
      type: DataTypes.STRING(100),
      field: 'primary_button_text',
      allowNull: true,
    },
    primaryButtonUrl: {
      type: DataTypes.STRING(255),
      field: 'primary_button_url',
      allowNull: true,
    },
    secondaryButtonText: {
      type: DataTypes.STRING(100),
      field: 'secondary_button_text',
      allowNull: true,
    },
    secondaryButtonUrl: {
      type: DataTypes.STRING(255),
      field: 'secondary_button_url',
      allowNull: true,
    },
    missionTitle: {
      type: DataTypes.STRING(255),
      field: 'mission_title',
      allowNull: true,
    },
    missionDescription: {
      type: DataTypes.TEXT,
      field: 'mission_description',
      allowNull: true,
    },
    visionTitle: {
      type: DataTypes.STRING(255),
      field: 'vision_title',
      allowNull: true,
    },
    visionDescription: {
      type: DataTypes.TEXT,
      field: 'vision_description',
      allowNull: true,
    },
    valuesTitle: {
      type: DataTypes.STRING(255),
      field: 'values_title',
      allowNull: true,
    },
    valuesDescription: {
      type: DataTypes.TEXT,
      field: 'values_description',
      allowNull: true,
    },
    // Legacy fields
    vision: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    mission: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    story: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    directorMessage: {
      type: DataTypes.TEXT,
      field: 'director_message',
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'About',
    tableName: 'about',
    timestamps: true,
    underscored: true,
  }
)

module.exports = About
