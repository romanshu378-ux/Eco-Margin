// EcoMargin Backend — CRM Controller (Quotations, Notes, Timeline, Notifications)
// src/controllers/crmController.js
'use strict'

const { Quotation, LeadNote, ActivityLog, Notification, Lead, EmailLog } = require('../models')
const emailService = require('../services/emailService')

// ── 1. QUOTATION GENERATION & EMAILING ─────────────────────────────

/**
 * POST /api/admin/crm/quotations
 * Generate a new quotation
 */
exports.generateQuotation = async (req, res) => {
  try {
    const {
      leadId,
      customerName,
      customerEmail,
      customerCompany,
      productName,
      amount,
      gstAmount,
      installationCharges,
      totalAmount,
      validityDate,
      warrantyTerms,
      termsAndConditions,
      itemsJson
    } = req.body

    if (!leadId || !customerEmail || !productName) {
      return res.status(400).json({ success: false, message: 'leadId, customerEmail, and productName are required.' })
    }

    const count = await Quotation.count()
    const quotationNo = `EM-QT-${new Date().getFullYear()}-${String(count + 1001).padStart(4, '0')}`

    const quotation = await Quotation.create({
      lead_id: leadId,
      quotation_no: quotationNo,
      customer_name: customerName || 'Valued Client',
      customer_email: customerEmail,
      customer_company: customerCompany || '',
      product_name: productName,
      amount: parseFloat(amount || 0),
      gst_amount: parseFloat(gstAmount || (amount * 0.18)),
      installation_charges: parseFloat(installationCharges || 0),
      total_amount: parseFloat(totalAmount || (parseFloat(amount || 0) * 1.18 + parseFloat(installationCharges || 0))),
      status: 'Generated',
      validity_date: validityDate || null,
      warranty_terms: warrantyTerms || '2 Years Standard Comprehensive Manufacturer Warranty.',
      terms_and_conditions: termsAndConditions || 'Payment: 50% Advance along with Purchase Order, 50% prior to dispatch. Delivery: 2-3 Weeks from PO date.',
      items_json: typeof itemsJson === 'string' ? itemsJson : JSON.stringify(itemsJson || []),
      created_by: req.user?.email || 'Sales Manager'
    })

    // Log Activity
    await ActivityLog.create({
      lead_id: leadId,
      action: 'Quotation Generated',
      type: 'RFQ',
      description: `Quotation ${quotationNo} generated for total amount ₹${quotation.total_amount}`,
      performed_by: req.user?.email || 'Sales Admin'
    })

    // Auto-update lead status to "Quotation Sent" if lead exists
    await Lead.update({ status: 'Quotation Sent' }, { where: { id: leadId } })

    return res.status(201).json({ success: true, message: `Quotation ${quotationNo} created!`, data: quotation })
  } catch (err) {
    console.error('❌ Error generating quotation:', err)
    return res.status(500).json({ success: false, message: err.message })
  }
}

/**
 * GET /api/admin/crm/quotations/lead/:leadId
 * Get all quotations for a lead
 */
exports.getQuotationsByLead = async (req, res) => {
  try {
    const { leadId } = req.params
    const quotations = await Quotation.findAll({
      where: { lead_id: leadId },
      order: [['created_at', 'DESC']]
    })
    return res.json({ success: true, data: quotations })
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message })
  }
}

/**
 * POST /api/admin/crm/quotations/:id/email
 * Email PDF Quotation to Customer
 */
