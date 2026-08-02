import React from 'react'

export default function Badge({ children, variant = 'success', className = '' }) {
  const variants = {
    success: { bg: 'rgba(0, 200, 150, 0.15)', color: '#00c896' },
    warning: { bg: 'rgba(255, 184, 77, 0.15)', color: '#ffb84d' },
    error: { bg: 'rgba(255, 77, 77, 0.15)', color: '#ff4d4d' },
    neutral: { bg: 'var(--color-border)', color: 'var(--color-text-muted)' }
  }

  const activeVariant = variants[variant] || variants.neutral

  return (
    <span 
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '0.25rem 0.75rem',
        borderRadius: 'var(--radius-full)',
        fontSize: '0.75rem',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        background: activeVariant.bg,
        color: activeVariant.color,
        border: `1px solid ${activeVariant.color}30`
      }}
    >
      {children}
    </span>
  )
}
