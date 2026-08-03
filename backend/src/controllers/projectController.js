// EcoMargin Backend — Projects Controller
// src/controllers/projectController.js

'use strict'

const { Project } = require('../models')

const setNoCache = (res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')
}

exports.getAllProjects = async (req, res) => {
  setNoCache(res)
  try {
    const projects = await Project.findAll({
      order: [['displayOrder', 'ASC'], ['id', 'DESC']]
    })
    return res.status(200).json({
      success: true,
      message: 'Projects retrieved successfully',
      data: projects
    })
  } catch (error) {
    console.error('❌ [Projects Fetch Error]:', error)
    return res.status(500).json({ success: false, message: error.message || 'Failed to fetch projects' })
  }
}

exports.getProjectById = async (req, res) => {
  setNoCache(res)
  try {
    const project = await Project.findByPk(req.params.id)
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' })
    return res.status(200).json({ success: true, data: project })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

exports.createProject = async (req, res) => {
  setNoCache(res)
  const { title, clientName, location, capacity, timeline, description, images, imageUrl, displayOrder, status } = req.body

  if (!title) {
    return res.status(400).json({ success: false, message: 'Project title is required.' })
  }

  try {
    const newProject = await Project.create({
      title,
      clientName: clientName || '',
      location: location || '',
      capacity: capacity || '',
      timeline: timeline || '',
      description: description || '',
      images: images || (imageUrl ? [imageUrl] : []),
      imageUrl: imageUrl || (Array.isArray(images) && images[0] ? images[0] : ''),
      displayOrder: parseInt(displayOrder, 10) || 0,
      status: status || 'Completed'
    })
    console.log('✅ [Database Commit] Created project ID:', newProject.id)
    return res.status(201).json({ success: true, message: 'Project created successfully', data: newProject })
  } catch (error) {
    console.error('❌ [Create Project Error]:', error)
    return res.status(500).json({ success: false, message: error.message || 'Failed to create project' })
  }
}

exports.updateProject = async (req, res) => {
  setNoCache(res)
  const { id } = req.params
  const { title, clientName, location, capacity, timeline, description, images, imageUrl, displayOrder, status } = req.body

  try {
    const project = await Project.findByPk(id)
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' })

    if (title !== undefined) project.title = title
    if (clientName !== undefined) project.clientName = clientName
    if (location !== undefined) project.location = location
    if (capacity !== undefined) project.capacity = capacity
    if (timeline !== undefined) project.timeline = timeline
    if (description !== undefined) project.description = description
    if (images !== undefined) project.images = images
    if (imageUrl !== undefined) project.imageUrl = imageUrl
    if (displayOrder !== undefined) project.displayOrder = parseInt(displayOrder, 10) || 0
    if (status !== undefined) project.status = status

    await project.save()
    console.log('✅ [Database Commit] Updated project ID:', id)
    return res.status(200).json({ success: true, message: 'Project updated successfully', data: project })
  } catch (error) {
    console.error('❌ [Update Project Error]:', error)
    return res.status(500).json({ success: false, message: error.message || 'Failed to update project' })
  }
}

exports.deleteProject = async (req, res) => {
  setNoCache(res)
  const { id } = req.params
  try {
    const project = await Project.findByPk(id)
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' })
    await project.destroy()
    console.log('🗑️ [Database Delete] Removed project ID:', id)
    return res.status(200).json({ success: true, message: 'Project deleted successfully' })
  } catch (error) {
    console.error('❌ [Delete Project Error]:', error)
    return res.status(500).json({ success: false, message: error.message || 'Failed to delete project' })
  }
}
