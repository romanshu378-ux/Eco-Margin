// EcoMargin Backend — Admin Downloads Routes
// src/routes/downloadsRoutes.js

'use strict'

const express = require('express')
const router = express.Router()
const downloadsController = require('../controllers/downloadsController')

router.get('/', downloadsController.getAllDownloads)
router.get('/:id', downloadsController.getDownloadById)
router.post('/', downloadsController.createDownload)
router.put('/:id', downloadsController.updateDownload)
router.delete('/:id', downloadsController.deleteDownload)

module.exports = router
