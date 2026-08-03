// EcoMargin Backend — Industry Routes
// src/routes/industryRoutes.js

'use strict'

const express = require('express')
const router = express.Router()
const industryController = require('../controllers/industryController')

router.get('/', industryController.getAllIndustries)
router.get('/:id', industryController.getIndustryById)
router.post('/', industryController.createIndustry)
router.put('/:id', industryController.updateIndustry)
router.delete('/:id', industryController.deleteIndustry)

module.exports = router
