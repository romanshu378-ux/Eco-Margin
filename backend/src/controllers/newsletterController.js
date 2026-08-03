// EcoMargin Backend — Newsletter Subscriber Controller
// src/controllers/newsletterController.js

'use strict'

const { Newsletter, ActivityLog } = require('../models')
const { Op } = require('sequelize')
const logger = require('../config/logger')

const setNoCache = (res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')
}

/**
 * GET /api/v1/newsletters
 */
exports.getAllSubscribers = async (req, res) => {
  setNoCache(res)
  try {
    const { search } = req.query
    const whereClause = {}

    if (search && search.trim() !== '') {
      whereClause.email = { [Op.like]: `%${search.trim().toLowerCase()}%` }
    }

    const subscribers = await Newsletter.findAll({
      where: whereClause,
      order: [['createdAt', 'DESC']]
    })

    return res.status(200).json({ success: true, data: subscribers })
  } catch (error) {
    logger.error('❌ [Get Newsletter Subscribers Error]:', error)
    return res.status(500).json({ success: false, message: error.message })
  }
}

/**
 * POST /api/v1/newsletters (or /public/newsletter)
 */
exports.subscribeNewsletter = async (req, res) => {
  setNoCache(res)
  const { email } = req.body

  if (!email || !email.includes('@')) {
    return res.status(400).json({ success: false, message: 'A valid email address is required.' })
  }

  try {
    const cleanEmail = email.trim().toLowerCase()
    const [subscriber, created] = await Newsletter.findOrCreate({
      where: { email: cleanEmail },
      defaults: { status: 'Subscribed' }
    })

    if (!created && subscriber.status === 'Unsubscribed') {
      subscriber.status = 'Subscribed'
      await subscriber.save()
    }

    ActivityLog.log({
      action: 'Newsletter Subscription',
      type: 'Newsletter',
      description: `New subscriber: ${cleanEmail}`,
      ipAddress: req.ip
    })

    return res.status(201).json({
      success: true,
      message: 'Thank you for subscribing to EcoMargin EV whitepapers & newsletters!'
    })
  } catch (error) {
    logger.error('❌ [Subscribe Newsletter Error]:', error)
    return res.status(500).json({ success: false, message: error.message })
  }
}

/**
 * DELETE /api/v1/newsletters/:id
 */
exports.deleteSubscriber = async (req, res) => {
  setNoCache(res)
  try {
    const sub = await Newsletter.findByPk(req.params.id)
    if (!sub) return res.status(404).json({ success: false, message: 'Subscriber not found' })

    await sub.destroy()
    return res.status(200).json({ success: true, message: 'Subscriber removed successfully' })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

/**
 * POST /api/v1/newsletters/bulk-delete
 */
exports.bulkDeleteSubscribers = async (req, res) => {
  setNoCache(res)
  const { ids } = req.body
  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ success: false, message: 'No subscriber IDs provided' })
  }

  try {
    await Newsletter.destroy({ where: { id: ids } })
    return res.status(200).json({ success: true, message: `Deleted ${ids.length} subscribers` })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}
