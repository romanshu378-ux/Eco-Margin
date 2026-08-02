import React from 'react'
import { Link } from 'react-router-dom'
import LogoIcon from '@assets/icons/LogoIcon'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer style={{ 
      background: 'var(--color-bg-alt)', 
      borderTop: '1px solid var(--color-border)',
      padding: '4rem 0 2rem 0',
      marginTop: 'auto'
    }}>
      <div className="container">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '3rem',
          marginBottom: '3rem'
        }}>
          {/* Brand Col */}
          <div>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <div style={{ color: 'var(--color-primary)' }}><LogoIcon size={28} /></div>
              <span style={{ fontFamily: 'Outfit', fontSize: '1.25rem', fontWeight: '700' }}>EcoMargin</span>
            </Link>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              Pioneering the future of electric mobility with seamless charging infrastructure management across the globe.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {/* Social icons placeholders */}
              {['Twitter', 'LinkedIn', 'GitHub'].map(social => (
                <a key={social} href="#" style={{ 
                  width: '36px', height: '36px', borderRadius: '50%', 
                  background: 'var(--color-bg-card)', border: '1px solid var(--color-border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--color-text)', fontSize: '0.8rem'
                }}>
                  {social[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Links Col 1 */}
          <div>
            <h4 style={{ marginBottom: '1.5rem', fontSize: '1rem' }}>Platform</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {['Find Stations', 'Pricing Plans', 'Operator Dashboard', 'Mobile App'].map(link => (
                <li key={link}><a href="#" style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>{link}</a></li>
              ))}
            </ul>
          </div>

          {/* Links Col 2 */}
          <div>
            <h4 style={{ marginBottom: '1.5rem', fontSize: '1rem' }}>Company</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {['About Us', 'Careers', 'Blog', 'Contact'].map(link => (
                <li key={link}>
                  <Link to={`/${link.toLowerCase().replace(' ', '-')}`} style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>{link}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Col */}
          <div>
            <h4 style={{ marginBottom: '1.5rem', fontSize: '1rem' }}>Stay Updated</h4>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1rem', fontSize: '0.9rem' }}>
              Subscribe to our newsletter for the latest EV news.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input 
                type="email" 
                placeholder="Email address" 
                style={{ 
                  flex: 1, padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)',
                  background: 'var(--color-bg)', border: '1px solid var(--color-border)',
                  color: 'var(--color-text)', outline: 'none'
                }} 
              />
              <button style={{ 
                padding: '0 1rem', background: 'var(--color-primary)', color: '#0f0f1a',
                borderRadius: 'var(--radius-md)', fontWeight: '600'
              }}>
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div style={{ 
          borderTop: '1px solid var(--color-border)', 
          paddingTop: '2rem',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
            &copy; {currentYear} EcoMargin. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link to="/privacy-policy" style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Privacy Policy</Link>
            <Link to="/terms" style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
