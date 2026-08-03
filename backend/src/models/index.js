// EcoMargin — Sequelize Models Index & Association Registry
// src/models/index.js
'use strict'

const User = require('./User')
const Station = require('./Station')
const Booking = require('./Booking')
const Payment = require('./Payment')
const Review = require('./Review')
const Homepage = require('./Homepage')
const About = require('./About')
const Manufacturing = require('./Manufacturing')
const Footer = require('./Footer')
const SEO = require('./SEO')
const Download = require('./Download')
const Category = require('./Category')
const Industry = require('./Industry')
const Project = require('./Project')
const Gallery = require('./Gallery')
const Blog = require('./Blog')
const Lead = require('./Lead')
const DealerApplication = require('./DealerApplication')
const Newsletter = require('./Newsletter')
const ActivityLog = require('./ActivityLog')

// Define Non-Circular Model Associations
User.hasMany(Station, { foreignKey: 'operator_id', as: 'operatedStations', onDelete: 'SET NULL', onUpdate: 'CASCADE' })
Station.belongsTo(User, { foreignKey: 'operator_id', as: 'operator', onDelete: 'SET NULL', onUpdate: 'CASCADE' })

User.hasMany(Booking, { foreignKey: 'user_id', as: 'bookings', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
Booking.belongsTo(User, { foreignKey: 'user_id', as: 'user', onDelete: 'CASCADE', onUpdate: 'CASCADE' })

Station.hasMany(Booking, { foreignKey: 'station_id', as: 'bookings', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
Booking.belongsTo(Station, { foreignKey: 'station_id', as: 'station', onDelete: 'CASCADE', onUpdate: 'CASCADE' })

Booking.hasOne(Payment, { foreignKey: 'booking_id', as: 'payment', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
Payment.belongsTo(Booking, { foreignKey: 'booking_id', as: 'booking', onDelete: 'CASCADE', onUpdate: 'CASCADE' })

User.hasMany(Payment, { foreignKey: 'user_id', as: 'payments', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
Payment.belongsTo(User, { foreignKey: 'user_id', as: 'user', onDelete: 'CASCADE', onUpdate: 'CASCADE' })

User.hasMany(Review, { foreignKey: 'user_id', as: 'reviews', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
Review.belongsTo(User, { foreignKey: 'user_id', as: 'user', onDelete: 'CASCADE', onUpdate: 'CASCADE' })

Station.hasMany(Review, { foreignKey: 'station_id', as: 'reviews', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
Review.belongsTo(Station, { foreignKey: 'station_id', as: 'station', onDelete: 'CASCADE', onUpdate: 'CASCADE' })

module.exports = {
  User,
  Station,
  Booking,
  Payment,
  Review,
  Homepage,
  About,
  Manufacturing,
  Footer,
  SEO,
  Download,
  Category,
  Industry,
  Project,
  Gallery,
  Blog,
  Lead,
  DealerApplication,
  Newsletter,
  ActivityLog,
}
