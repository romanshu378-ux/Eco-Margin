// EcoMargin PWA — Reusable Install Button Component
// src/components/common/InstallAppButton/InstallAppButton.jsx

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiDownload, FiShare, FiPlusSquare, FiX } from 'react-icons/fi'
import usePWAInstall from '@hooks/usePWAInstall'

export default function InstallAppButton({ placement = 'floating' }) {
  const { isInstallable, isInstalled, isIOS, isSafari, installApp } = usePWAInstall()
  const [showIOSInstructions, setShowIOSInstructions] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  // Render nothing if app is already installed or user dismissed the prompt
  if (isInstalled || dismissed) return null

  // Helper to trigger installation
  const handleInstall = async () => {
    if (isIOS) {
      setShowIOSInstructions(true)
    } else {
      await installApp()
    }
  }

  // Floating Placement Banner
  if (placement === 'floating') {
    // Only show if installable on Android/Chrome or if on iOS Safari to guide the user
    const shouldShowFloating = isInstallable || (isIOS && isSafari)
    if (!shouldShowFloating) return null

    return (
      <AnimatePresence>
        {!showIOSInstructions ? (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            style={{
              position: 'fixed',
              bottom: '2rem',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 90,
              width: 'calc(100% - 2rem)',
              maxWidth: '400px',
              background: 'var(--color-bg-glass)',
              backdropFilter: 'blur(16px)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-xl)',
              padding: '1.25rem',
              boxShadow: 'var(--shadow-xl)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-text)' }}>EcoMargin Mobile App</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Install for offline access & faster performance.</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button
                onClick={handleInstall}
                style={{
                  background: 'var(--color-primary)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.6rem 1rem',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)'
                }}
              >
                <FiDownload size={14} /> Install
              </button>
              <button
                onClick={() => setDismissed(true)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--color-text-muted)',
                  cursor: 'pointer',
                  padding: '0.25rem'
                }}
                aria-label="Dismiss"
              >
                <FiX size={16} />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            style={{
              position: 'fixed',
              bottom: '2rem',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 90,
              width: 'calc(100% - 2rem)',
              maxWidth: '400px',
              background: 'var(--color-bg-glass)',
              backdropFilter: 'blur(16px)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-xl)',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-xl)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 700, color: 'var(--color-text)' }}>iOS Installation Guide</span>
              <button onClick={() => setShowIOSInstructions(false)} style={{ background: 'transparent', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer' }}>
                <FiX size={16} />
              </button>
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <p>1. Tap the Share button in Safari toolbar: <FiShare style={{ color: 'var(--color-primary)', display: 'inline', margin: '0 2px' }} /></p>
              <p>2. Scroll down and select "Add to Home Screen": <FiPlusSquare style={{ color: 'var(--color-primary)', display: 'inline', margin: '0 2px' }} /></p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }

  // Navbar button placement
  if (placement === 'nav') {
    if (!isInstallable) return null
    return (
      <button
        onClick={handleInstall}
        style={{
          background: '#F1F5F9',
          color: '#0F172A',
          border: '1px solid #CBD5E1',
          borderRadius: 'var(--radius-md)',
          padding: '0.5rem 0.75rem',
          fontSize: '0.85rem',
          fontWeight: 600,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          transition: 'all var(--transition-fast)'
        }}
      >
        <FiDownload /> Install App
      </button>
    )
  }

  // Drawer placement
  if (placement === 'drawer') {
    if (!isInstallable && !(isIOS && isSafari)) return null
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <button
          onClick={handleInstall}
          style={{
            background: 'var(--color-bg)',
            color: 'var(--color-text)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            height: '48px',
            fontSize: '1rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            width: '100%'
          }}
        >
          <FiDownload /> Install EcoMargin App
        </button>
        {showIOSInstructions && (
          <div style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', padding: '1rem', borderRadius: 'var(--radius-md)', fontSize: '0.8rem', color: 'var(--color-text-muted)', lineHeight: '1.4' }}>
            Tap <FiShare style={{ color: 'var(--color-primary)' }} /> in browser tab and select "Add to Home Screen" <FiPlusSquare style={{ color: 'var(--color-primary)' }} />.
          </div>
        )}
      </div>
    )
  }

  return null
}
