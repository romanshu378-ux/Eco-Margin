// EcoMargin — Auth Controller Tests (placeholder)
// src/__tests__/auth.test.js

const request = require('supertest')
const app     = require('../app')

describe('Auth API', () => {
  describe('POST /api/v1/auth/register', () => {
    it('should return 200 with coming soon message (stub)', async () => {
      const res = await request(app).post('/api/v1/auth/register').send({})
      expect(res.status).toBe(200)
    })
  })

  describe('POST /api/v1/auth/login', () => {
    it('should return 200 with coming soon message (stub)', async () => {
      const res = await request(app).post('/api/v1/auth/login').send({})
      expect(res.status).toBe(200)
    })
  })

  describe('GET /api/v1/health', () => {
    it('should return health check', async () => {
      const res = await request(app).get('/api/v1/health')
      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
    })
  })
})
