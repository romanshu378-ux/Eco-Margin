// EcoMargin — Lead & RFQ Model (Sequelize)
// src/models/Lead.js

'use strict'

const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../config/database')

class Lead extends Model {}

Lead.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fullName: {
      type: DataTypes.STRING(255),
      field: 'full_name',
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    company: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    subject: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('New', 'In Progress', 'Replied', 'Closed'),
      defaultValue: 'New',
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Lead',
    tableName: 'leads',
    timestamps: true,
    underscored: true,
  }
)

module.exports = Lead
