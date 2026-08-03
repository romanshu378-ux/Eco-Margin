import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import LogoIcon from '@assets/icons/LogoIcon'
import ThemeToggle from '../ThemeToggle/ThemeToggle'
import Button from '../../ui/Button/Button'
import QuoteModal from '../QuoteModal/QuoteModal'
import { useLogos } from '../../../hooks/useCMS'

export default function Navbar() {
  const { logos } = useLogos()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [quoteModalOpen, setQuoteModalOpen] = useState(false)
  const location = useLocation()

  const headerLogoUrl = logos?.header?.imageUrl || logos?.white_logo?.imageUrl
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

  const navLinks = [
    { name: 'Products', path: '/products' },
    { name: 'Manufacturing', path: '/manufacturing' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Certificates', path: '/downloads' },
    { name: 'About Us', path: '/about' },
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
            {headerLogoUrl ? (
              <img 
                src={headerLogoUrl} 
                alt={headerLogoAlt} 
                style={{ height: '36px', width: 'auto', objectFit: 'contain' }} 
              />
            ) : (
              <>
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
              </>
            )}
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: 'none' }} className="desktop-nav">
            <ul style={{ display: 'flex', gap: '1.5rem', listStyle: 'none', alignItems: 'center' }}>
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    style={{
                      color: location.pathname === link.path ? 'var(--color-primary)' : 'var(--color-text)',
                      fontWeight: location.pathname === link.path ? '600' : '400',
                      fontSize: '0.9rem',
                      transition: 'color var(--transition-fast)'
                    }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <ThemeToggle />
            <div style={{ display: 'none' }} className="desktop-actions">
              <Button variant="primary" size="sm" onClick={() => setQuoteModalOpen(true)}>
                Request Quote
              </Button>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-hamburger"
              aria-label="Toggle menu"
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--color-text)',
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

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{
                background: 'var(--color-bg)',
                borderBottom: '1px solid var(--color-border)',
                overflow: 'hidden'
              }}
            >
              <div className="container" style={{ padding: '1.5rem 1rem' }}>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {navLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.path}
                        style={{
                          fontSize: '1.1rem',
                          color: location.pathname === link.path ? 'var(--color-primary)' : 'var(--color-text)',
                          fontWeight: location.pathname === link.path ? '600' : '400'
                        }}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                  <li style={{ paddingTop: '0.5rem' }}>
                    <Button variant="primary" fullWidth onClick={() => { setMobileMenuOpen(false); setQuoteModalOpen(true); }}>
                      Request Quote
                    </Button>
                  </li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Global RFQ Quote Modal */}
      <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
    </>
  )
}
