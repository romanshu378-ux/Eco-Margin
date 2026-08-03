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
    title: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.getDataValue('name')
      },
      set(val) {
        if (val) this.setDataValue('name', val)
      }
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: 'Technical Datasheet',
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    fileSize: {
      type: DataTypes.STRING(50),
      field: 'file_size',
      allowNull: true,
      defaultValue: '1.5 MB',
    },
    fileUrl: {
      type: DataTypes.STRING(500),
      field: 'file_url',
      allowNull: false,
    },
    pdfUrl: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.getDataValue('fileUrl')
      },
      set(val) {
        if (val) this.setDataValue('fileUrl', val)
      }
    },
    iconUrl: {
      type: DataTypes.STRING(500),
      field: 'icon_url',
      allowNull: true,
    },
    displayOrder: {
      type: DataTypes.INTEGER,
      field: 'display_order',
      defaultValue: 0,
    },
    status: {
      type: DataTypes.ENUM('Active', 'Draft', 'Inactive'),
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
