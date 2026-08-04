// EcoMargin Backend — Email Controller (Brevo REST API Edition)
// src/controllers/emailController.js
'use strict'

const { EmailLog } = require('../models')
const emailService = require('../services/emailService')

const verifyApiKey = (res) => {
  if (!process.env.BREVO_API_KEY) {
    res.status(500).json({
      success: false,
      message: 'Email sending failed',
      error: 'BREVO_API_KEY environment variable is missing.'
    })
    return false
  }
  return true
}

/**
 * POST /api/email/send
 * Generic custom email sender endpoint from Admin Panel
 */
exports.sendCustomEmail = async (req, res) => {
  if (!verifyApiKey(res)) return

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
      return res.status(500).json({
        success: false,
        message: 'Email sending failed',
        error: result.error || 'Failed to deliver email via Brevo REST API'
      })
    }

    return res.json({
      success: true,
      message: 'Email sent successfully'
    })
  } catch (err) {
    console.error('❌ Error sending custom email:', err)
    return res.status(500).json({
      success: false,
      message: 'Email sending failed',
      error: err.message
    })
  }
}

/**
 * POST /api/email/customer
 * Trigger customer confirmation email
 */
exports.sendCustomerEmail = async (req, res) => {
  if (!verifyApiKey(res)) return

  try {
    const { leadId, customerName, email, product, date } = req.body

    if (!email) {
      return res.status(400).json({ success: false, message: 'Customer email is required.' })
    }

    const result = await emailService.sendCustomerConfirmation({ leadId, customerName, email, product, date })
    
    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: 'Email sending failed',
        error: result.error || 'Failed to deliver customer confirmation email via Brevo'
      })
    }

    return res.json({
      success: true,
      message: 'Email sent successfully'
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Email sending failed',
      error: err.message
    })
  }
}

/**
 * POST /api/email/admin
 * Trigger admin sales notification email
 */
exports.sendAdminEmail = async (req, res) => {
  if (!verifyApiKey(res)) return

  try {
    const { leadId, name, company, phone, email, product, message, time } = req.body

    const result = await emailService.sendAdminNotification({ leadId, name, company, phone, email, product, message, time })
    
    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: 'Email sending failed',
        error: result.error || 'Failed to deliver admin notification email via Brevo'
      })
    }

    return res.json({
      success: true,
      message: 'Email sent successfully'
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Email sending failed',
      error: err.message
    })
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
