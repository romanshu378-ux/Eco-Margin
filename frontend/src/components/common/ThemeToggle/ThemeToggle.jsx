// EcoMargin Frontend — Dynamic Theme Toggle Component (Light / Dark)
// src/components/common/ThemeToggle/ThemeToggle.jsx

import React from 'react'
import { motion } from 'framer-motion'
import { FiSun, FiMoon } from 'react-icons/fi'
import { useTheme } from '@context/ThemeContext'

export default function ThemeToggle({ variant = 'header' }) {
  const { isDark, toggleTheme } = useTheme()

  if (variant === 'mobile') {
    return (
      <button
        onClick={toggleTheme}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '46px',
          width: '100%',
          padding: '0 1rem',
          fontSize: '1.05rem',
          fontWeight: 600,
          borderRadius: 'var(--radius-md)',
          background: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
          border: '1px solid var(--color-border)',
          color: 'var(--color-text)',
          cursor: 'pointer',
          transition: 'all var(--transition-fast)'
        }}
        aria-label="Toggle theme"
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          {isDark ? (
            <FiSun style={{ color: '#F59E0B', fontSize: '1.2rem' }} />
          ) : (
            <FiMoon style={{ color: '#6366F1', fontSize: '1.2rem' }} />
          )}
          {isDark ? 'Light Theme' : 'Dark Theme'}
        </span>
        <span 
          style={{ 
            fontSize: '0.75rem', 
            fontWeight: 700, 
            textTransform: 'uppercase', 
            letterSpacing: '0.5px',
            color: 'var(--color-primary)',
            background: 'var(--color-primary-light)',
            padding: '0.2rem 0.6rem',
            borderRadius: 'var(--radius-sm)'
          }}
        >
          {isDark ? '🌙 Dark' : '☀️ Light'}
        </span>
      </button>
    )
  }

  // Default Header Icon Button
  return (
    <button
      onClick={toggleTheme}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        background: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
        color: 'var(--color-text)',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        boxShadow: 'var(--shadow-sm)',
        transition: 'all var(--transition-fast)',
        flexShrink: 0
      }}
      aria-label={isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}
      title={isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}
    >
      <motion.div
        initial={false}
        animate={{
          scale: isDark ? 1 : 0,
          opacity: isDark ? 1 : 0,
          rotate: isDark ? 0 : -90
        }}
        transition={{ duration: 0.25 }}
        style={{ position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        {/* Sun Icon for switching to light theme */}
        <FiSun style={{ color: '#F59E0B', fontSize: '1.2rem' }} />
      </motion.div>

      <motion.div
        initial={false}
        animate={{
          scale: isDark ? 0 : 1,
          opacity: isDark ? 0 : 1,
          rotate: isDark ? 90 : 0
        }}
        transition={{ duration: 0.25 }}
        style={{ position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        {/* Moon Icon for switching to dark theme */}
        <FiMoon style={{ color: '#475569', fontSize: '1.2rem' }} />
      </motion.div>
    </button>
  )
}
