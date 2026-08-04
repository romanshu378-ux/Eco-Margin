// EcoMargin — LeadNote Model (Sequelize)
// src/models/LeadNote.js
'use strict'

const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/database')

class LeadNote extends Model {}

LeadNote.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    lead_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    priority: {
      type: DataTypes.ENUM('Low', 'Medium', 'High', 'Urgent'),
      allowNull: false,
      defaultValue: 'Medium',
    },
    reminder_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'Pending', // Pending, Completed
    },
    created_by: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: 'Admin',
    },
  },
  {
    sequelize,
    modelName: 'LeadNote',
    tableName: 'lead_notes',
    timestamps: true,
    underscored: true,
    indexes: [
      { fields: ['lead_id'] },
      { fields: ['priority'] },
    ],
  }
)

module.exports = LeadNote
