// EcoMargin — Admin Routes
// src/routes/adminRoutes.js
'use strict'
const express = require('express')
const router = express.Router()
const { protect, restrictTo } = require('../middleware/auth')

// Protect all admin routes
router.use(protect)
router.use(restrictTo('superadmin', 'admin'))

router.get('/dashboard', (req, res) => res.json({ success: true, message: 'admin dashboard stats', data: { totalRevenue: 45231, activeDrivers: 2350, activeChargers: 1204, energyDelivered: '45 MWh' } }))
router.get('/users', (req, res) => res.json({ success: true, message: 'admin users list', data: [] }))
router.get('/stations', (req, res) => res.json({ success: true, message: 'admin stations list', data: [] }))
router.get('/products', (req, res) => res.json({ success: true, message: 'admin products list', data: [] }))
router.get('/categories', (req, res) => res.json({ success: true, message: 'admin categories list', data: [] }))
router.get('/blogs', (req, res) => res.json({ success: true, message: 'admin blogs list', data: [] }))
router.get('/gallery', (req, res) => res.json({ success: true, message: 'admin gallery list', data: [] }))
router.get('/projects', (req, res) => res.json({ success: true, message: 'admin projects list', data: [] }))
router.get('/contact', (req, res) => res.json({ success: true, message: 'admin contact submissions', data: [] }))
router.get('/newsletter', (req, res) => res.json({ success: true, message: 'admin newsletter subscribers', data: [] }))
router.get('/settings', (req, res) => res.json({ success: true, message: 'admin settings', data: [] }))
router.get('/seo', (req, res) => res.json({ success: true, message: 'admin seo configs', data: [] }))
router.get('/media', (req, res) => res.json({ success: true, message: 'admin media files', data: [] }))

module.exports = router
