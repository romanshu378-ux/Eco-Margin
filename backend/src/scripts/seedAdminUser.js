// EcoMargin — Admin User Migration / Seeder Script
// src/scripts/seedAdminUser.js
'use strict'

const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })
const bcrypt = require('bcryptjs')
const { User } = require('../models')
const { sequelize } = require('../config/database')

async function updateAdminCredentials() {
  try {
    console.log('🔄 Connecting to database for Super Admin migration...')
    await sequelize.authenticate()

    const NEW_ADMIN_EMAIL = 'admin2026@ecomargin.in'
    const NEW_ADMIN_PASS = 'Ecomargin@2024'
    const hashedPassword = await bcrypt.hash(NEW_ADMIN_PASS, parseInt(process.env.BCRYPT_ROUNDS) || 12)

    // Check if target admin user exists
    let admin = await User.scope('withPassword').findOne({ where: { email: NEW_ADMIN_EMAIL } })

    if (admin) {
      console.log(`📌 Target Super Admin (${NEW_ADMIN_EMAIL}) found. Updating credentials...`)
      admin.password = hashedPassword
      admin.role = 'admin'
      admin.status = 'active'
      await admin.save({ hooks: false }) // save hashed password directly
      console.log('✅ Updated Super Admin password and status.')
    } else {
      // Find old admin user (e.g. admin@ecomargin.com or admin@ecomargin.in)
      const oldAdmin = await User.scope('withPassword').findOne({
        where: {
          role: 'admin'
        }
      })

      if (oldAdmin) {
        console.log(`📌 Replacing existing admin (${oldAdmin.email}) with ${NEW_ADMIN_EMAIL}...`)
        oldAdmin.email = NEW_ADMIN_EMAIL
        oldAdmin.password = hashedPassword
        oldAdmin.status = 'active'
        await oldAdmin.save({ hooks: false })
        console.log('✅ Successfully replaced old admin credentials.')
      } else {
        console.log(`✨ Creating new Super Admin account (${NEW_ADMIN_EMAIL})...`)
        await User.create({
          name: 'Super Admin',
          email: NEW_ADMIN_EMAIL,
          password: hashedPassword,
          role: 'admin',
          status: 'active',
          is_email_verified: true
        }, { hooks: false })
        console.log('✅ Created Super Admin account.')
      }
    }

    // Deactivate/Remove any extra default/old admin accounts that do not match NEW_ADMIN_EMAIL
    const oldAdmins = await User.findAll({
      where: {
        role: 'admin',
      }
    })

    for (const u of oldAdmins) {
      if (u.email.toLowerCase() !== NEW_ADMIN_EMAIL.toLowerCase()) {
        console.log(`⚠️ Deactivating legacy admin account: ${u.email}`)
        u.status = 'inactive'
        await u.save()
      }
    }

    console.log('🎉 Super Admin migration completed successfully!')
  } catch (error) {
    console.error('❌ Error updating Super Admin credentials:', error)
  } finally {
    await sequelize.close()
  }
}

if (require.main === module) {
  updateAdminCredentials()
}

module.exports = updateAdminCredentials
