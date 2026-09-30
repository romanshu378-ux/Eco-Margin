import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEO from '@seo/SEO'
import Button from '@components/ui/Button/Button'
import { PATHS } from '@routes/paths'
import PageHeader from '@components/common/PageHeader/PageHeader'
import { FiHome, FiZap, FiGrid, FiTool, FiPhoneCall } from 'react-icons/fi'

export default function NotFoundPage() {
  const quickLinks = [
    { label: 'Home Page', path: PATHS.HOME, icon: <FiHome />, desc: 'Return to corporate overview' },
    { label: 'EV Chargers', path: PATHS.PRODUCTS, icon: <FiZap />, desc: 'AC & DC fast charging spectrum' },
    { label: 'Industry Solutions', path: PATHS.SOLUTIONS, icon: <FiGrid />, desc: 'Fleets, highways & commercial' },
    { label: 'EPC & AMC Services', path: PATHS.SERVICES, icon: <FiTool />, desc: 'Turnkey installation & support' },
    { label: 'Contact Us', path: PATHS.CONTACT, icon: <FiPhoneCall />, desc: 'Speak with technical sales' },
  ]

  return (
    <>
      <SEO 
        title="Page Not Found | EcoMargin LLP" 
        description="The page you requested could not be found. Explore EcoMargin EV charging infrastructure, AC/DC chargers, and turnkey solutions." 
        robots="noindex, nofollow"
        pageRoute="/404"
      />
      
      <PageHeader title="Page Not Found" description="Error 404 — The requested URL was not found on this server." bgGradient="var(--color-error)" />

      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        textAlign: 'center', 
        padding: '5rem 2rem 6rem' 
      }}>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.5 }} 
          style={{ position: 'relative', marginBottom: '1.5rem' }}
        >
          <div style={{ fontSize: 'clamp(5rem, 12vw, 8rem)', fontFamily: 'Outfit', fontWeight: '800', color: 'var(--color-bg-card)', lineHeight: 1 }}>
            404
          </div>
          <div style={{ 
            position: 'absolute', 
            top: '50%', left: '50%', 
            transform: 'translate(-50%, -50%)', 
            fontSize: '3rem', 
            color: 'var(--color-error)' 
          }}>
            ⚡
          </div>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.1 }} 
          style={{ fontSize: '2rem', marginBottom: '0.75rem', fontFamily: 'Outfit, sans-serif' }}
        >
          Out of Juice
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.2 }} 
          style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', maxWidth: '520px', marginBottom: '3rem' }}
        >
          The page you are looking for has been unplugged, moved, or no longer exists. Use the quick links below to find what you need.
        </motion.p>
        
        {/* Helpful Quick Navigation Links */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.3 }}
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '1rem', 
            maxWidth: '900px', 
            width: '100%', 
            marginBottom: '3rem' 
          }}
        >
          {quickLinks.map((item, idx) => (
            <Link 
              key={idx} 
              to={item.path}
              style={{
                background: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem',
                textDecoration: 'none',
                textAlign: 'left',
                transition: 'border-color 0.2s, transform 0.2s',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)', fontWeight: '700', fontSize: '1rem' }}>
                {item.icon} {item.label}
              </div>
              <span style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>
                {item.desc}
              </span>
            </Link>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Link to={PATHS.HOME}>
            <Button variant="primary" size="lg">Return to Homepage</Button>
          </Link>
        </motion.div>
      </div>
    </>
  )
}
