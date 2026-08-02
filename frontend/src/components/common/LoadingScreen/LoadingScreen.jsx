import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LogoIcon from '@assets/icons/LogoIcon'

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(() => setIsVisible(false), 500)
          return 100
        }
        // Random jump between 5 and 20
        return prev + Math.floor(Math.random() * 15) + 5
      })
    }, 150)

    return () => clearInterval(timer)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--color-bg)',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                filter: ['drop-shadow(0 0 0px var(--color-primary))', 'drop-shadow(0 0 20px var(--color-primary))', 'drop-shadow(0 0 0px var(--color-primary))']
              }}
              transition={{ repeat: Infinity, duration: 2 }}
              style={{ color: 'var(--color-primary)' }}
            >
              <LogoIcon size={64} />
            </motion.div>
            
            <h2 style={{ fontFamily: 'Outfit', fontSize: '2rem', letterSpacing: '2px' }}>
              EcoMargin
            </h2>

            <div style={{ 
              width: '200px', 
              height: '4px', 
              background: 'var(--color-border)', 
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                style={{ height: '100%', background: 'var(--color-primary)' }}
                transition={{ ease: "linear", duration: 0.2 }}
              />
            </div>
            
            <div style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', fontFamily: 'monospace' }}>
              INITIALIZING {progress}%
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
