// EcoMargin — Email Config (Brevo REST API Edition)
// src/config/email.js

'use strict'

const SibApiV3Sdk = require('@getbrevo/brevo')
const logger = require('./logger')

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
console.log('Brevo Configured (Main Transporter):')
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

const promiseTimeout = (promise, ms) => {
  let timeout = new Promise((resolve, reject) => {
    let id = setTimeout(() => {
      clearTimeout(id)
      reject(new Error(`Brevo REST API call timed out after ${ms} ms`))
    }, ms)
  })
  return Promise.race([promise, timeout])
}

const sendEmail = async ({ to, subject, html, text }) => {
  console.log('Sending email... Using Brevo API')
  console.log(`Recipient: ${to}`)
  console.log(`Subject: ${subject}`)

  const sender = parseSenderAddress(mailFrom)

  const client = new SibApiV3Sdk.BrevoClient({ apiKey })

  const toList = []
  if (to) {
    to.split(',').forEach(emailStr => {
      const emailTrimmed = emailStr.trim()
      if (emailTrimmed && isValidEmail(emailTrimmed)) {
        toList.push({ email: emailTrimmed })
      }
    })
  }

  if (toList.length === 0) {
    const errorMsg = 'No valid recipient email address found.'
    console.error(`❌ Error: ${errorMsg}`)
    throw new Error(errorMsg)
  }

  const payload = {
    sender,
    to: toList,
    subject
  }

  if (html) {
    payload.htmlContent = html
    payload.textContent = text || html.replace(/<[^>]*>/g, '')
  } else if (text) {
    payload.htmlContent = text.replace(/\n/g, '<br/>')
    payload.textContent = text
  } else {
    payload.htmlContent = 'Email content is empty.'
    payload.textContent = 'Email content is empty.'
  }

  // CC (Only include if configured and valid)
  if (emailCcArchive && isValidEmail(emailCcArchive)) {
    payload.cc = [{ email: emailCcArchive.trim(), name: 'EcoMargin Archive' }]
  }

  let attempt = 0
  const maxRetries = 2

  while (true) {
    try {
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
      logger.info(`Email sent: ${response.messageId} → ${toList.map(t => t.email).join(', ')}`)
      return response
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
        logger.error('Email send failed: ' + errorMsg)
        throw new Error(errorMsg || 'Failed to deliver email')
      }
    }
  }
}

module.exports = { sendEmail }
