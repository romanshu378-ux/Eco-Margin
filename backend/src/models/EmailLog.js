// EcoMargin — EmailLog Model (Sequelize)
// src/models/EmailLog.js
'use strict'

const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../config/database')

class EmailLog extends Model {}

EmailLog.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    lead_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    recipient: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    subject: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT('long'),
      allowNull: true,
    },
    email_type: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: 'Custom', // CustomerConfirmation, AdminNotification, QuotationEmail, Custom
    },
    status: {
      type: DataTypes.ENUM('Sent', 'Failed', 'Pending'),
      allowNull: false,
      defaultValue: 'Sent',
    },
    error_message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    attachments: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    sent_by: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: 'System',
    },
    sent_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'EmailLog',
    tableName: 'email_logs',
    timestamps: true,
    underscored: true,
    indexes: [
      { fields: ['lead_id'] },
      { fields: ['recipient'] },
      { fields: ['status'] },
    ],
  }
)

module.exports = EmailLog
