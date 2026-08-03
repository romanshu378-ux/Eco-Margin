// EcoMargin Backend — Website Settings Controller
// src/controllers/settingController.js

'use strict'

const { Setting, ActivityLog } = require('../models')
const { Op } = require('sequelize')
const logger = require('../config/logger')

const setNoCache = (res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')
}

/**
 * GET /api/v1/admin/settings
 * Fetch all global settings from MySQL
 */
exports.getAllSettings = async (req, res) => {
  setNoCache(res)
  try {
    const { search, category } = req.query
    const whereClause = {}

    if (search && search.trim() !== '') {
      const q = `%${search.trim().toLowerCase()}%`
      whereClause[Op.or] = [
        { key: { [Op.like]: q } },
        { value: { [Op.like]: q } },
        { description: { [Op.like]: q } }
      ]
    }

    if (category && category !== 'All') {
      whereClause.category = category
    }

    const settings = await Setting.findAll({
      where: whereClause,
      order: [['category', 'ASC'], ['key', 'ASC']]
    })

    return res.status(200).json({
      success: true,
      message: 'Settings retrieved successfully',
      data: settings
    })
  } catch (error) {
    logger.error('❌ [Get Settings Error]:', error)
    return res.status(500).json({ success: false, message: error.message || 'Failed to fetch settings' })
  }
}

/**
 * GET /api/v1/admin/settings/:id
 */
exports.getSettingById = async (req, res) => {
  setNoCache(res)
  try {
    const setting = await Setting.findByPk(req.params.id)
    if (!setting) {
      return res.status(404).json({ success: false, message: 'Setting not found' })
    }
    return res.status(200).json({ success: true, data: setting })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

/**
 * POST /api/v1/admin/settings
 * Create a new website setting in MySQL
 */
exports.createSetting = async (req, res) => {
  setNoCache(res)
  const { key, value, category, description } = req.body

  if (!key || !key.trim()) {
    return res.status(400).json({ success: false, message: 'Setting Key is required.' })
  }
  if (value === undefined || value === null) {
    return res.status(400).json({ success: false, message: 'Setting Value is required.' })
  }

  const cleanKey = key.trim().toLowerCase().replace(/\s+/g, '_')

  try {
    const existing = await Setting.findOne({ where: { key: cleanKey } })
    if (existing) {
      return res.status(400).json({ success: false, message: `Setting key "${cleanKey}" already exists. Please use a unique key.` })
    }

    const newSetting = await Setting.create({
      key: cleanKey,
      value: String(value).trim(),
      category: category ? category.trim() : 'General',
      description: description ? description.trim() : ''
    })

    ActivityLog.log({
      action: 'Website Setting Created',
      type: 'System',
      description: `Created setting "${cleanKey}" = "${value}"`,
      ipAddress: req.ip
    })

    logger.info(`✅ [Setting Created] ${cleanKey}`)
    return res.status(201).json({
      success: true,
      message: `Setting "${cleanKey}" created successfully!`,
      data: newSetting
    })
  } catch (error) {
    logger.error('❌ [Create Setting Error]:', error)
    return res.status(500).json({ success: false, message: error.message || 'Failed to create setting' })
  }
}

/**
 * PUT /api/v1/admin/settings/:id
 * Update existing setting in MySQL
 */
exports.updateSetting = async (req, res) => {
  setNoCache(res)
  const { id } = req.params
  const { key, value, category, description } = req.body

  try {
    const setting = await Setting.findByPk(id)
    if (!setting) {
      return res.status(404).json({ success: false, message: 'Setting not found' })
    }

    if (key && key.trim() !== '') {
      const cleanKey = key.trim().toLowerCase().replace(/\s+/g, '_')
      if (cleanKey !== setting.key) {
        const duplicate = await Setting.findOne({ where: { key: cleanKey } })
        if (duplicate) {
          return res.status(400).json({ success: false, message: `Key "${cleanKey}" is already in use.` })
        }
        setting.key = cleanKey
      }
    }

    if (value !== undefined) setting.value = String(value).trim()
    if (category !== undefined) setting.category = category.trim()
    if (description !== undefined) setting.description = description.trim()

    await setting.save()

    ActivityLog.log({
      action: 'Website Setting Updated',
      type: 'System',
      description: `Updated setting "${setting.key}" = "${setting.value}"`,
      ipAddress: req.ip
    })

    logger.info(`✅ [Setting Updated] ID ${id} (${setting.key})`)
    return res.status(200).json({
      success: true,
      message: `Setting "${setting.key}" updated successfully!`,
      data: setting
    })
  } catch (error) {
    logger.error('❌ [Update Setting Error]:', error)
    return res.status(500).json({ success: false, message: error.message || 'Failed to update setting' })
  }
}

/**
 * DELETE /api/v1/admin/settings/:id
 * Permanently delete setting from MySQL
 */
exports.deleteSetting = async (req, res) => {
  setNoCache(res)
  const { id } = req.params

  try {
    const setting = await Setting.findByPk(id)
    if (!setting) {
      return res.status(404).json({ success: false, message: 'Setting not found' })
    }

    const keyName = setting.key
    await setting.destroy()

    ActivityLog.log({
      action: 'Website Setting Deleted',
      type: 'System',
      description: `Deleted setting "${keyName}"`,
      ipAddress: req.ip
    })

    logger.info(`🗑️ [Setting Deleted] ID ${id} (${keyName})`)
    return res.status(200).json({
      success: true,
      message: `Setting "${keyName}" deleted successfully!`
    })
  } catch (error) {
    logger.error('❌ [Delete Setting Error]:', error)
    return res.status(500).json({ success: false, message: error.message || 'Failed to delete setting' })
  }
}
