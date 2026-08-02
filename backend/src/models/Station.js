// EcoMargin — Station Model (Sequelize)
// src/models/Station.js
'use strict'

const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../config/database')

class Station extends Model {}

Station.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name:         { type: DataTypes.STRING(200), allowNull: false },
    description:  { type: DataTypes.TEXT, allowNull: true },
    address:      { type: DataTypes.STRING(500), allowNull: false },
    city:         { type: DataTypes.STRING(100), allowNull: false },
    state:        { type: DataTypes.STRING(100), allowNull: false },
    pincode:      { type: DataTypes.STRING(10),  allowNull: false },
    country:      { type: DataTypes.STRING(50),  defaultValue: 'India' },
    latitude:     { type: DataTypes.DECIMAL(10, 8), allowNull: false },
    longitude:    { type: DataTypes.DECIMAL(11, 8), allowNull: false },
    charger_type: { type: DataTypes.ENUM('AC', 'DC', 'FAST'), allowNull: false },
    charger_count:{ type: DataTypes.INTEGER, defaultValue: 1 },
    power_output: { type: DataTypes.DECIMAL(6, 2), comment: 'in kW' },
    price_per_unit:{ type: DataTypes.DECIMAL(8, 2), allowNull: false, comment: 'per kWh' },
    status:       { type: DataTypes.ENUM('active', 'inactive', 'maintenance'), defaultValue: 'active' },
    availability: { type: DataTypes.ENUM('available', 'occupied', 'offline'),  defaultValue: 'available' },
    amenities:    { type: DataTypes.JSON, allowNull: true, comment: 'e.g. ["WiFi", "Parking", "Cafe"]' },
    images:       { type: DataTypes.JSON, allowNull: true },
    rating:       { type: DataTypes.DECIMAL(2, 1), defaultValue: 0 },
    total_reviews:{ type: DataTypes.INTEGER, defaultValue: 0 },
    operator_id:  { type: DataTypes.UUID, allowNull: true, comment: 'FK → users.id' },
  },
  {
    sequelize,
    modelName: 'Station',
    tableName: 'stations',
  },
)

module.exports = Station
