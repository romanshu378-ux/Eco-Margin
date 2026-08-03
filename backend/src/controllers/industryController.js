// EcoMargin Backend — Industries & Sectors Controller
// src/controllers/industryController.js

'use strict'

const { Industry } = require('../models')

const setNoCache = (res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')
}

exports.getAllIndustries = async (req, res) => {
  setNoCache(res)
  try {
    const industries = await Industry.findAll({
      order: [['displayOrder', 'ASC'], ['id', 'DESC']]
    })
    return res.status(200).json({
      success: true,
      message: 'Industries retrieved successfully',
      data: industries
    })
  } catch (error) {
    console.error('❌ [Industries Fetch Error]:', error)
    return res.status(500).json({ success: false, message: error.message || 'Failed to fetch industries' })
  }
}

exports.getIndustryById = async (req, res) => {
  setNoCache(res)
  try {
    const industry = await Industry.findByPk(req.params.id)
    if (!industry) return res.status(404).json({ success: false, message: 'Industry sector not found' })
    return res.status(200).json({ success: true, data: industry })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

exports.createIndustry = async (req, res) => {
  setNoCache(res)
  const { name, icon, description, imageUrl, displayOrder, status } = req.body

  if (!name) {
    return res.status(400).json({ success: false, message: 'Industry sector name is required.' })
  }

  try {
    const newIndustry = await Industry.create({
      name,
      icon: icon || '⚡',
      description: description || '',
      imageUrl: imageUrl || '',
      displayOrder: parseInt(displayOrder, 10) || 0,
      status: status || 'Active'
    })
    console.log('✅ [Database Commit] Created industry ID:', newIndustry.id)
    return res.status(201).json({ success: true, message: 'Industry sector created successfully', data: newIndustry })
  } catch (error) {
    console.error('❌ [Create Industry Error]:', error)
    return res.status(500).json({ success: false, message: error.message || 'Failed to create industry sector' })
  }
}

exports.updateIndustry = async (req, res) => {
  setNoCache(res)
  const { id } = req.params
  const { name, icon, description, imageUrl, displayOrder, status } = req.body

  try {
    const industry = await Industry.findByPk(id)
    if (!industry) return res.status(404).json({ success: false, message: 'Industry sector not found' })

    if (name !== undefined) industry.name = name
    if (icon !== undefined) industry.icon = icon
    if (description !== undefined) industry.description = description
    if (imageUrl !== undefined) industry.imageUrl = imageUrl
    if (displayOrder !== undefined) industry.displayOrder = parseInt(displayOrder, 10) || 0
    if (status !== undefined) industry.status = status

    await industry.save()
    console.log('✅ [Database Commit] Updated industry ID:', id)
    return res.status(200).json({ success: true, message: 'Industry sector updated successfully', data: industry })
  } catch (error) {
    console.error('❌ [Update Industry Error]:', error)
    return res.status(500).json({ success: false, message: error.message || 'Failed to update industry sector' })
  }
}

exports.deleteIndustry = async (req, res) => {
  setNoCache(res)
  const { id } = req.params
  try {
    const industry = await Industry.findByPk(id)
    if (!industry) return res.status(404).json({ success: false, message: 'Industry sector not found' })
    await industry.destroy()
    console.log('🗑️ [Database Delete] Removed industry ID:', id)
    return res.status(200).json({ success: true, message: 'Industry sector deleted successfully' })
  } catch (error) {
    console.error('❌ [Delete Industry Error]:', error)
    return res.status(500).json({ success: false, message: error.message || 'Failed to delete industry sector' })
  }
}
