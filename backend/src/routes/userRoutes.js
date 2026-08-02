// EcoMargin — User Routes
// src/routes/userRoutes.js
'use strict'
const express = require('express')
const router  = express.Router()

router.get('/profile',         (req, res) => res.json({ message: 'get profile — coming soon' }))
router.put('/profile',         (req, res) => res.json({ message: 'update profile — coming soon' }))
router.patch('/change-password',(req, res) => res.json({ message: 'change password — coming soon' }))
router.delete('/account',      (req, res) => res.json({ message: 'delete account — coming soon' }))

module.exports = router
