// EcoMargin — Auth Controller Tests
// src/__tests__/auth.test.js

const request = require('supertest')
const app = require('../app')

describe('Auth API', () => {
  describe('POST /api/v1/auth/register', () => {
    it('should return 422 validation error when required fields are missing', async () => {
      const res = await request(app).post('/api/v1/auth/register').send({})
      expect(res.status).toBe(422)
    })
  })

  describe('POST /api/v1/auth/login', () => {
    it('should return 422 validation error when email or password is missing', async () => {
      const res = await request(app).post('/api/v1/auth/login').send({})
      expect(res.status).toBe(422)
    })
  })

  describe('GET /api/v1/health', () => {
    it('should return health check success status', async () => {
      const res = await request(app).get('/api/v1/health')
      expect(res.status).toBe(200)
      expect(res.body.status).toBe('success')
    })
  })
})
