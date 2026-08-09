// EcoMargin — Email Service Helpers Test
// src/__tests__/emailService.test.js

require('dotenv').config()
const emailService = require('../services/emailService')

describe('Email Service Helpers', () => {
  describe('isValidEmail', () => {
    it('should validate correct email formats', () => {
      expect(emailService._isValidEmail('support@ecomargin.in')).toBe(true)
      expect(emailService._isValidEmail('test.user@ecomargin.com')).toBe(true)
      expect(emailService._isValidEmail('archive+123@gmail.com')).toBe(true)
    })

    it('should reject invalid email formats', () => {
      expect(emailService._isValidEmail('')).toBe(false)
      expect(emailService._isValidEmail(null)).toBe(false)
      expect(emailService._isValidEmail(undefined)).toBe(false)
      expect(emailService._isValidEmail('support')).toBe(false)
      expect(emailService._isValidEmail('support@')).toBe(false)
      expect(emailService._isValidEmail('support@ecomargin')).toBe(false)
      expect(emailService._isValidEmail('EcoMargin LLP <support@ecomargin.in>')).toBe(false)
    })
  })

  describe('parseSenderAddress', () => {
    it('should parse friendly names and email addresses correctly', () => {
      const res = emailService._parseSenderAddress('EcoMargin LLP <support@ecomargin.in>')
      expect(res.name).toBe('EcoMargin LLP')
      expect(res.email).toBe('support@ecomargin.in')
    })

    it('should parse friendly names containing quotes correctly', () => {
      const res = emailService._parseSenderAddress('"EcoMargin LLP" <support@ecomargin.in>')
      expect(res.name).toBe('EcoMargin LLP')
      expect(res.email).toBe('support@ecomargin.in')
    })

    it('should fallback to default name and use input as email if no friendly name format', () => {
      const res = emailService._parseSenderAddress('support@ecomargin.in')
      expect(res.name).toBe('EcoMargin LLP')
      expect(res.email).toBe('support@ecomargin.in')
    })

    it('should handle empty input gracefully', () => {
      const res = emailService._parseSenderAddress('')
      expect(res.name).toBe('EcoMargin LLP')
      expect(res.email).toBe('')
    })
  })
})
