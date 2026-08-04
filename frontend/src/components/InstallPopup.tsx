// EcoMargin PWA — Install Popup Component (TypeScript Edition)
// src/components/InstallPopup.tsx

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiDownload, FiShare, FiPlusSquare, FiX } from 'react-icons/fi';
import { usePWAInstall } from '../hooks/usePWAInstall';

export default function InstallPopup() {
  const { isInstallable, isInstalled, isIOS, isSafari, installApp, dismissPrompt } = usePWAInstall();
  const [shouldShow, setShouldShow] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    if (!isInstallable && !(isIOS && isSafari)) return;
    if (isInstalled) return;

    const timer = setTimeout(() => {
      setShouldShow(true);
    }, 8000);

    return () => clearTimeout(timer);
  }, [isInstallable, isInstalled, isIOS, isSafari]);

  if (!shouldShow) return null;

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowIOSInstructions(true);
    } else {
      const success = await installApp();
      if (success) {
        setShouldShow(false);
      }
    }
  };

  const handleDismiss = () => {
    setShouldShow(false);
    dismissPrompt();
  };

  const logoUrl = logoError
    ? 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" style="background:%230F9D58"><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-weight="bold" font-family="sans-serif" font-size="14">EM</text></svg>'
    : 'https://res.cloudinary.com/dcumpbswm/image/upload/v1785843387/dark_mfegwj.png';

  return (
    <AnimatePresence>
      {shouldShow && (
        <div className="pwa-install-popup" style={{ position: 'fixed', bottom: '2rem', left: '1.5rem', zIndex: 1000, width: 'calc(100% - 3rem)', maxWidth: '420px' }}>
          {!showIOSInstructions ? (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{
                background: 'var(--color-bg-glass)',
                backdropFilter: 'blur(20px)',
                border: '1px solid var(--color-border)',
                borderRadius: '20px',
                padding: '2rem',
                boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem'
              }}
            >
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <img
                  src={logoUrl}
                  alt="EcoMargin Logo"
                  onError={() => setLogoError(true)}
                  style={{ width: '48px', height: '48px', objectFit: 'contain' }}
                />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-text)' }}>Install EcoMargin App</h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.1rem' }}>Enterprise EV Charging Platform</span>
                </div>
              </div>

              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: '1.5' }}>
                Get a faster, app-like experience with offline support and instant home screen access.
              </p>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button
                  onClick={handleInstallClick}
                  style={{
                    flex: 1,
                    background: 'var(--color-primary)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '10px',
                    height: '44px',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    boxShadow: '0 4px 12px rgba(15, 157, 88, 0.2)'
                  }}
                >
                  <FiDownload size={16} /> Install
                </button>
                <button
                  onClick={handleDismiss}
                  style={{
                    flex: 1,
                    background: 'var(--color-bg-alt)',
                    color: 'var(--color-text)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '10px',
                    height: '44px',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  Maybe Later
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              style={{
                background: 'var(--color-bg-glass)',
                backdropFilter: 'blur(20px)',
                border: '1px solid var(--color-border)',
                borderRadius: '20px',
                padding: '2rem',
                boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-text)' }}>iOS Installation Guide</h3>
                <button
                  onClick={() => setShowIOSInstructions(false)}
                  style={{ background: 'transparent', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', padding: '0.25rem' }}
                >
                  <FiX size={18} />
                </button>
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', display: 'flex', flexDirection: 'column', gap: '1rem', lineHeight: '1.5' }}>
                <div>
                  1. Tap the Share button in Safari toolbar: 
                  <div style={{ display: 'inline-flex', alignItems: 'center', background: 'var(--color-bg-alt)', padding: '0.25rem 0.5rem', borderRadius: '6px', marginLeft: '0.5rem' }}>
                    <FiShare style={{ color: 'var(--color-primary)' }} /> <span style={{ fontSize: '0.75rem', marginLeft: '4px' }}>Share</span>
                  </div>
                </div>
                <div>
                  2. Select "Add to Home Screen" from menu list:
                  <div style={{ display: 'inline-flex', alignItems: 'center', background: 'var(--color-bg-alt)', padding: '0.25rem 0.5rem', borderRadius: '6px', marginLeft: '0.5rem' }}>
                    <FiPlusSquare style={{ color: 'var(--color-primary)' }} /> <span style={{ fontSize: '0.75rem', marginLeft: '4px' }}>Add</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </AnimatePresence>
  );
}
