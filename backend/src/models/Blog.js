// EcoMargin — Blog Model (Sequelize)
// src/models/Blog.js
'use strict'

const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../config/database')

class Blog extends Model {}

Blog.init(
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
    slug: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    author: {
      type: DataTypes.STRING(100),
      defaultValue: 'EcoMargin Team',
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    content: {
      type: DataTypes.TEXT('long'),
      allowNull: true,
    },
    coverImage: {
      type: DataTypes.STRING(500),
      field: 'cover_image',
      allowNull: true,
    },
    displayOrder: {
      type: DataTypes.INTEGER,
      field: 'display_order',
      defaultValue: 0,
    },
    status: {
      type: DataTypes.ENUM('Published', 'Draft'),
      defaultValue: 'Published',
    },
  },
  {
    sequelize,
    modelName: 'Blog',
    tableName: 'blogs',
    timestamps: true,
    underscored: true,
  }
)

module.exports = Blog
