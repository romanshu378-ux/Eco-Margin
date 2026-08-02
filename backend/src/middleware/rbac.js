// EcoMargin Backend — Role Based Access Control (RBAC) Middleware
// src/middleware/rbac.js

'use strict'

/**
 * Role Permissions Matrix
 * - Super Admin: Full Access
 * - Admin: Full Access except User creation
 * - Sales: Read & Manage RFQ Enquiries, Dealer Leads, Contacts
 * - Marketing: Read & Manage Blogs, SEO, Banners, Media
 * - Editor: Read & Edit Products, Services, Projects, Downloads
 * - Viewer: Read-only access to Admin Panel dashboards
 */
const ROLE_HIERARCHY = {
  'Super Admin': ['all'],
  'Admin': ['manage_content', 'manage_leads', 'manage_catalog', 'manage_media', 'read_all'],
  'Sales': ['manage_leads', 'read_catalog'],
  'Marketing': ['manage_content', 'manage_seo', 'manage_media', 'read_all'],
  'Editor': ['manage_catalog', 'manage_content', 'read_all'],
  'Viewer': ['read_all']
}

/**
 * Middleware factory to authorize specific roles
 * @param {...string} allowedRoles 
 */
const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required. Access token missing or invalid.'
      })
    }

    const userRole = req.user.role

    // Super Admin bypasses all checks
    if (userRole === 'Super Admin') {
      return next()
    }

    if (allowedRoles.includes(userRole)) {
      return next()
    }

    return res.status(403).json({
      success: false,
      message: `Access denied. Role '${userRole}' does not have sufficient permissions for this operation.`
    })
  }
}

/**
 * Middleware to restrict write (POST/PUT/DELETE) operations for Viewers
 */
const restrictViewers = (req, res, next) => {
  if (req.user && req.user.role === 'Viewer' && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
    return res.status(403).json({
      success: false,
      message: 'ReadOnly Access: Viewer role cannot make modifications.'
    })
  }
  next()
}

module.exports = {
  authorize,
  restrictViewers,
  ROLE_HIERARCHY
}
