// EcoMargin Frontend — Image SEO Helper Component
// src/components/ui/Image/SEOImage.jsx

import React from 'react'

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
  const defaultTitle = title || alt

  return (
    <img
      src={src}
      alt={alt}
      title={defaultTitle}
      width={width}
      height={height}
      loading={loading}
      decoding={decoding}
      className={className}
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
