// EcoMargin Backend — Environment Variables Validation Engine
// src/config/envValidator.js
'use strict'

// Essential environment variables required for server and database operation
const coreRequiredEnvVars = [
  'DB_HOST',
  'DB_NAME',
  'DB_USER',
  'DB_PASSWORD',
]

// Optional integration variables (warn instead of crashing server startup)
const optionalIntegrationVars = [
  'BREVO_API_KEY',
  'MAIL_FROM',
  'ADMIN_EMAIL',
  'ADMIN_NOTIFY_EMAIL',
  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET',
  'JWT_REFRESH_SECRET'
]

/**
 * Validates that core environment variables are present.
 * Issues warnings for unconfigured external services without blocking server readiness.
 */
function validateEnv() {
  const missingCore = []

  for (const key of coreRequiredEnvVars) {
    if (process.env[key] === undefined || process.env[key] === null || String(process.env[key]).trim() === '') {
      missingCore.push(key)
    }
  }

  // Warn on missing optional integrations (e.g. Brevo, Cloudinary)
  const missingOptional = []
  for (const key of optionalIntegrationVars) {
    if (process.env[key] === undefined || process.env[key] === null || String(process.env[key]).trim() === '') {
      missingOptional.push(key)
    }
  }

  if (missingOptional.length > 0) {
    console.warn(`ℹ️ [Notice] Optional integration variables not set (external features will run in fallback/mock mode):\n${missingOptional.map(v => `   - ${v}`).join('\n')}`)
  }

  if (missingCore.length > 0 && process.env.NODE_ENV === 'production') {
    const errorMsg = `❌ [FATAL] Production database configuration missing:\n${missingCore.map((v) => `   - ${v}`).join('\n')}`
    console.error(errorMsg)
    throw new Error(`Missing required database variable(s): ${missingCore.join(', ')}`)
  }

  console.log('Environment validated')
}

module.exports = { validateEnv }
