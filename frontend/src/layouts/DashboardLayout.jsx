import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { pageTransition } from '@animations/variants'
import Navbar from '@components/common/Navbar/Navbar'

export default function DashboardLayout() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--color-bg)' }}>
      <Navbar />
      
      <div className="container" style={{ display: 'flex', flex: 1, paddingTop: '100px', gap: '2rem' }}>
        {/* Simple Sidebar */}
        <aside style={{ 
          width: '250px', 
          flexDirection: 'column',
          gap: '0.5rem',
          display: typeof window !== 'undefined' && window.innerWidth > 768 ? 'flex' : 'none'
        }}>
          {['Overview', 'My Bookings', 'Wallet', 'Settings'].map((item, i) => (
            <Link 
              key={item} 
              to={i === 0 ? '/dashboard' : `/dashboard/${item.toLowerCase().replace(' ', '-')}`}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                color: i === 0 ? 'var(--color-primary)' : 'var(--color-text)',
                background: i === 0 ? 'var(--color-primary-light)' : 'transparent',
                fontWeight: i === 0 ? '600' : '500'
              }}
            >
              {item}
            </Link>
          ))}
        </aside>

        <motion.main 
          style={{ flex: 1, paddingBottom: '3rem' }}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageTransition}
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  )
}
