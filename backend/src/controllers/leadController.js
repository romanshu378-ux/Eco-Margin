// EcoMargin Backend — Lead & RFQ Management Controller
// src/controllers/leadController.js

'use strict'

const { Lead } = require('../models')
const { Op } = require('sequelize')
const { sendEmail } = require('../config/email')
const logger = require('../config/logger')

const setNoCache = (res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')
}

/**
 * GET /api/v1/leads
 * Fetch all leads with search, status filtering, date filtering, and dashboard stats
 */
exports.getAllLeads = async (req, res) => {
  setNoCache(res)
  try {
    const { search, status, dateRange } = req.query
    const whereClause = {}

    // 1. Search Filter (fullName, email, company, subject)
    if (search && search.trim() !== '') {
      const q = `%${search.trim().toLowerCase()}%`
      whereClause[Op.or] = [
        { fullName: { [Op.like]: q } },
        { email: { [Op.like]: q } },
        { company: { [Op.like]: q } },
        { subject: { [Op.like]: q } }
      ]
    }

    // 2. Status Filter
    if (status && status !== 'All') {
      whereClause.status = status
    }

    // 3. Date Filter
    if (dateRange && dateRange !== 'all') {
      const now = new Date()
      let startDate = new Date()

      if (dateRange === 'today') {
        startDate.setHours(0, 0, 0, 0)
      } else if (dateRange === 'week') {
        startDate.setDate(now.getDate() - 7)
      } else if (dateRange === 'month') {
        startDate.setMonth(now.getMonth() - 1)
      }

      whereClause.createdAt = {
        [Op.gte]: startDate
      }
    }

    // Fetch leads ordered newest first
    const leads = await Lead.findAll({
      where: whereClause,
      order: [['createdAt', 'DESC']]
    })

    // Compute Dashboard Metrics
    const todayStart = new Date()
    todayStart.setHours(0, 0, 0, 0)

    const totalLeads = await Lead.count()
    const newLeads = await Lead.count({ where: { status: 'New' } })
    const todayLeads = await Lead.count({ where: { createdAt: { [Op.gte]: todayStart } } })
    const closedLeads = await Lead.count({ where: { status: 'Closed' } })

    return res.status(200).json({
      success: true,
      message: 'Leads retrieved successfully',
      data: leads,
      stats: {
        totalLeads,
        newLeads,
        todayLeads,
        closedLeads
      }
    })
  } catch (error) {
    logger.error('❌ [Leads Fetch Error]:', error)
    return res.status(500).json({ success: false, message: error.message || 'Failed to fetch leads' })
  }
}

/**
 * GET /api/v1/leads/:id
 * Get single lead by ID
 */
