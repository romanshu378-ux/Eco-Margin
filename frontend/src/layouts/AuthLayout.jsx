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
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }} aria-label="EcoMargin Home">
          <img src="/logo.png" alt="EcoMargin Logo" className="navbar-brand-logo" style={{ height: '48px', width: 'auto' }} />
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