exports.emailQuotation = async (req, res) => {
  try {
    const { id } = req.params
    const quotation = await Quotation.findByPk(id)
    if (!quotation) {
      return res.status(404).json({ success: false, message: 'Quotation not found' })
    }

    const htmlBody = `
      <div style="font-family: sans-serif; background-color: #0f172a; color: #f8fafc; padding: 25px; border-radius: 8px;">
        <h2 style="color: #10b981;">Commercial Quotation #${quotation.quotation_no}</h2>
        <p>Dear ${quotation.customer_name},</p>
        <p>Please find details of your official EV Charging Infrastructure quotation from EcoMargin LLP.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 15px 0; background: #1e293b; padding: 15px; border-radius: 6px;">
          <tr><td style="padding: 8px; color: #94a3b8;">Product Model:</td><td style="font-weight: 700; color: #ffffff;">${quotation.product_name}</td></tr>
          <tr><td style="padding: 8px; color: #94a3b8;">Quotation Number:</td><td style="color: #10b981; font-weight: 700;">${quotation.quotation_no}</td></tr>
          <tr><td style="padding: 8px; color: #94a3b8;">Base Price:</td><td>₹${quotation.amount}</td></tr>
          <tr><td style="padding: 8px; color: #94a3b8;">GST (18%):</td><td>₹${quotation.gst_amount}</td></tr>
          <tr><td style="padding: 8px; color: #94a3b8;">Installation & Commissioning:</td><td>₹${quotation.installation_charges}</td></tr>
          <tr style="border-top: 1px solid #334155;"><td style="padding: 8px; font-weight: 700; color: #ffffff;">Total Payable Amount:</td><td style="font-size: 18px; font-weight: 800; color: #10b981;">₹${quotation.total_amount}</td></tr>
        </table>

        <p><strong>Warranty:</strong> ${quotation.warranty_terms}</p>
        <p><strong>Terms:</strong> ${quotation.terms_and_conditions}</p>
        
        <div style="margin-top: 20px;">
          <a href="${process.env.SITE_URL}/contact" style="background: #10b981; color: #0f172a; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: 700;">Accept Quotation / Contact Factory</a>
        </div>
      </div>
    `

    const result = await emailService.sendCustomEmail({
      leadId: quotation.lead_id,
      to: quotation.customer_email,
      subject: `Official EV Charger Quotation #${quotation.quotation_no} - EcoMargin LLP`,
      body: htmlBody,
      sentBy: req.user?.email || 'Sales Admin'
    })

    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: 'Email sending failed',
        error: result.error || 'Failed to deliver quotation email via Brevo'
      })
    }

    await quotation.update({ status: 'Sent' })
    return res.json({ success: true, message: 'Email sent successfully' })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Email sending failed',
      error: err.message
    })
  }
}

// ── 2. FOLLOW-UP NOTES & TIMELINE ─────────────────────────────────

/**
 * POST /api/admin/crm/notes
 * Add follow-up note for a lead
 */
exports.addLeadNote = async (req, res) => {
  try {
    const { leadId, title, note, priority, reminderDate } = req.body

    if (!leadId || !title || !note) {
      return res.status(400).json({ success: false, message: 'leadId, title, and note content are required.' })
    }

    const newNote = await LeadNote.create({
      lead_id: leadId,
      title,
      note,
      priority: priority || 'Medium',
      reminder_date: reminderDate || null,
      created_by: req.user?.email || 'Sales Admin'
    })

    // Log Activity
    await ActivityLog.create({
      lead_id: leadId,
      action: 'Admin Note Added',
      type: 'Enquiry',
      description: `Note "${title}" added (${priority} Priority)`,
      performed_by: req.user?.email || 'Sales Admin'
    })

    return res.status(201).json({ success: true, message: 'Follow-up note added!', data: newNote })
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message })
  }
}

/**
 * GET /api/admin/crm/notes/lead/:leadId
 * Fetch all notes for a lead
 */
exports.getLeadNotes = async (req, res) => {
  try {
    const { leadId } = req.params
    const notes = await LeadNote.findAll({
      where: { lead_id: leadId },
      order: [['created_at', 'DESC']]
    })
    return res.json({ success: true, data: notes })
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message })
  }
}

// ── 3. ACTIVITY TIMELINE ──────────────────────────────────────────

/**
 * GET /api/admin/crm/timeline/lead/:leadId
 * Fetch unified activity timeline (Status updates, Emails, Quotes, Notes, User actions)
 */
exports.getLeadTimeline = async (req, res) => {
  try {
    const { leadId } = req.params

    const activities = await ActivityLog.findAll({
      where: { lead_id: leadId },
      order: [['created_at', 'DESC']]
    })

    return res.json({ success: true, data: activities })
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message })
  }
}

// ── 4. NOTIFICATIONS SYSTEM ──────────────────────────────────────

/**
 * GET /api/admin/crm/notifications
 * Fetch unread notifications for admin header bell
 */
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll({
      order: [['created_at', 'DESC']],
      limit: 30
    })

    const unreadCount = notifications.filter(n => !n.is_read).length

    return res.json({ success: true, unreadCount, data: notifications })
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message })
  }
}

/**
 * PUT /api/admin/crm/notifications/:id/read
 * Mark notification as read
 */
exports.markNotificationRead = async (req, res) => {
  try {
    const { id } = req.params
    await Notification.update({ is_read: true }, { where: { id } })
    return res.json({ success: true, message: 'Notification marked as read.' })
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message })
  }
}
