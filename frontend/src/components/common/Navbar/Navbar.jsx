import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import LogoIcon from '@assets/icons/LogoIcon'
import Button from '../../ui/Button/Button'
import QuoteModal from '../QuoteModal/QuoteModal'
import InstallAppButton from '../InstallAppButton/InstallAppButton'
import { useLogos } from '../../../hooks/useCMS'

export default function Navbar() {
  const { logos } = useLogos()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [quoteModalOpen, setQuoteModalOpen] = useState(false)
  const location = useLocation()

  const [logoError, setLogoError] = useState(false)
  const headerLogoUrl = logoError ? null : (logos?.header?.imageUrl || logos?.white_logo?.imageUrl)
  const headerLogoAlt = logos?.header?.altText || 'EcoMargin Corporate Logo'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('mobile-menu-open')
    } else {
      document.body.classList.remove('mobile-menu-open')
    }
    return () => document.body.classList.remove('mobile-menu-open')
  }, [mobileMenuOpen])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Services', path: '/services' },
    { name: 'Manufacturing', path: '/manufacturing' },
    { name: 'Projects', path: '/projects' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ]

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: 'all var(--transition-normal)',
          background: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.88)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.05)' : 'none',
          height: '80px',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          {/* Corporate Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            {headerLogoUrl ? (
              <img 
                src={headerLogoUrl} 
                alt={headerLogoAlt} 
                onError={() => setLogoError(true)}
                style={{ height: '36px', width: 'auto', objectFit: 'contain' }} 
              />
            ) : (
              <>
                <div style={{ color: 'var(--color-primary)' }}>
                  <LogoIcon size={34} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontFamily: 'Outfit', fontSize: '1.4rem', fontWeight: '800', letterSpacing: '0.5px', color: '#0F172A', lineHeight: 1.1 }}>
                    EcoMargin
                  </span>
                  <span style={{ fontSize: '0.65rem', fontWeight: 600, color: 'var(--color-primary)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                    EV Infrastructure
                  </span>
                </div>
              </>
            )}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex desktop-nav">
            <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', alignItems: 'center', margin: 0, padding: 0 }}>
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    style={{
                      color: location.pathname === link.path ? 'var(--color-primary)' : '#334155',
                      fontWeight: location.pathname === link.path ? '600' : '500',
                      fontSize: '0.95rem',
                      transition: 'color var(--transition-fast)'
                    }}
                    onMouseEnter={(e) => { if (location.pathname !== link.path) e.currentTarget.style.color = 'var(--color-primary)'; }}
                    onMouseLeave={(e) => { if (location.pathname !== link.path) e.currentTarget.style.color = '#334155'; }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div className="hidden lg:flex desktop-actions" style={{ alignItems: 'center', gap: '0.75rem' }}>
              <InstallAppButton placement="nav" />
              <Button variant="primary" size="sm" onClick={() => setQuoteModalOpen(true)}>
                Request Quote
              </Button>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden mobile-hamburger"
              aria-label="Toggle menu"
              style={{
                background: 'transparent',
                border: 'none',
                color: '#0F172A',
                fontSize: '1.5rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer (Placed outside <header> to use viewport fixed containing block) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(15, 23, 42, 0.5)',
                backdropFilter: 'blur(4px)',
                zIndex: 199
              }}
            />

            {/* Drawer Container */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                width: 'min(90vw, 380px)',
                maxWidth: '380px',
                height: '100dvh',
                background: '#FFFFFF',
                boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.15)',
                borderLeft: '1px solid #E2E8F0',
                zIndex: 200,
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto',
                overflowX: 'hidden'
              }}
            >
              {/* Drawer Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 1.5rem', borderBottom: '1px solid #E2E8F0', width: '100%', minWidth: 0, background: '#FFFFFF' }}>
                <span style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.25rem', color: '#0F172A' }}>Menu</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                  style={{
                    background: '#F1F5F9',
                    border: '1px solid #E2E8F0',
                    color: '#0F172A',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    fontSize: '1.1rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all var(--transition-fast)',
                    flexShrink: 0
                  }}
                >
                  ✕
                </button>
              </div>

              {/* Drawer Body Links */}
              <div style={{ flex: 1, padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%', minWidth: 0 }}>
                <ul style={{ listStyle: 'none', gap: '0.4rem', width: '100%', minWidth: 0, padding: 0, margin: 0, display: 'flex', flexDirection: 'column' }}>
                  {navLinks.map((link) => {
                    const isActive = location.pathname === link.path
                    return (
                      <li key={link.name} style={{ width: '100%', minWidth: 0 }}>
                        <Link
                          to={link.path}
                          onClick={() => setMobileMenuOpen(false)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            height: '46px',
                            padding: '0 1rem',
                            fontSize: '1.05rem',
                            color: isActive ? 'var(--color-primary)' : '#1E293B',
                            fontWeight: isActive ? '700' : '500',
                            borderRadius: 'var(--radius-md)',
                            background: isActive ? 'rgba(16, 185, 129, 0.08)' : 'transparent',
                            transition: 'all var(--transition-fast)',
                            width: '100%',
                            minWidth: 0
                          }}
                        >
                          {link.name}
                        </Link>
                      </li>
                    )
                  })}
                </ul>

                <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%', minWidth: 0 }}>
                  <InstallAppButton placement="drawer" />
                  <Button variant="primary" fullWidth onClick={() => { setMobileMenuOpen(false); setQuoteModalOpen(true); }} style={{ height: '48px', flexShrink: 0, fontWeight: 700 }}>
                    Request Quote
                  </Button>
                </div>
              </div>

              {/* Drawer Footer / Contact Block */}
              <div 
                style={{ 
                  padding: '1.5rem', 
                  background: '#F8FAFC', 
                  borderTop: '1px solid #E2E8F0',
                  paddingBottom: 'calc(env(safe-area-inset-bottom) + 24px)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  width: '100%',
                  minWidth: 0
                }}
              >
                <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: '#64748B' }}>
                  Contact Information
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem', color: '#334155', width: '100%', minWidth: 0 }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.7rem', color: '#64748B' }}>Email</span>
                    <a href="mailto:support@ecomargin.in" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 600 }}>
                      support@ecomargin.in
                    </a>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.7rem', color: '#64748B' }}>Phone</span>
                    <a href="tel:+918302313065" style={{ color: '#0F172A', textDecoration: 'none', fontWeight: 600 }}>
                      +91-8302313065
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Global RFQ Quote Modal */}
      <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
    </>
  )
}
