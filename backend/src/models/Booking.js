// EcoMargin — Booking Model (Sequelize)
// src/models/Booking.js
'use strict'

const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../config/database')

class Booking extends Model {}

Booking.init(
  {
    id:           { type: DataTypes.UUID,    defaultValue: DataTypes.UUIDV4, primaryKey: true },
    booking_ref:  { type: DataTypes.STRING(20), unique: true, comment: 'e.g. ECO-20240701-0001' },
    user_id:      { type: DataTypes.UUID,    allowNull: false },
    station_id:   { type: DataTypes.UUID,    allowNull: false },
    start_time:   { type: DataTypes.DATE,    allowNull: false },
    end_time:     { type: DataTypes.DATE,    allowNull: false },
    duration_minutes: { type: DataTypes.INTEGER, allowNull: false },
    charger_type: { type: DataTypes.ENUM('AC', 'DC', 'FAST') },
    units_consumed: { type: DataTypes.DECIMAL(8, 3), allowNull: true, comment: 'kWh' },
    amount:       { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    discount:     { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
    tax:          { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
    total_amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    status:       {
      type: DataTypes.ENUM('pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show'),
      defaultValue: 'pending',
    },
    payment_status: {
      type: DataTypes.ENUM('pending', 'paid', 'refunded', 'failed'),
      defaultValue: 'pending',
    },
    cancellation_reason: { type: DataTypes.TEXT, allowNull: true },
    notes:        { type: DataTypes.TEXT, allowNull: true },
  },
  {
    sequelize,
    modelName: 'Booking',
    tableName: 'bookings',
  },
)

module.exports = Booking
