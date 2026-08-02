// EcoMargin — Review Routes
// src/routes/reviewRoutes.js
'use strict'
const express = require('express')
const router  = express.Router()

router.get('/',       (req, res) => res.json({ message: 'get reviews — coming soon' }))
router.post('/',      (req, res) => res.json({ message: 'create review — coming soon' }))
router.put('/:id',    (req, res) => res.json({ message: `update review ${req.params.id} — coming soon` }))
router.delete('/:id', (req, res) => res.json({ message: `delete review ${req.params.id} — coming soon` }))

module.exports = router
