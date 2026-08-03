// EcoMargin — Project Model (Sequelize)
// src/models/Project.js
'use strict'

const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../config/database')

class Project extends Model {}

Project.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    clientName: {
      type: DataTypes.STRING(255),
      field: 'client_name',
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    capacity: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    timeline: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    images: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    imageUrl: {
      type: DataTypes.STRING(500),
      field: 'image_url',
      allowNull: true,
    },
    displayOrder: {
      type: DataTypes.INTEGER,
      field: 'display_order',
      defaultValue: 0,
    },
    status: {
      type: DataTypes.ENUM('Completed', 'In Progress', 'Active', 'Draft'),
      defaultValue: 'Completed',
    },
  },
  {
    sequelize,
    modelName: 'Project',
    tableName: 'projects',
    timestamps: true,
    underscored: true,
  }
)

module.exports = Project
