// EcoMargin Backend — Admin Downloads Routes
// src/routes/downloadsRoutes.js

'use strict'

const express = require('express')
const router = express.Router()
const { protect, restrictTo } = require('../middleware/auth')

router.get('/', downloadsController.getAllDownloads)
router.get('/:id', downloadsController.getDownloadById)
router.post('/', protect, restrictTo('superadmin', 'admin', 'sales_rep'), downloadsController.createDownload)
router.put('/:id', protect, restrictTo('superadmin', 'admin', 'sales_rep'), downloadsController.updateDownload)
router.delete('/:id', protect, restrictTo('superadmin', 'admin', 'sales_rep'), downloadsController.deleteDownload)

module.exports = router
