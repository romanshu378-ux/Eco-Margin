// EcoMargin Backend — Website Setting Routes
// src/routes/settingRoutes.js

'use strict'

const express = require('express')
const router = express.Router()
const settingController = require('../controllers/settingController')
const { protect, restrictTo } = require('../middleware/auth')

router.use(protect)
router.use(restrictTo('superadmin', 'admin'))

router.get('/', settingController.getAllSettings)
router.get('/:id', settingController.getSettingById)
router.post('/', settingController.createSetting)
router.put('/:id', settingController.updateSetting)
router.delete('/:id', settingController.deleteSetting)

module.exports = router
