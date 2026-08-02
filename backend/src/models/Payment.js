// EcoMargin — Payment Model (Sequelize)
// src/models/Payment.js
'use strict'

const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../config/database')

class Payment extends Model {}

Payment.init(
  {
    id:            { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    booking_id:    { type: DataTypes.UUID, allowNull: false },
    user_id:       { type: DataTypes.UUID, allowNull: false },
    gateway:       { type: DataTypes.ENUM('razorpay', 'stripe', 'wallet'), allowNull: false },
    gateway_order_id:   { type: DataTypes.STRING(255), allowNull: true },
    gateway_payment_id: { type: DataTypes.STRING(255), allowNull: true },
    gateway_signature:  { type: DataTypes.STRING(500), allowNull: true },
    amount:        { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    currency:      { type: DataTypes.STRING(5), defaultValue: 'INR' },
    status:        {
      type: DataTypes.ENUM('created', 'attempted', 'paid', 'failed', 'refunded'),
      defaultValue: 'created',
    },
    refund_id:     { type: DataTypes.STRING(255), allowNull: true },
    refund_amount: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    refund_reason: { type: DataTypes.TEXT, allowNull: true },
    metadata:      { type: DataTypes.JSON, allowNull: true },
  },
  {
    sequelize,
    modelName: 'Payment',
    tableName: 'payments',
  },
)

module.exports = Payment
