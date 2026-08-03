// EcoMargin — Category Model (Sequelize)
// src/models/Category.js
'use strict'

const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../config/database')

class Category extends Model {}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    slug: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
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
    modelName: 'Category',
    tableName: 'product_categories',
    timestamps: true,
    underscored: true,
  }
)

module.exports = Category
