// EcoMargin Backend — Auto Slug Generator Utility
// src/utils/slugify.js

'use strict'

/**
 * Convert string title into clean SEO friendly URL slug
 * Example: "60KW DC Fast Charger" -> "60kw-dc-fast-charger"
 * @param {string} text
 * @returns {string}
 */
function slugify(text) {
  if (!text) return ''
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-') // Replace spaces and non-word chars with -
    .replace(/^-+|-+$/g, '')    // Trim leading/trailing hyphens
}

module.exports = { slugify }
