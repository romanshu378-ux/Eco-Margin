import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import LogoIcon from '@assets/icons/LogoIcon'
import ThemeToggle from '../ThemeToggle/ThemeToggle'
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
          background: isScrolled ? 'var(--color-bg-glass)' : 'rgba(11, 15, 25, 0.75)',
          backdropFilter: 'blur(16px)',
          borderBottom: isScrolled ? '1px solid var(--color-border)' : '1px solid rgba(255, 255, 255, 0.05)',
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
          <nav className="hidden lg:flex desktop-nav">
            <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', alignItems: 'center', margin: 0, padding: 0 }}>
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-white hover:text-primary transition"
                    style={{
                      color: location.pathname === link.path ? 'var(--color-primary)' : undefined,
                      fontWeight: location.pathname === link.path ? '600' : '400',
                      fontSize: '0.95rem'
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
                  background: 'rgba(0, 0, 0, 0.6)',
                  backdropFilter: 'blur(8px)',
                  zIndex: 199
                }}
              />

              {/* Drawer Container */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                style={{
                  position: 'fixed',
                  top: 0,
                  right: 0,
                  bottom: 0,
                  width: 'min(92vw, 420px)',
                  maxWidth: '420px',
                  height: '100dvh',
                  background: 'var(--color-bg-card)',
                  boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.25)',
                  borderLeft: '1px solid var(--color-border)',
                  zIndex: 200,
                  display: 'flex',
                  flexDirection: 'column',
                  overflowY: 'auto',
                  overflowX: 'hidden'
                }}
              >
                {/* Drawer Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem', borderBottom: '1px solid var(--color-border)', width: '100%', minWidth: 0 }}>
                  <span style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.2rem', color: 'var(--color-text)', overflowWrap: 'anywhere', wordBreak: 'break-word', whiteSpace: 'normal' }}>Menu</span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      background: 'var(--color-bg-alt)',
                      border: 'none',
                      color: 'var(--color-text)',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      fontSize: '1.2rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'background var(--transition-fast)',
                      flexShrink: 0
                    }}
                  >
                    ✕
                  </button>
                </div>

                {/* Drawer Body Links */}
                <div style={{ flex: 1, padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%', minWidth: 0 }}>
                  <ul className="grid grid-cols-1 sm:grid-cols-2" style={{ listStyle: 'none', gap: '0.5rem', width: '100%', minWidth: 0, padding: 0, margin: 0 }}>
                    {navLinks.map((link) => (
                      <li key={link.name} style={{ width: '100%', minWidth: 0 }}>
                        <Link
                          to={link.path}
                          onClick={() => setMobileMenuOpen(false)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            height: 'auto',
                            minHeight: '48px', // Touch target helper
                            padding: '0.5rem 1rem',
                            fontSize: '1.1rem',
                            color: location.pathname === link.path ? 'var(--color-primary)' : 'var(--color-text)',
                            fontWeight: location.pathname === link.path ? '700' : '500',
                            borderRadius: 'var(--radius-md)',
                            background: location.pathname === link.path ? 'rgba(16, 185, 129, 0.08)' : 'transparent',
                            transition: 'all var(--transition-fast)',
                            width: '100%',
                            minWidth: 0,
                            overflowWrap: 'anywhere',
                            wordBreak: 'break-word',
                            whiteSpace: 'normal'
                          }}
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%', minWidth: 0 }}>
                    <InstallAppButton placement="drawer" />
                    <Button variant="primary" fullWidth onClick={() => { setMobileMenuOpen(false); setQuoteModalOpen(true); }} style={{ height: '48px', flexShrink: 0 }}>
                      Request Quote
                    </Button>
                  </div>
                </div>

                {/* Drawer Footer / Contact Block */}
                <div 
                  style={{ 
                    padding: '2rem 1.5rem', 
                    background: 'var(--color-bg-alt)', 
                    borderTop: '1px solid var(--color-border)',
                    paddingBottom: 'calc(env(safe-area-inset-bottom) + 32px)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    width: '100%',
                    minWidth: 0
                  }}
                >
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-text-muted)', overflowWrap: 'anywhere', wordBreak: 'break-word', whiteSpace: 'normal' }}>
                    Contact Information
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--color-text)', width: '100%', minWidth: 0 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', minWidth: 0 }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Email</span>
                      <a href="mailto:support@ecomargin.in" style={{ color: 'var(--color-primary)', textDecoration: 'none', overflowWrap: 'anywhere', wordBreak: 'break-word', whiteSpace: 'normal', width: '100%', minWidth: 0 }}>
                        support@ecomargin.in
                      </a>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', minWidth: 0 }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Phone</span>
                      <a href="tel:+918302313065" style={{ color: 'var(--color-text)', textDecoration: 'none', overflowWrap: 'anywhere', wordBreak: 'break-word', whiteSpace: 'normal', width: '100%', minWidth: 0 }}>
                        +91-8302313065
                      </a>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', minWidth: 0 }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Corporate Address</span>
                      <span style={{ lineHeight: '1.4', overflowWrap: 'anywhere', wordBreak: 'break-word', whiteSpace: 'normal', width: '100%', minWidth: 0 }}>
                        NH-11, iStart Nest, Govt Engineering College, Bharatpur, Rajasthan - 321001
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      {/* Global RFQ Quote Modal */}
      <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
    </>
  )
}
