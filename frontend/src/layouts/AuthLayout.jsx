import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { pageTransition } from '@animations/variants'
import LogoIcon from '@assets/icons/LogoIcon'

export default function AuthLayout() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      background: 'var(--color-bg)'
    }}>
      {/* Simple Header */}
      <header style={{ padding: '1.5rem', display: 'flex', justifyContent: 'center' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ color: 'var(--color-primary)' }}><LogoIcon size={32} /></div>
          <span style={{ fontFamily: 'Outfit', fontSize: '1.5rem', fontWeight: '700' }}>EcoMargin</span>
        </Link>
      </header>

      {/* Content Area */}
      <motion.main 
        style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageTransition}
      >
        <Outlet />
      </motion.main>
    </div>
  )
}
