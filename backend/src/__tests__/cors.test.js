// EcoMargin — CORS Configuration Tests
// src/__tests__/cors.test.js

const request = require('supertest')
const app = require('../app')

describe('CORS Configuration Tests', () => {
  const allowedOrigin = 'https://admin.ecomargin.in'
  const disallowedOrigin = 'https://unauthorized-domain.com'

  describe('Preflight OPTIONS /api/v1/auth/login', () => {
    it('should return 200 and correct CORS headers for allowed origin', async () => {
      const res = await request(app)
        .options('/api/v1/auth/login')
        .set('Origin', allowedOrigin)
        .set('Access-Control-Request-Method', 'POST')
        .set('Access-Control-Request-Headers', 'Content-Type, Authorization')

      expect(res.status).toBe(200)
      expect(res.headers['access-control-allow-origin']).toBe(allowedOrigin)
      expect(res.headers['access-control-allow-credentials']).toBe('true')
      expect(res.headers['access-control-allow-methods']).toContain('POST')
    })
  })

  describe('POST /api/v1/auth/login', () => {
    it('should include CORS headers for allowed origin on login request', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .set('Origin', allowedOrigin)
        .send({ email: 'admin@ecomargin.in', password: 'Password123!' })

      expect(res.headers['access-control-allow-origin']).toBe(allowedOrigin)
      expect(res.headers['access-control-allow-credentials']).toBe('true')
    })

    it('should block or omit CORS allow origin header for disallowed origin', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .set('Origin', disallowedOrigin)
        .send({ email: 'admin@ecomargin.in', password: 'Password123!' })

      expect(res.headers['access-control-allow-origin']).toBeUndefined()
    })
  })
})
