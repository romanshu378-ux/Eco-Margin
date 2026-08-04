// EcoMargin — Activity Log Model (Sequelize)
// src/models/ActivityLog.js

'use strict'

const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../config/database')

class ActivityLog extends Model {}

ActivityLog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    action: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('Enquiry', 'RFQ', 'Dealer', 'Newsletter', 'CMS', 'Product', 'Blog', 'System'),
      defaultValue: 'Enquiry',
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    ipAddress: {
      type: DataTypes.STRING(50),
      field: 'ip_address',
      allowNull: true,
    },
    lead_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    performed_by: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: 'System',
    },
  },
  {
    sequelize,
    modelName: 'ActivityLog',
    tableName: 'activity_logs',
    timestamps: true,
    underscored: true,
  }
)

/**
 * Helper method to log system activity
 */
ActivityLog.log = async function ({ action, type = 'System', description = '', ipAddress = '' }) {
  try {
    return await ActivityLog.create({ action, type, description, ipAddress })
  } catch (err) {
    console.warn('⚠️ Could not record ActivityLog:', err.message)
  }
}

module.exports = ActivityLog
