// EcoMargin — Download CMS Model (Sequelize)
// src/models/Download.js
'use strict'

const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../config/database')

class Download extends Model {}

Download.init(
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
    category: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: 'Technical Datasheet',
    },
    fileSize: {
      type: DataTypes.STRING(50),
      field: 'file_size',
      allowNull: true,
    },
    fileUrl: {
      type: DataTypes.STRING(500),
      field: 'file_url',
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
    modelName: 'Download',
    tableName: 'downloads',
    timestamps: true,
    underscored: true,
  }
)

module.exports = Download
