// EcoMargin — Email Config (Brevo REST API Edition)
// src/config/email.js

'use strict'

const SibApiV3Sdk = require('@getbrevo/brevo')
const logger = require('./logger')

const apiKey = process.env.BREVO_API_KEY
const emailCcArchive = process.env.EMAIL_CC_ARCHIVE

if (!apiKey) {
  throw new Error('BREVO_API_KEY environment variable is required')
}
if (!emailCcArchive) {
  throw new Error('EMAIL_CC_ARCHIVE environment variable is required')
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

  const senderEmail = 'support@ecomargin.in'
  const senderName = 'EcoMargin LLP'

  const client = new SibApiV3Sdk.BrevoClient({ apiKey })

  const payload = {
    sender: { name: senderName, email: senderEmail },
    to: [{ email: to }],
    cc: [{ email: emailCcArchive, name: 'EcoMargin Archive' }],
    subject,
    htmlContent: html || text
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
      console.log(`To: ${to}`)
      console.log(`CC: ${payload.cc.map(c => c.email).join(', ')}`)
      console.log('Status: Sent')
      logger.info(`Email sent: ${response.messageId} → ${to}`)
      return response
    } catch (err) {
      attempt++
      const statusCode = err.status || err.statusCode || err.response?.status || 'Unknown'
      const errorBody = err.response?.body || err.message
      
      console.error(`Failure reason (Attempt ${attempt}):`, errorBody)
      console.error(`Brevo Status Code: ${statusCode}`)

      if (attempt > maxRetries) {
        logger.error('Email send failed: ' + errorBody)
        throw err
      }
    }
  }
}

module.exports = { sendEmail }
