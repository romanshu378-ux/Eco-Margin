import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import LogoIcon from '@assets/icons/LogoIcon'
import ThemeToggle from '../ThemeToggle/ThemeToggle'
import Button from '../../ui/Button/Button'
import QuoteModal from '../QuoteModal/QuoteModal'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [quoteModalOpen, setQuoteModalOpen] = useState(false)
  const location = useLocation()

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

  const navLinks = [
    { name: 'Products', path: '/products' },
    { name: 'Manufacturing', path: '/manufacturing' },
    { name: 'Services', path: '/services' },
    { name: 'Solutions', path: '/solutions' },
    { name: 'Projects', path: '/projects' },
    { name: 'Dealer Partner', path: '/dealer-partner' },
    { name: 'Downloads', path: '/downloads' },
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
          background: isScrolled ? 'var(--color-bg-glass)' : 'rgba(11, 15, 25, 0.75)',
          backdropFilter: 'blur(16px)',
          borderBottom: isScrolled ? '1px solid var(--color-border)' : '1px solid rgba(255, 255, 255, 0.05)',
          padding: isScrolled ? '0.75rem 0' : '1.1rem 0'
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          {/* Corporate Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ color: 'var(--color-primary)' }}>
              <LogoIcon size={34} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontFamily: 'Outfit', fontSize: '1.4rem', fontWeight: '800', letterSpacing: '0.5px', color: '#ffffff', lineHeight: 1.1 }}>
                EcoMargin
              </span>
              <span style={{ fontSize: '0.65rem', fontWeight: 600, color: 'var(--color-primary)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                EV Infrastructure
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: 'none' }} className="desktop-nav">
            <ul style={{ display: 'flex', gap: '1.5rem', listStyle: 'none', alignItems: 'center' }}>
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    style={{ 
                      fontSize: '0.875rem',
                      fontWeight: '500', 
                      color: location.pathname === link.path ? 'var(--color-primary)' : 'var(--color-text-muted)',
                      transition: 'color 0.2s',
                      position: 'relative'
                    }}
                  >
                    {link.name}
                    {location.pathname === link.path && (
                      <motion.div
                        layoutId="nav-indicator"
                        style={{
                          position: 'absolute',
                          bottom: '-4px',
                          left: 0,
                          right: 0,
                          height: '2px',
                          background: 'var(--color-primary)',
                          borderRadius: '2px'
                        }}
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop Actions */}
          <div style={{ display: 'none', alignItems: 'center', gap: '1rem' }} className="desktop-actions">
            <ThemeToggle />
            <Button variant="primary" onClick={() => setQuoteModalOpen(true)}>
              Request Quote
            </Button>
          </div>

          {/* Mobile Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }} className="mobile-toggle">
            <ThemeToggle />
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ color: 'var(--color-text)', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d={mobileMenuOpen ? "M18 6L6 18M6 6l12 12" : "M3 12h18M3 6h18M3 18h18"} strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              top: '72px',
              left: 0,
              right: 0,
              bottom: 0,
              background: 'var(--color-bg)',
              zIndex: 99,
              padding: '2rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem'
            }}
          >
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', listStyle: 'none' }}>
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    style={{ 
                      fontSize: '1.25rem',
                      fontFamily: 'Outfit',
                      fontWeight: '600',
                      color: location.pathname === link.path ? 'var(--color-primary)' : 'var(--color-text)'
                    }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: 'auto' }}>
              <Button variant="primary" fullWidth onClick={() => { setMobileMenuOpen(false); setQuoteModalOpen(true); }}>
                Request Commercial Quote
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />

      <style>{`
        @media (min-width: 992px) {
          .desktop-nav { display: block !important; }
          .desktop-actions { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </>
  )
}
