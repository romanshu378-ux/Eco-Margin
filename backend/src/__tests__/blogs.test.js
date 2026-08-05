// EcoMargin — Blogs Controller and API Routing Tests
// src/__tests__/blogs.test.js

const request = require('supertest')
const app = require('../app')
const { Blog } = require('../models')

// Mock the Blog model to avoid database queries during testing
jest.mock('../models', () => {
  const mockBlog = {
    findAll: jest.fn(),
    findAndCountAll: jest.fn(),
    findOne: jest.fn(),
  }
  return {
    Blog: mockBlog
  }
})

describe('Blogs API', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET /api/blogs', () => {
    it('should retrieve all published blogs and set no-cache headers', async () => {
      const mockBlogsList = [
        { id: 1, title: 'Blog 1', status: 'Published', author: 'Team' },
        { id: 2, title: 'Blog 2', status: 'Published', author: 'Team' }
      ]
      Blog.findAll.mockResolvedValue(mockBlogsList)

      const res = await request(app).get('/api/blogs')

      expect(res.status).toBe(200)
      expect(res.header['cache-control']).toBe('no-cache, no-store, must-revalidate')
      expect(res.body.success).toBe(true)
      expect(res.body.data).toEqual(mockBlogsList)
      expect(Blog.findAll).toHaveBeenCalledWith({
        where: { status: 'Published' },
        order: [['displayOrder', 'ASC'], ['id', 'DESC']]
      })
    })

    it('should support pagination query parameters correctly', async () => {
      const mockPaginatedBlogs = [
        { id: 1, title: 'Blog 1', status: 'Published', author: 'Team' }
      ]
      Blog.findAndCountAll.mockResolvedValue({
        rows: mockPaginatedBlogs,
        count: 10
      })

      const res = await request(app).get('/api/blogs?page=1&limit=1')

      expect(res.status).toBe(200)
      expect(res.header['cache-control']).toBe('no-cache, no-store, must-revalidate')
      expect(res.body.success).toBe(true)
      expect(res.body.data).toEqual(mockPaginatedBlogs)
      expect(res.body.meta).toEqual(expect.objectContaining({
        currentPage: 1,
        pageSize: 1,
        totalItems: 10,
        totalPages: 10
      }))
      expect(Blog.findAndCountAll).toHaveBeenCalledWith({
        where: { status: 'Published' },
        order: [['displayOrder', 'ASC'], ['id', 'DESC']],
        limit: 1,
        offset: 0
      })
    })
  })

  describe('GET /api/blogs/:slug', () => {
    it('should retrieve single published blog by slug', async () => {
      const mockBlog = { id: 1, title: 'Blog 1', slug: 'blog-1', status: 'Published' }
      Blog.findOne.mockResolvedValue(mockBlog)

      const res = await request(app).get('/api/blogs/blog-1')

      expect(res.status).toBe(200)
      expect(res.header['cache-control']).toBe('no-cache, no-store, must-revalidate')
      expect(res.body.success).toBe(true)
      expect(res.body.data).toEqual(mockBlog)
      expect(Blog.findOne).toHaveBeenCalledWith({
        where: { slug: 'blog-1', status: 'Published' }
      })
    })

    it('should return 404 error if blog by slug is not found', async () => {
      Blog.findOne.mockResolvedValue(null)

      const res = await request(app).get('/api/blogs/non-existent')

      expect(res.status).toBe(404)
      expect(res.body.success).toBe(false)
      expect(res.body.message).toBe('Blog article not found')
    })
  })
})
