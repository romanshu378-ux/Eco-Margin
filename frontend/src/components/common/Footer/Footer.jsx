// EcoMargin Frontend — Dynamic Footer Component
// src/components/common/Footer/Footer.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import LogoIcon from '@assets/icons/LogoIcon'
import { FiShield, FiCheckCircle, FiPhoneCall, FiMail, FiMapPin } from 'react-icons/fi'
import { useFooterCMS } from '../../../hooks/useCMS'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { data: footerCMS } = useFooterCMS()

  const companyName = footerCMS?.companyName || ''
  const address = footerCMS?.address || ''
  const phone = footerCMS?.phone || ''
  const altPhone = footerCMS?.altPhone || ''
  const email = footerCMS?.email || ''
  const copyright = footerCMS?.copyright || `© ${currentYear} All Rights Reserved.`

  return (
    <footer style={{ 
      background: '#0B0F19', 
      borderTop: '1px solid var(--color-border)',
      padding: '4rem 0 2rem 0',
      color: 'var(--color-text)',
      marginTop: 'auto'
    }}>
      <div className="container">
        
        {/* Top Badges Bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
          paddingBottom: '3rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          marginBottom: '3rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <FiShield style={{ fontSize: '1.75rem', color: 'var(--color-primary)' }} />
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>ARAI & CE Certified</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Tested for Indian Grid Standards</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <FiCheckCircle style={{ fontSize: '1.75rem', color: 'var(--color-primary)' }} />
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>OCPP 2.0.1 Compliant</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Universal CPO Interoperability</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <FiPhoneCall style={{ fontSize: '1.75rem', color: 'var(--color-primary)' }} />
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>24/7 Remote NOC</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>AMC & On-site Field Support</div>
            </div>
          </div>
        </div>

        {/* Footer Links Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '2.5rem',
          marginBottom: '3rem'
        }}>
          {/* Company Bio */}
          <div style={{ gridColumn: 'span 2' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
              <div style={{ color: 'var(--color-primary)' }}><LogoIcon size={30} /></div>
              <span style={{ fontFamily: 'Outfit', fontSize: '1.4rem', fontWeight: '800', color: '#ffffff' }}>
                EcoMargin
              </span>
            </Link>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: 1.6 }}>
              {companyName ? `${companyName} is a leading OEM EV Charger Manufacturer and Infrastructure EPC Contractor.` : 'Leading OEM EV Charger Manufacturer & Infrastructure EPC Contractor.'}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              {address && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FiMapPin style={{ color: 'var(--color-primary)' }} /> Registered Address: {address}
                </div>
              )}
              {phone && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FiPhoneCall style={{ color: 'var(--color-primary)' }} /> Sales & Support: {phone} {altPhone ? `/ ${altPhone}` : ''}
                </div>
              )}
              {email && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FiMail style={{ color: 'var(--color-primary)' }} /> Sales Enquiries: {email}
                </div>
              )}
            </div>
          </div>

          {/* Manufacturing Range */}
          <div>
            <h4 style={{ marginBottom: '1.25rem', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-primary)' }}>
              Charger Range
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem' }}>
              <li><Link to="/products" style={{ color: 'var(--color-text-muted)' }}>3.3kW / 7.4kW AC Single Phase</Link></li>
              <li><Link to="/products" style={{ color: 'var(--color-text-muted)' }}>11kW / 22kW AC Three Phase</Link></li>
              <li><Link to="/products" style={{ color: 'var(--color-text-muted)' }}>30kW / 60kW DC Fast Station</Link></li>
              <li><Link to="/products" style={{ color: 'var(--color-text-muted)' }}>120kW / 160kW Dual Gun DC</Link></li>
              <li><Link to="/products" style={{ color: 'var(--color-text-muted)' }}>240kW Heavy Bus Charger</Link></li>
              <li><Link to="/products" style={{ color: 'var(--color-text-muted)' }}>Portable Fleet Chargers</Link></li>
            </ul>
          </div>

          {/* Solutions & EPC */}
          <div>
            <h4 style={{ marginBottom: '1.25rem', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-primary)' }}>
              Solutions & Services
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem' }}>
              <li><Link to="/services" style={{ color: 'var(--color-text-muted)' }}>Turnkey EPC Installation</Link></li>
              <li><Link to="/solutions" style={{ color: 'var(--color-text-muted)' }}>OCPP Cloud CSMS Software</Link></li>
              <li><Link to="/services" style={{ color: 'var(--color-text-muted)' }}>Annual Maintenance (AMC)</Link></li>
              <li><Link to="/manufacturing" style={{ color: 'var(--color-text-muted)' }}>OEM & White Label Supply</Link></li>
              <li><Link to="/dealer-partner" style={{ color: 'var(--color-text-muted)' }}>CPO & Franchise Partner</Link></li>
              <li><Link to="/downloads" style={{ color: 'var(--color-text-muted)' }}>Datasheets & Certificates</Link></li>
            </ul>
          </div>

          {/* Corporate Links */}
          <div>
            <h4 style={{ marginBottom: '1.25rem', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-primary)' }}>
              Corporate
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem' }}>
              <li><Link to="/about" style={{ color: 'var(--color-text-muted)' }}>About EcoMargin</Link></li>
              <li><Link to="/projects" style={{ color: 'var(--color-text-muted)' }}>Completed Projects</Link></li>
              <li><Link to="/blogs" style={{ color: 'var(--color-text-muted)' }}>Industry Insights</Link></li>
              <li><Link to="/career" style={{ color: 'var(--color-text-muted)' }}>Careers</Link></li>
              <li><Link to="/contact" style={{ color: 'var(--color-text-muted)' }}>Contact Sales</Link></li>
              <li><Link to="/privacy-policy" style={{ color: 'var(--color-text-muted)' }}>Privacy Policy</Link></li>
            </ul>
          </div>

        </div>

        {/* Copyright Bar */}
        <div style={{ 
          borderTop: '1px solid rgba(255, 255, 255, 0.08)', 
          paddingTop: '1.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          fontSize: '0.8rem',
          color: 'var(--color-text-muted)'
        }}>
          <p>{copyright}</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link to="/privacy-policy" style={{ color: 'var(--color-text-muted)' }}>Privacy Policy</Link>
            <Link to="/terms" style={{ color: 'var(--color-text-muted)' }}>Terms of Service</Link>
            <Link to="/contact" style={{ color: 'var(--color-text-muted)' }}>Request RFQ</Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
