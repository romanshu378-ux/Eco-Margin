// EcoMargin Backend — Blogs Controller
// src/controllers/blogController.js

'use strict'

const { Blog } = require('../models')

const setNoCache = (res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')
}

exports.getAllBlogs = async (req, res) => {
  setNoCache(res)
  try {
    const blogs = await Blog.findAll({
      order: [['displayOrder', 'ASC'], ['id', 'DESC']]
    })
    return res.status(200).json({
      success: true,
      message: 'Blogs retrieved successfully',
      data: blogs
    })
  } catch (error) {
    console.error('❌ [Blogs Fetch Error]:', error)
    return res.status(500).json({ success: false, message: error.message || 'Failed to fetch blogs' })
  }
}

exports.getBlogById = async (req, res) => {
  setNoCache(res)
  try {
    const blog = await Blog.findByPk(req.params.id)
    if (!blog) return res.status(404).json({ success: false, message: 'Blog article not found' })
    return res.status(200).json({ success: true, data: blog })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

exports.getBlogBySlug = async (req, res) => {
  setNoCache(res)
  try {
    const blog = await Blog.findOne({ where: { slug: req.params.slug } })
    if (!blog) return res.status(404).json({ success: false, message: 'Blog article not found' })
    return res.status(200).json({ success: true, data: blog })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

exports.createBlog = async (req, res) => {
  setNoCache(res)
  const { title, slug, author, summary, content, coverImage, displayOrder, status } = req.body

  if (!title) {
    return res.status(400).json({ success: false, message: 'Blog title is required.' })
  }

  const generatedSlug = slug ? slug.toLowerCase().replace(/[^a-z0-9]+/g, '-') : title.toLowerCase().replace(/[^a-z0-9]+/g, '-')

  try {
    const newBlog = await Blog.create({
      title,
      slug: generatedSlug,
      author: author || 'EcoMargin Team',
      summary: summary || '',
      content: content || '',
      coverImage: coverImage || '',
      displayOrder: parseInt(displayOrder, 10) || 0,
      status: status || 'Published'
    })
    console.log('✅ [Database Commit] Created blog ID:', newBlog.id)
    return res.status(201).json({ success: true, message: 'Blog created successfully', data: newBlog })
  } catch (error) {
    console.error('❌ [Create Blog Error]:', error)
    return res.status(500).json({ success: false, message: error.message || 'Failed to create blog article' })
  }
}

exports.updateBlog = async (req, res) => {
  setNoCache(res)
  const { id } = req.params
  const { title, slug, author, summary, content, coverImage, displayOrder, status } = req.body

  try {
    const blog = await Blog.findByPk(id)
    if (!blog) return res.status(404).json({ success: false, message: 'Blog article not found' })

    if (title !== undefined) blog.title = title
    if (slug !== undefined) blog.slug = slug.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    if (author !== undefined) blog.author = author
    if (summary !== undefined) blog.summary = summary
    if (content !== undefined) blog.content = content
    if (coverImage !== undefined) blog.coverImage = coverImage
    if (displayOrder !== undefined) blog.displayOrder = parseInt(displayOrder, 10) || 0
    if (status !== undefined) blog.status = status

    await blog.save()
    console.log('✅ [Database Commit] Updated blog ID:', id)
    return res.status(200).json({ success: true, message: 'Blog updated successfully', data: blog })
  } catch (error) {
    console.error('❌ [Update Blog Error]:', error)
    return res.status(500).json({ success: false, message: error.message || 'Failed to update blog article' })
  }
}

exports.deleteBlog = async (req, res) => {
  setNoCache(res)
  const { id } = req.params
  try {
    const blog = await Blog.findByPk(id)
    if (!blog) return res.status(404).json({ success: false, message: 'Blog article not found' })
    await blog.destroy()
    console.log('🗑️ [Database Delete] Removed blog ID:', id)
    return res.status(200).json({ success: true, message: 'Blog deleted successfully' })
  } catch (error) {
    console.error('❌ [Delete Blog Error]:', error)
    return res.status(500).json({ success: false, message: error.message || 'Failed to delete blog article' })
  }
}
