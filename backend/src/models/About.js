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