exports.getLeadById = async (req, res) => {
  setNoCache(res)
  try {
    const lead = await Lead.findByPk(req.params.id)
    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' })
    }
    return res.status(200).json({ success: true, data: lead })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

/**
 * POST /api/v1/leads
 * Public RFQ Lead / Contact Enquiry Submission
 */
exports.createLead = async (req, res) => {
  setNoCache(res)
  const { fullName, name, email, phone, company, subject, product_requirement, message, requirements } = req.body

  const finalName = fullName || name
  const finalSubject = subject || product_requirement || 'EV Charger RFQ Inquiry'
  const finalMessage = message || requirements || ''

  if (!finalName || !email || !phone) {
    return res.status(400).json({ success: false, message: 'Full Name, Email, and Phone number are required fields.' })
  }

  try {
    const newLead = await Lead.create({
      fullName: finalName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      company: company ? company.trim() : '',
      subject: finalSubject.trim(),
      message: finalMessage.trim(),
      status: 'New',
      notes: 'Submitted via Web RFQ Form'
    })

    logger.info(`✅ [Lead Created] ID ${newLead.id} for ${newLead.email}`)

    // Email Notification to Admin (non-blocking if SMTP not configured)
    const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER || 'sales@ecomargin.com'
    sendEmail({
      to: adminEmail,
      subject: `🚨 New EV Charger Lead: ${finalName} (${company || 'Individual'})`,
      html: `
        <h2>New RFQ Lead Received on EcoMargin</h2>
        <p><strong>Name:</strong> ${finalName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Company:</strong> ${company || 'N/A'}</p>
        <p><strong>Requirement / Subject:</strong> ${finalSubject}</p>
        <p><strong>Message:</strong></p>
        <blockquote style="background: #f4f4f4; padding: 10px; border-left: 3px solid #10b981;">${finalMessage || 'No detailed message provided.'}</blockquote>
        <p><a href="${process.env.ADMIN_URL || 'https://ecomargin-admin.vercel.app'}/contact" style="background:#10b981;color:#fff;padding:8px 16px;text-decoration:none;border-radius:4px;">View Lead in Admin Dashboard</a></p>
      `,
      text: `New Lead: ${finalName} - ${email} - ${phone} - ${company || ''}`
    }).catch(emailErr => {
      logger.warn(`⚠️ Could not send admin notification email: ${emailErr.message}`)
    })

    return res.status(201).json({
      success: true,
      message: 'Your inquiry has been submitted successfully! An EcoMargin manager will contact you shortly.',
      data: newLead
    })
  } catch (error) {
    logger.error('❌ [Create Lead Error]:', error)
    return res.status(500).json({ success: false, message: error.message || 'Failed to process inquiry' })
  }
}

/**
 * PUT /api/v1/leads/:id
 * Admin Edit Lead Details & Internal Notes
 */
exports.updateLead = async (req, res) => {
  setNoCache(res)
  const { id } = req.params
  const { fullName, email, phone, company, subject, message, status, notes } = req.body

  try {
    const lead = await Lead.findByPk(id)
    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' })
    }

    if (fullName !== undefined) lead.fullName = fullName
    if (email !== undefined) lead.email = email
    if (phone !== undefined) lead.phone = phone
    if (company !== undefined) lead.company = company
    if (subject !== undefined) lead.subject = subject
    if (message !== undefined) lead.message = message
    if (status !== undefined) lead.status = status
    if (notes !== undefined) lead.notes = notes

    await lead.save()
    logger.info(`✅ [Lead Updated] ID ${id}`)

    return res.status(200).json({
      success: true,
      message: 'Lead updated successfully',
      data: lead
    })
  } catch (error) {
    logger.error('❌ [Update Lead Error]:', error)
    return res.status(500).json({ success: false, message: error.message || 'Failed to update lead' })
  }
}

/**
 * PATCH /api/v1/leads/:id/status
 * Admin Instant Status Badge Change
 */
exports.updateLeadStatus = async (req, res) => {
  setNoCache(res)
  const { id } = req.params
  const { status } = req.body

  const validStatuses = ['New', 'In Progress', 'Replied', 'Closed']
  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({ success: false, message: `Invalid status. Allowed values: ${validStatuses.join(', ')}` })
  }

  try {
    const lead = await Lead.findByPk(id)
    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' })
    }

    lead.status = status
    await lead.save()
    logger.info(`✅ [Lead Status Changed] ID ${id} → ${status}`)

    return res.status(200).json({
      success: true,
      message: `Lead status updated to "${status}"`,
      data: lead
    })
  } catch (error) {
    logger.error('❌ [Update Lead Status Error]:', error)
    return res.status(500).json({ success: false, message: error.message || 'Failed to update status' })
  }
}

/**
 * DELETE /api/v1/leads/:id
 * Admin Delete Lead Permanently
 */
exports.deleteLead = async (req, res) => {
  setNoCache(res)
  const { id } = req.params
  try {
    const lead = await Lead.findByPk(id)
    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' })
    }
    await lead.destroy()
    logger.info(`🗑️ [Lead Deleted] ID ${id}`)

    return res.status(200).json({
      success: true,
      message: 'Lead deleted successfully'
    })
  } catch (error) {
    logger.error('❌ [Delete Lead Error]:', error)
    return res.status(500).json({ success: false, message: error.message || 'Failed to delete lead' })
  }
}
