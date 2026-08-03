// EcoMargin — Manufacturing CMS Model (Sequelize)
// src/models/Manufacturing.js
'use strict'

const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../config/database')

class Manufacturing extends Model {}

Manufacturing.init(
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
      type: DataTypes.STRING(255),
      field: 'hero_subtitle',
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    factoryArea: {
      type: DataTypes.STRING(100),
      field: 'factory_area',
      allowNull: true,
    },
    annualCapacity: {
      type: DataTypes.STRING(100),
      field: 'annual_capacity',
      allowNull: true,
    },
    burnInTestingHours: {
      type: DataTypes.STRING(100),
      field: 'burn_in_testing_hours',
      allowNull: true,
    },
    defectRate: {
      type: DataTypes.STRING(100),
      field: 'defect_rate',
      allowNull: true,
    },
    manufacturingSteps: {
      type: DataTypes.JSON,
      field: 'manufacturing_steps',
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Manufacturing',
    tableName: 'manufacturing',
    timestamps: true,
    underscored: true,
  }
)

module.exports = Manufacturing
