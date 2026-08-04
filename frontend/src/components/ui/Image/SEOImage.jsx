// EcoMargin Frontend — Image SEO Helper Component
// src/components/ui/Image/SEOImage.jsx

import React, { useState } from 'react'

/**
 * Standardized SEO Image Component ensuring mandatory alt, title, lazy loading, and dimensions.
 */
export default function SEOImage({
  src,
  alt = 'EcoMargin EV Charger Infrastructure',
  title,
  width,
  height,
  className = '',
  style = {},
  loading = 'lazy',
  decoding = 'async',
  ...props
}) {
  const [hasError, setHasError] = useState(false)
  const defaultTitle = title || alt
  const fallbackUrl = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200" style="background:%23111827"><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%239CA3AF" font-family="sans-serif" font-size="14">EcoMargin Platform</text></svg>'

  return (
    <img
      src={hasError ? fallbackUrl : (src || fallbackUrl)}
      alt={alt}
      title={defaultTitle}
      width={width}
      height={height}
      loading={loading}
      decoding={decoding}
      className={className}
      onError={() => setHasError(true)}
      style={{
        maxWidth: '100%',
        height: height ? `${height}px` : 'auto',
        objectFit: 'cover',
        ...style,
      }}
      {...props}
    />
  )
}
