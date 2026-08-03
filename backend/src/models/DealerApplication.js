// EcoMargin — Dealer Partner Application Model (Sequelize)
// src/models/DealerApplication.js

'use strict'

const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../config/database')

class DealerApplication extends Model {}

DealerApplication.init(
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
    companyName: {
      type: DataTypes.STRING(255),
      field: 'company_name',
      allowNull: true,
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
    city: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    experience: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    investmentCapacity: {
      type: DataTypes.STRING(100),
      field: 'investment_capacity',
      allowNull: true,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('New', 'In Review', 'Approved', 'Rejected'),
      defaultValue: 'New',
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'DealerApplication',
    tableName: 'dealer_applications',
    timestamps: true,
    underscored: true,
  }
)

module.exports = DealerApplication
