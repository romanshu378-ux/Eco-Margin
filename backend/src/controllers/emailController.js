// EcoMargin Backend — Email Controller
// src/controllers/emailController.js
'use strict'

const { EmailLog, Lead } = require('../models')
const emailService = require('../services/emailService')

/**
 * POST /api/email/send
 * Generic custom email sender endpoint from Admin Panel
 */
exports.sendCustomEmail = async (req, res) => {
  try {
    const { leadId, to, cc, bcc, subject, body, sentBy } = req.body

    if (!to || !subject || !body) {
      return res.status(400).json({ success: false, message: 'Recipient (to), subject, and body are required.' })
    }

    const result = await emailService.sendCustomEmail({
      leadId,
      to,
      cc,
      bcc,
      subject,
      body,
      sentBy: sentBy || req.user?.email || 'Sales Admin'
    })

    if (!result.success) {
      return res.status(500).json({ success: false, message: result.error || 'Failed to deliver email via SMTP' })
    }

    return res.json({ success: true, message: 'Email sent successfully via Nodemailer SMTP.', data: result })
  } catch (err) {
    console.error('❌ Error sending custom email:', err)
    return res.status(500).json({ success: false, message: err.message })
  }
}

/**
 * POST /api/email/customer
 * Trigger customer confirmation email
 */
exports.sendCustomerEmail = async (req, res) => {
  try {
    const { leadId, customerName, email, product, date } = req.body

    if (!email) {
      return res.status(400).json({ success: false, message: 'Customer email is required.' })
    }

    const result = await emailService.sendCustomerConfirmation({ leadId, customerName, email, product, date })
    return res.json({ success: true, data: result })
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message })
  }
}

/**
 * POST /api/email/admin
 * Trigger admin sales notification email
 */
exports.sendAdminEmail = async (req, res) => {
  try {
    const { leadId, name, company, phone, email, product, message, time } = req.body

    const result = await emailService.sendAdminNotification({ leadId, name, company, phone, email, product, message, time })
    return res.json({ success: true, data: result })
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message })
  }
}

/**
 * GET /api/email/history/:leadId
 * Fetch all email logs for a specific lead enquiry
 */
exports.getEmailHistoryByLead = async (req, res) => {
  try {
    const { leadId } = req.params

    const logs = await EmailLog.findAll({
      where: { lead_id: leadId },
      order: [['sent_at', 'DESC']]
    })

    return res.json({ success: true, data: logs })
  } catch (err) {
    console.error('❌ Error fetching email logs:', err)
    return res.status(500).json({ success: false, message: err.message })
  }
}

/**
 * GET /api/email/history
 * Fetch all email logs across system
 */
exports.getAllEmailLogs = async (req, res) => {
  try {
    const logs = await EmailLog.findAll({
      order: [['sent_at', 'DESC']],
      limit: 100
    })

    return res.json({ success: true, data: logs })
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message })
  }
}
