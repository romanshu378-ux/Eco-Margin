// EcoMargin — Sequelize Models Index
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
}
