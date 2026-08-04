// EcoMargin — Nodemailer SMTP Email Service
// src/services/emailService.js
'use strict'

const nodemailer = require('nodemailer')
const { EmailLog } = require('../models')
const { getCustomerConfirmationTemplate, getAdminNotificationTemplate } = require('../templates/emailTemplates')

// Configure Nodemailer Transporter using environment variables
const createTransporter = () => {
  const host = process.env.EMAIL_HOST || 'smtp.gmail.com'
  const port = parseInt(process.env.EMAIL_PORT || '587', 10)
  const user = process.env.EMAIL_USER || 'info@ecomargin.in'
  const pass = process.env.EMAIL_PASS || ''

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for other ports
    auth: pass ? { user, pass } : undefined,
    tls: {
      rejectUnauthorized: false
    }
  })
}

/**
  * Internal helper to record email attempt into database
  */
async function logEmail({ leadId, recipient, subject, body, emailType, status, errorMessage, sentBy }) {
  try {
    await EmailLog.create({
      lead_id: leadId || null,
      recipient,
      subject,
      body,
      email_type: emailType || 'Custom',
      status: status || 'Sent',
      error_message: errorMessage || null,
      sent_by: sentBy || 'System',
      sent_at: new Date()
    })
  } catch (err) {
    console.warn('⚠️ [EmailLog Database Error]:', err.message)
  }
}

/**
  * Sends Customer Confirmation Email
  */
async function sendCustomerConfirmation({ leadId, customerName, email, product, date }) {
  const subject = 'Thank You for Contacting EcoMargin'
  const htmlBody = getCustomerConfirmationTemplate({ customerName, leadId, product, date })
  const fromEmail = process.env.EMAIL_FROM || 'sales@ecomargin.in'

  try {
    const transporter = createTransporter()
    const info = await transporter.sendMail({
      from: `"EcoMargin Infrastructure" <${fromEmail}>`,
      to: email,
      subject,
      html: htmlBody
    })

    console.log(`✅ [Customer Email Sent]: MessageID=${info.messageId} to=${email}`)
    await logEmail({
      leadId,
      recipient: email,
      subject,
      body: htmlBody,
      emailType: 'CustomerConfirmation',
      status: 'Sent',
      sentBy: 'System'
    })
    return { success: true, messageId: info.messageId }
  } catch (err) {
    console.error(`❌ [Customer Email Failed] to=${email}:`, err.message)
    await logEmail({
      leadId,
      recipient: email,
      subject,
      body: htmlBody,
      emailType: 'CustomerConfirmation',
      status: 'Failed',
      errorMessage: err.message,
      sentBy: 'System'
    })
    return { success: false, error: err.message }
  }
}

/**
  * Sends Admin Sales Alert Email
  */
async function sendAdminNotification({ leadId, name, company, phone, email, product, message, time }) {
  const adminEmail = process.env.EMAIL_USER || process.env.ADMIN_NOTIFY_EMAIL || 'sales@ecomargin.in'
  const subject = `New RFQ Received - ${name} (${company || 'Individual'})`
  const htmlBody = getAdminNotificationTemplate({ name, company, phone, email, product, message, leadId, time })
  const fromEmail = process.env.EMAIL_FROM || 'system@ecomargin.in'

  try {
    const transporter = createTransporter()
    const info = await transporter.sendMail({
      from: `"EcoMargin Website Bot" <${fromEmail}>`,
      to: adminEmail,
      subject,
      html: htmlBody
    })

    console.log(`✅ [Admin Notification Sent]: to=${adminEmail}`)
    await logEmail({
      leadId,
      recipient: adminEmail,
      subject,
      body: htmlBody,
      emailType: 'AdminNotification',
      status: 'Sent',
      sentBy: 'System'
    })
    return { success: true, messageId: info.messageId }
  } catch (err) {
    console.error(`❌ [Admin Notification Failed]:`, err.message)
    await logEmail({
      leadId,
      recipient: adminEmail,
      subject,
      body: htmlBody,
      emailType: 'AdminNotification',
      status: 'Failed',
      errorMessage: err.message,
      sentBy: 'System'
    })
    return { success: false, error: err.message }
  }
}

/**
  * Sends Custom Email from Admin Panel
  */
async function sendCustomEmail({ leadId, to, cc, bcc, subject, body, sentBy, attachments }) {
  const fromEmail = process.env.EMAIL_FROM || 'sales@ecomargin.in'

  try {
    const transporter = createTransporter()
    const mailOptions = {
      from: `"EcoMargin Sales Team" <${fromEmail}>`,
      to,
      subject,
      html: body,
    }
    if (cc) mailOptions.cc = cc
    if (bcc) mailOptions.bcc = bcc
    if (attachments && Array.isArray(attachments)) {
      mailOptions.attachments = attachments
    }

    const info = await transporter.sendMail(mailOptions)
    console.log(`✅ [Custom Admin Email Sent]: to=${to}`)
    await logEmail({
      leadId,
      recipient: to,
      subject,
      body,
      emailType: 'CustomAdminEmail',
      status: 'Sent',
      sentBy: sentBy || 'Sales Admin'
    })
    return { success: true, messageId: info.messageId }
  } catch (err) {
    console.error(`❌ [Custom Admin Email Failed] to=${to}:`, err.message)
    await logEmail({
      leadId,
      recipient: to,
      subject,
      body,
      emailType: 'CustomAdminEmail',
      status: 'Failed',
      errorMessage: err.message,
      sentBy: sentBy || 'Sales Admin'
    })
    return { success: false, error: err.message }
  }
}

module.exports = {
  sendCustomerConfirmation,
  sendAdminNotification,
  sendCustomEmail,
  logEmail,
}
