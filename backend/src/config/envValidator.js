// EcoMargin Backend — Environment Variables Validation Engine
// src/config/envValidator.js
'use strict'

const requiredEnvVars = [
  'NODE_ENV',
  'PORT',
  'DB_HOST',
  'DB_PORT',
  'DB_NAME',
  'DB_USER',
  'DB_PASSWORD',
  'DB_SSL',
  'JWT_SECRET',
  'JWT_REFRESH_SECRET',
  'BREVO_API_KEY',
  'MAIL_FROM',
  'EMAIL_CC_ARCHIVE',
  'ADMIN_NOTIFY_EMAIL',
  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET',
  'SITE_URL',
  'CLIENT_URL',
  'ALLOWED_ORIGINS',
  'RATE_LIMIT_WINDOW_MS',
  'RATE_LIMIT_MAX_REQUESTS',
  'AUTH_RATE_LIMIT_MAX',
  'API_VERSION',
]

/**
 * Validates that all required environment variables are present and non-empty.
 * Throws a startup error if any variable is missing.
 */
function validateEnv() {
  const missingVars = []

  for (const key of requiredEnvVars) {
    if (process.env[key] === undefined || process.env[key] === null || String(process.env[key]).trim() === '') {
      missingVars.push(key)
    }
  }

  if (missingVars.length > 0) {
    const errorMsg = `❌ [FATAL] Application startup aborted. Missing required environment variable(s):\n${missingVars.map((v) => `   - ${v}`).join('\n')}`
    console.error(errorMsg)
    throw new Error(`Missing environment variable(s): ${missingVars.join(', ')}`)
  }

  console.log('🛡️ [Security] All required environment variables validated successfully.')
}

module.exports = { validateEnv }
