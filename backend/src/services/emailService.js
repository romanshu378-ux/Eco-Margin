// EcoMargin — Brevo REST API Email Service
// src/services/emailService.js
'use strict'

const SibApiV3Sdk = require('@getbrevo/brevo')
const { EmailLog } = require('../models')
const { getCustomerConfirmationTemplate, getAdminNotificationTemplate } = require('../templates/emailTemplates')

/**
 * Timeout wrapper for Promise.
 */
const promiseTimeout = (promise, ms) => {
  let timeout = new Promise((resolve, reject) => {
    let id = setTimeout(() => {
      clearTimeout(id)
      reject(new Error(`Brevo REST API call timed out after ${ms} ms`))
    }, ms)
  })
  return Promise.race([promise, timeout])
}

/**
 * Internal helper to send via Brevo Client with timeout & retry logic.
 */
async function sendViaBrevo({ leadId, recipient, subject, htmlContent, emailType, sentBy, cc, bcc, attachments }) {
  console.log('Sending email... Using Brevo API')
  console.log(`Recipient: ${recipient}`)
  console.log(`Subject: ${subject}`)

  const apiKey = process.env.BREVO_API_KEY
  if (!apiKey) {
    console.error('❌ BREVO_API_KEY is missing')
    return {
      success: false,
      message: 'Email sending failed',
      error: 'BREVO_API_KEY environment variable is missing.'
    }
  }

  // Verify the sender email & name before sending
  const senderEmail = 'support@ecomargin.in'
  const senderName = 'EcoMargin LLP'

  const client = new SibApiV3Sdk.BrevoClient({ apiKey })

  const payload = {
    sender: { name: senderName, email: senderEmail },
    to: [{ email: recipient }],
    subject,
    htmlContent
  }

  // Map CC if present
  if (cc) {
    payload.cc = cc.split(',').map(email => ({ email: email.trim() })).filter(e => e.email)
  }

  // Map BCC if present
  if (bcc) {
    payload.bcc = bcc.split(',').map(email => ({ email: email.trim() })).filter(e => e.email)
  }

  // Map Attachments if present
  if (attachments && Array.isArray(attachments)) {
    payload.attachment = attachments.map(att => {
      if (att.content) {
        return {
          content: att.content,
          name: att.filename || att.name
        }
      }
      return {
        url: att.path || att.url,
        name: att.filename || att.name
      }
    })
  }

  let attempt = 0
  const maxRetries = 2

  while (true) {
    try {
      // 10000ms request timeout
      const response = await promiseTimeout(
        client.transactionalEmails.sendTransacEmail(payload),
        10000
      )

      console.log('Brevo Status Code: 200/201 Success')
      console.log('Brevo Response:', JSON.stringify(response))

      // Ensure email logs are stored only after successful send
      try {
        await EmailLog.create({
          lead_id: leadId || null,
          recipient,
          subject,
          body: htmlContent,
          email_type: emailType || 'Custom',
          status: 'Sent',
          sent_by: sentBy || 'System',
          sent_at: new Date()
        })
      } catch (dbErr) {
        console.warn('⚠️ [EmailLog Database Save Failed]:', dbErr.message)
      }

      return {
        success: true,
        message: 'Email sent successfully',
        messageId: response.messageId
      }
    } catch (err) {
      attempt++
      const statusCode = err.status || err.statusCode || err.response?.status || 'Unknown'
      const errorBody = err.response?.body || err.message
      
      console.error(`Failure reason (Attempt ${attempt}):`, errorBody)
      console.error(`Brevo Status Code: ${statusCode}`)

      if (attempt > maxRetries) {
        return {
          success: false,
          message: 'Email sending failed',
          error: errorBody
        }
      }
    }
  }
}

/**
 * Sends Customer Confirmation Email
 */
async function sendCustomerConfirmation({ leadId, customerName, email, product, date }) {
  const subject = 'Thank You for Contacting EcoMargin LLP'
  const htmlContent = getCustomerConfirmationTemplate({ customerName, leadId, product, date })

  return sendViaBrevo({
    leadId,
    recipient: email,
    subject,
    htmlContent,
    emailType: 'CustomerConfirmation',
    sentBy: 'System'
  })
}

/**
 * Sends Admin Sales Alert Email
 */
async function sendAdminNotification({ leadId, name, company, phone, email, product, message, time }) {
  const adminEmail = process.env.ADMIN_NOTIFY_EMAIL || 'support@ecomargin.in'
  const subject = `New Enquiry Received | EcoMargin LLP - ${name}`
  const htmlContent = getAdminNotificationTemplate({ name, company, phone, email, product, message, leadId, time })

  return sendViaBrevo({
    leadId,
    recipient: adminEmail,
    subject,
    htmlContent,
    emailType: 'AdminNotification',
    sentBy: 'System'
  })
}

/**
 * Sends Custom Email from Admin Panel
 */
async function sendCustomEmail({ leadId, to, cc, bcc, subject, body, sentBy, attachments }) {
  return sendViaBrevo({
    leadId,
    recipient: to,
    cc,
    bcc,
    subject,
    htmlContent: body,
    emailType: 'CustomAdminEmail',
    sentBy: sentBy || 'Sales Admin',
    attachments
  })
}

module.exports = {
  sendCustomerConfirmation,
  sendAdminNotification,
  sendCustomEmail,
}
