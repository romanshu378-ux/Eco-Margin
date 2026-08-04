// EcoMargin PWA — Update Toast Notification Component (TypeScript Edition)
// src/components/UpdateToast.tsx

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiRefreshCw, FiCheckCircle, FiX } from 'react-icons/fi';
import { useAppUpdate } from '../hooks/useAppUpdate';

export default function UpdateToast() {
  const { updateAvailable, updateSuccess, updateApp } = useAppUpdate();
  const [showPrompt, setShowPrompt] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (updateAvailable) {
      setShowPrompt(true);
    }
  }, [updateAvailable]);

  useEffect(() => {
    if (updateSuccess) {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [updateSuccess]);

  const handleUpdate = () => {
    setShowPrompt(false);
    updateApp();
  };

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            zIndex: 1100,
            background: 'var(--color-bg-glass)',
            backdropFilter: 'blur(20px)',
            border: '1px solid var(--color-border)',
            borderRadius: '16px',
            padding: '1.25rem 1.5rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem',
            maxWidth: '400px',
            width: 'calc(100% - 4rem)'
          }}
        >
          <div style={{ background: 'rgba(15, 157, 88, 0.1)', color: 'var(--color-primary)', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <FiRefreshCw size={20} className="spin-animation" />
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-text)' }}>New Version Available</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>🚀 A new version of EcoMargin is available.</span>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <button
              onClick={handleUpdate}
              style={{
                background: 'var(--color-primary)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '0.5rem 0.75rem',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Update Now
            </button>
            <button
              onClick={() => setShowPrompt(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--color-text-muted)',
                cursor: 'pointer',
                padding: '0.25rem'
              }}
              aria-label="Later"
            >
              <FiX size={18} />
            </button>
          </div>
          <style>{`
            .spin-animation {
              animation: spin 3s linear infinite;
            }
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </motion.div>
      )}

      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            zIndex: 1100,
            background: 'var(--color-bg-glass)',
            backdropFilter: 'blur(20px)',
            border: '1px solid var(--color-primary)',
            borderRadius: '12px',
            padding: '1rem 1.5rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            maxWidth: '400px',
            width: 'calc(100% - 4rem)'
          }}
        >
          <FiCheckCircle size={20} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text)' }}>
            ✅ EcoMargin has been updated successfully.
          </span>
          <button
            onClick={() => setShowSuccess(false)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--color-text-muted)',
              cursor: 'pointer',
              marginLeft: 'auto',
              padding: '0.25rem'
            }}
          >
            <FiX size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
