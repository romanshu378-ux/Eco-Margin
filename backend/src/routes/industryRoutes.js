// EcoMargin Backend — Industry Routes
// src/routes/industryRoutes.js

'use strict'

const express = require('express')
const router = express.Router()
const { protect, restrictTo } = require('../middleware/auth')

router.get('/', industryController.getAllIndustries)
router.get('/:id', industryController.getIndustryById)
router.post('/', protect, restrictTo('superadmin', 'admin', 'sales_rep'), industryController.createIndustry)
router.put('/:id', protect, restrictTo('superadmin', 'admin', 'sales_rep'), industryController.updateIndustry)
router.delete('/:id', protect, restrictTo('superadmin', 'admin', 'sales_rep'), industryController.deleteIndustry)

module.exports = router
