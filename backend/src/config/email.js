// EcoMargin — Email Config (Nodemailer)
// src/config/email.js

'use strict'

const nodemailer = require('nodemailer')
const logger     = require('./logger')

const transporter = nodemailer.createTransport({
  host:   process.env.SMTP_HOST || 'smtp.gmail.com',
  port:   parseInt(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

const sendEmail = async ({ to, subject, html, text }) => {
  try {
    const info = await transporter.sendMail({
      from:    process.env.EMAIL_FROM || 'EcoMargin <noreply@ecomargin.com>',
      to,
      subject,
      html,
      text,
    })
    logger.info(`Email sent: ${info.messageId} → ${to}`)
    return info
  } catch (error) {
    logger.error('Email send failed:', error)
    throw error
  }
}

module.exports = { sendEmail }
