import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import LogoIcon from '@assets/icons/LogoIcon'
import ThemeToggle from '../ThemeToggle/ThemeToggle'
import Button from '../../ui/Button/Button'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  const navLinks = [
    { name: 'Products', path: '/products' },
    { name: 'Solutions', path: '/solutions' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'About', path: '/about' },
    { name: 'Career', path: '/career' },
    { name: 'Contact', path: '/contact' }
  ]

  // A helper function to create a dropdown menu for desktop (since 9 links is too many for one row usually, 
  // but for now I will just rely on flex-wrap and responsive scaling. Given the request, I'll display them inline 
  // but slightly smaller font size to fit).


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
          background: isScrolled ? 'var(--color-bg-glass)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(12px)' : 'none',
          borderBottom: isScrolled ? '1px solid var(--color-border)' : '1px solid transparent',
          padding: isScrolled ? '0.75rem 0' : '1.25rem 0'
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ color: 'var(--color-primary)' }}>
              <LogoIcon size={32} />
            </div>
            <span style={{ fontFamily: 'Outfit', fontSize: '1.5rem', fontWeight: '700', letterSpacing: '0.5px' }}>
              EcoMargin
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: 'none' }} className="desktop-nav">
            <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none' }}>
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    style={{ 
                      fontWeight: '500', 
                      color: location.pathname === link.path ? 'var(--color-primary)' : 'var(--color-text)',
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
            <Link to="/login">
              <Button variant="ghost">Log in</Button>
            </Link>
            <Link to="/register">
              <Button variant="primary">Sign up</Button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }} className="mobile-toggle">
            <ThemeToggle />
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ color: 'var(--color-text)' }}
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
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', listStyle: 'none' }}>
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    style={{ 
                      fontSize: '1.5rem',
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
              <Link to="/login" style={{ width: '100%' }}>
                <Button variant="outline" fullWidth>Log in</Button>
              </Link>
              <Link to="/register" style={{ width: '100%' }}>
                <Button variant="primary" fullWidth>Sign up</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: block !important; }
          .desktop-actions { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </>
  )
}
