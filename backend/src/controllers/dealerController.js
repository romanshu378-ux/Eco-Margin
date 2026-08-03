// EcoMargin Backend — Dealer Partner Application Controller
// src/controllers/dealerController.js

'use strict'

const { DealerApplication, ActivityLog } = require('../models')
const { Op } = require('sequelize')
const { sendEmail } = require('../config/email')
const logger = require('../config/logger')

const setNoCache = (res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')
}

/**
 * GET /api/v1/dealer-applications
 */
exports.getAllDealers = async (req, res) => {
  setNoCache(res)
  try {
    const { search, status } = req.query
    const whereClause = {}

    if (search && search.trim() !== '') {
      const q = `%${search.trim().toLowerCase()}%`
      whereClause[Op.or] = [
        { fullName: { [Op.like]: q } },
        { companyName: { [Op.like]: q } },
        { email: { [Op.like]: q } },
        { city: { [Op.like]: q } }
      ]
    }

    if (status && status !== 'All') {
      whereClause.status = status
    }

    const dealers = await DealerApplication.findAll({
      where: whereClause,
      order: [['createdAt', 'DESC']]
    })

    return res.status(200).json({
      success: true,
      data: dealers
    })
  } catch (error) {
    logger.error('❌ [Get Dealers Error]:', error)
    return res.status(500).json({ success: false, message: error.message })
  }
}

/**
 * GET /api/v1/dealer-applications/:id
 */
exports.getDealerById = async (req, res) => {
  setNoCache(res)
  try {
    const dealer = await DealerApplication.findByPk(req.params.id)
    if (!dealer) return res.status(404).json({ success: false, message: 'Dealer application not found' })
    return res.status(200).json({ success: true, data: dealer })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

/**
 * POST /api/v1/dealer-applications (or /public/dealer-apply)
 */
exports.createDealer = async (req, res) => {
  setNoCache(res)
  const { fullName, name, companyName, company, email, phone, city, state, experience, investmentCapacity, message } = req.body

  const finalName = fullName || name
  const finalCompany = companyName || company || ''

  if (!finalName || !email || !phone) {
    return res.status(400).json({ success: false, message: 'Full Name, Email, and Phone number are required fields.' })
  }

  try {
    const dealer = await DealerApplication.create({
      fullName: finalName.trim(),
      companyName: finalCompany.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      city: city ? city.trim() : '',
      state: state ? state.trim() : '',
      experience: experience ? experience.trim() : '',
      investmentCapacity: investmentCapacity ? investmentCapacity.trim() : '',
      message: message ? message.trim() : '',
      status: 'New',
      notes: 'Submitted via Web Dealer Partner Portal'
    })

    // Log Activity
    ActivityLog.log({
      action: 'Dealer Application Received',
      type: 'Dealer',
      description: `New application from ${finalName} (${finalCompany || city || 'Individual'})`,
      ipAddress: req.ip
    })

    // Admin Notification Email
    const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER || 'sales@ecomargin.com'
    sendEmail({
      to: adminEmail,
      subject: `🤝 New Dealer Partner Application: ${finalName} (${city || 'India'})`,
      html: `
        <h2>New Dealer Partnership Application</h2>
        <p><strong>Name:</strong> ${finalName}</p>
        <p><strong>Company:</strong> ${finalCompany || 'N/A'}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Location:</strong> ${city || ''}, ${state || ''}</p>
        <p><strong>Experience:</strong> ${experience || 'N/A'}</p>
        <p><strong>Investment Capacity:</strong> ${investmentCapacity || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <blockquote>${message || 'No additional notes provided.'}</blockquote>
      `,
      text: `New Dealer Application: ${finalName} - ${email} - ${phone}`
    }).catch(() => {})

    return res.status(201).json({
      success: true,
      message: 'Your dealer partner application has been submitted! An EcoMargin regional manager will contact you within 24 hours.',
      data: dealer
    })
  } catch (error) {
    logger.error('❌ [Create Dealer Error]:', error)
    return res.status(500).json({ success: false, message: error.message })
  }
}

/**
 * PUT /api/v1/dealer-applications/:id
 */
exports.updateDealer = async (req, res) => {
  setNoCache(res)
  const { id } = req.params
  try {
    const dealer = await DealerApplication.findByPk(id)
    if (!dealer) return res.status(404).json({ success: false, message: 'Dealer application not found' })

    Object.assign(dealer, req.body)
    await dealer.save()

    ActivityLog.log({
      action: 'Dealer Application Updated',
      type: 'Dealer',
      description: `Updated application for ${dealer.fullName}`,
      ipAddress: req.ip
    })

    return res.status(200).json({ success: true, message: 'Dealer application updated successfully', data: dealer })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

/**
 * PATCH /api/v1/dealer-applications/:id/status
 */
exports.updateDealerStatus = async (req, res) => {
  setNoCache(res)
  const { id } = req.params
  const { status } = req.body

  const valid = ['New', 'In Review', 'Approved', 'Rejected']
  if (!status || !valid.includes(status)) {
    return res.status(400).json({ success: false, message: `Invalid status. Allowed: ${valid.join(', ')}` })
  }

  try {
    const dealer = await DealerApplication.findByPk(id)
    if (!dealer) return res.status(404).json({ success: false, message: 'Dealer application not found' })

    dealer.status = status
    await dealer.save()

    ActivityLog.log({
      action: 'Dealer Status Changed',
      type: 'Dealer',
      description: `Changed status for ${dealer.fullName} to "${status}"`,
      ipAddress: req.ip
    })

    return res.status(200).json({ success: true, message: `Status updated to "${status}"`, data: dealer })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

/**
 * DELETE /api/v1/dealer-applications/:id
 */
exports.deleteDealer = async (req, res) => {
  setNoCache(res)
  try {
    const dealer = await DealerApplication.findByPk(req.params.id)
    if (!dealer) return res.status(404).json({ success: false, message: 'Dealer application not found' })

    await dealer.destroy()
    return res.status(200).json({ success: true, message: 'Dealer application deleted successfully' })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

/**
 * POST /api/v1/dealer-applications/bulk-delete
 */
exports.bulkDeleteDealers = async (req, res) => {
  setNoCache(res)
  const { ids } = req.body
  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ success: false, message: 'No IDs provided for bulk deletion' })
  }

  try {
    await DealerApplication.destroy({ where: { id: ids } })
    return res.status(200).json({ success: true, message: `Deleted ${ids.length} dealer applications` })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}
