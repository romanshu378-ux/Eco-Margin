import React from 'react'

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  icon: Icon
}) {
  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    borderRadius: 'var(--radius-md)',
    fontFamily: 'var(--font)',
    fontWeight: '600',
    transition: 'all var(--transition-fast)',
    width: fullWidth ? '100%' : 'auto',
    opacity: disabled ? 0.6 : 1,
    pointerEvents: disabled ? 'none' : 'auto'
  }

  const variants = {
    primary: {
      background: 'var(--color-primary)',
      color: '#0f0f1a', // Always dark text on primary button
      boxShadow: 'var(--shadow-md)',
    },
    outline: {
      background: 'transparent',
      border: '1px solid var(--color-border)',
      color: 'var(--color-text)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--color-text)',
    }
  }

  const sizes = {
    sm: { padding: '0.5rem 1rem', fontSize: '0.875rem' },
    md: { padding: '0.75rem 1.5rem', fontSize: '1rem' },
    lg: { padding: '1rem 2rem', fontSize: '1.125rem' }
  }

  // Hover effects (simplified for inline styles, actual CSS might be better but this works for pure React)
  const hoverProps = disabled ? {} : {
    onMouseOver: (e) => {
      if (variant === 'primary') {
        e.currentTarget.style.background = 'var(--color-primary-hover)'
        e.currentTarget.style.boxShadow = 'var(--shadow-glow)'
      } else if (variant === 'outline' || variant === 'ghost') {
        e.currentTarget.style.background = 'var(--color-bg-card)'
      }
    },
    onMouseOut: (e) => {
      if (variant === 'primary') {
        e.currentTarget.style.background = 'var(--color-primary)'
        e.currentTarget.style.boxShadow = 'var(--shadow-md)'
      } else if (variant === 'outline' || variant === 'ghost') {
        e.currentTarget.style.background = 'transparent'
      }
    }
  }

  return (
    <button 
      type={type} 
      onClick={onClick} 
      disabled={disabled}
      style={{ ...baseStyle, ...variants[variant], ...sizes[size] }}
      className={className}
      {...hoverProps}
    >
      {Icon && <Icon size={size === 'sm' ? 16 : 20} />}
      {children}
    </button>
  )
}
