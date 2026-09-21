// EcoMargin Backend — Project Routes
// src/routes/projectRoutes.js

'use strict'

const express = require('express')
const router = express.Router()
const { protect, restrictTo } = require('../middleware/auth')

router.get('/', projectController.getAllProjects)
router.get('/:id', projectController.getProjectById)
router.post('/', protect, restrictTo('superadmin', 'admin', 'sales_rep'), projectController.createProject)
router.put('/:id', protect, restrictTo('superadmin', 'admin', 'sales_rep'), projectController.updateProject)
router.delete('/:id', protect, restrictTo('superadmin', 'admin', 'sales_rep'), projectController.deleteProject)

module.exports = router
