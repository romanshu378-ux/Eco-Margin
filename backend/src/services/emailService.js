// EcoMargin — Brevo REST API Email Service
// src/services/emailService.js
'use strict'

const SibApiV3Sdk = require('@getbrevo/brevo')
const { EmailLog } = require('../models')
const { getCustomerConfirmationTemplate, getAdminNotificationTemplate } = require('../templates/emailTemplates')

const apiKey = process.env.BREVO_API_KEY
const emailCcArchive = process.env.EMAIL_CC_ARCHIVE
const mailFrom = process.env.MAIL_FROM

if (!apiKey) {
  throw new Error('BREVO_API_KEY environment variable is required')
}
if (!mailFrom) {
  throw new Error('MAIL_FROM environment variable is required')
}

// Log status without printing secrets
console.log('Brevo Email Service Configured:')
console.log(`- BREVO_API_KEY configured: ${!!apiKey}`)
console.log(`- MAIL_FROM configured: ${!!mailFrom}`)
console.log(`- ADMIN_EMAIL configured: ${!!process.env.ADMIN_EMAIL}`)
console.log(`- ADMIN_NOTIFY_EMAIL configured: ${!!process.env.ADMIN_NOTIFY_EMAIL}`)
console.log(`- EMAIL_CC_ARCHIVE configured: ${!!emailCcArchive}`)

function isValidEmail(email) {
  if (!email) return false
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(String(email).trim().toLowerCase())
}

function parseSenderAddress(senderStr) {
  if (!senderStr) return { name: 'EcoMargin LLP', email: '' }
  const match = senderStr.match(/^(.*?)\s*<(.*?)>$/)
  if (match) {
    return {
      name: match[1].trim().replace(/^["']|["']$/g, '') || 'EcoMargin LLP',
      email: match[2].trim()
    }
  }
  return {
    name: 'EcoMargin LLP',
    email: senderStr.trim()
  }
}

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

  // Parse sender name and email from mailFrom
  const sender = parseSenderAddress(mailFrom)

  const client = new SibApiV3Sdk.BrevoClient({ apiKey })

  // Validate recipient list
  const toList = []
  if (recipient) {
    recipient.split(',').forEach(emailStr => {
      const emailTrimmed = emailStr.trim()
      if (emailTrimmed && isValidEmail(emailTrimmed)) {
        toList.push({ email: emailTrimmed })
      }
    })
  }

  if (toList.length === 0) {
    console.error('❌ Error: No valid recipient found in field "to"')
    return {
      success: false,
      message: 'Invalid recipient email address',
      error: 'No valid recipient email address found.'
    }
  }

  const payload = {
    sender,
    to: toList,
    subject
  }

  // Ensure HTML and Text conversions
  if (htmlContent) {
    payload.htmlContent = htmlContent
    // Basic HTML tag stripping for text fallback
    payload.textContent = htmlContent.replace(/<[^>]*>/g, '')
  } else {
    payload.htmlContent = 'Email content is empty.'
    payload.textContent = 'Email content is empty.'
  }

  // Map CC (Always include default archive email if configured and valid, append others without duplicates)
  const ccEmails = new Map()
  if (emailCcArchive && isValidEmail(emailCcArchive)) {
    ccEmails.set(emailCcArchive.toLowerCase(), { email: emailCcArchive.trim(), name: 'EcoMargin Archive' })
  }
  if (cc) {
    cc.split(',').forEach(emailStr => {
      const emailTrimmed = emailStr.trim().toLowerCase()
      if (emailTrimmed && isValidEmail(emailTrimmed) && !ccEmails.has(emailTrimmed)) {
        ccEmails.set(emailTrimmed, { email: emailStr.trim() })
      }
    })
  }
  if (ccEmails.size > 0) {
    payload.cc = Array.from(ccEmails.values())
  }

  // Map BCC if present and valid
  if (bcc) {
    const bccList = bcc.split(',').map(email => ({ email: email.trim() })).filter(e => e.email && isValidEmail(e.email))
    if (bccList.length > 0) {
      payload.bcc = bccList
    }
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
      console.log('[EMAIL]')
      console.log(`To: ${toList.map(t => t.email).join(', ')}`)
      console.log(`CC: ${payload.cc ? payload.cc.map(c => c.email).join(', ') : 'None'}`)
      console.log('Status: Sent')

      // Ensure email logs are stored only after successful send
      try {
        await EmailLog.create({
          lead_id: leadId || null,
          recipient: toList.map(t => t.email).join(', '),
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
      const statusCode = err.statusCode || err.status || err.response?.status || 'Unknown'
      const errorBody = err.body || err.response?.body || err.message
      const errorMsg = typeof errorBody === 'object' ? (errorBody.message || JSON.stringify(errorBody)) : errorBody
      const errorCode = err.body?.code || 'N/A'
      
      const requestId = typeof err.rawResponse?.headers?.get === 'function' 
        ? err.rawResponse.headers.get('sib-request-id') 
        : err.rawResponse?.headers?.['sib-request-id'];

      console.error(`Failure reason (Attempt ${attempt}):`)
      console.error(`- HTTP Status: ${statusCode}`)
      console.error(`- Error Code: ${errorCode}`)
      console.error(`- Error Message: ${errorMsg}`)
      console.error(`- Request ID: ${requestId || 'N/A'}`)

      if (attempt > maxRetries) {
        return {
          success: false,
          message: 'Email service temporarily unavailable',
          error: errorMsg || 'Failed to deliver email via Brevo REST API'
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
  const adminEmail = process.env.ADMIN_NOTIFY_EMAIL
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
  _isValidEmail: isValidEmail,
  _parseSenderAddress: parseSenderAddress
}
