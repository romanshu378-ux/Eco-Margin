// EcoMargin Frontend — Dynamic Footer Component
// src/components/common/Footer/Footer.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import LogoIcon from '@assets/icons/LogoIcon'
import { 
  FiShield, FiCheckCircle, FiPhoneCall, FiMail, 
  FiMapPin, FiClock, FiMessageSquare, FiExternalLink 
} from 'react-icons/fi'
import { useFooterCMS, useLogos } from '../../../hooks/useCMS'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { data: footerCMS, loading: cmsLoading, error: cmsError } = useFooterCMS()
  const { logos } = useLogos()

  const companyName = footerCMS?.companyName || ''
  const address = footerCMS?.address || ''
  const phone = footerCMS?.phone || ''
  const altPhone = footerCMS?.altPhone || ''
  const email = footerCMS?.email || ''
  const supportEmail = footerCMS?.supportEmail || ''
  const businessHours = footerCMS?.businessHours || ''
  const whatsapp = footerCMS?.whatsapp || ''
  const googleMapsEmbedUrl = footerCMS?.googleMapsEmbedUrl || ''
  const copyright = footerCMS?.copyright || `© ${currentYear} ${companyName || 'EcoMargin LLP'}. All Rights Reserved.`

  return (
    <footer 
      className="footer-container-root"
      style={{ 
        background: '#0B0F19', 
        borderTop: '1px solid var(--color-border)',
        padding: '4rem 0 2rem 0',
        color: 'var(--color-text)',
        marginTop: 'auto'
      }}
    >
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
        <div className="footer-grid" style={{ marginBottom: '3rem' }}>
          {/* Company Bio */}
          <div className="footer-company-bio" style={{ minWidth: 0 }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
              <div style={{ color: 'var(--color-primary)' }}><LogoIcon size={30} /></div>
              <span style={{ fontFamily: 'Outfit', fontSize: '1.4rem', fontWeight: '800', color: '#ffffff' }}>
                EcoMargin
              </span>
            </Link>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: 1.6, maxWidth: '360px' }}>
              {companyName ? `${companyName} is a leading OEM EV Charger Manufacturer and Infrastructure EPC Contractor.` : 'Leading OEM EV Charger Manufacturer & Infrastructure EPC Contractor.'}
            </p>
          </div>

          {/* Manufacturing Range */}
          <div style={{ minWidth: 0 }}>
            <h4 style={{ marginBottom: '1.25rem', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-primary)' }}>
              Charger Range
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem', padding: 0, margin: 0 }}>
              <li><Link to="/products" className="footer-wrap-text" style={{ color: 'var(--color-text-muted)', display: 'block' }}>3.3kW / 7.4kW AC Single Phase</Link></li>
              <li><Link to="/products" className="footer-wrap-text" style={{ color: 'var(--color-text-muted)', display: 'block' }}>11kW / 22kW AC Three Phase</Link></li>
              <li><Link to="/products" className="footer-wrap-text" style={{ color: 'var(--color-text-muted)', display: 'block' }}>30kW / 60kW DC Fast Station</Link></li>
              <li><Link to="/products" className="footer-wrap-text" style={{ color: 'var(--color-text-muted)', display: 'block' }}>120kW / 160kW Dual Gun DC</Link></li>
              <li><Link to="/products" className="footer-wrap-text" style={{ color: 'var(--color-text-muted)', display: 'block' }}>240kW Heavy Bus Charger</Link></li>
              <li><Link to="/products" className="footer-wrap-text" style={{ color: 'var(--color-text-muted)', display: 'block' }}>Portable Fleet Chargers</Link></li>
            </ul>
          </div>

          {/* Solutions & EPC */}
          <div style={{ minWidth: 0 }}>
            <h4 style={{ marginBottom: '1.25rem', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-primary)' }}>
              Solutions & Services
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem', padding: 0, margin: 0 }}>
              <li><Link to="/services" className="footer-wrap-text" style={{ color: 'var(--color-text-muted)', display: 'block' }}>Turnkey EPC Installation</Link></li>
              <li><Link to="/solutions" className="footer-wrap-text" style={{ color: 'var(--color-text-muted)', display: 'block' }}>OCPP Cloud CSMS Software</Link></li>
              <li><Link to="/services" className="footer-wrap-text" style={{ color: 'var(--color-text-muted)', display: 'block' }}>Annual Maintenance (AMC)</Link></li>
              <li><Link to="/manufacturing" className="footer-wrap-text" style={{ color: 'var(--color-text-muted)', display: 'block' }}>OEM & White Label Supply</Link></li>
              <li><Link to="/dealer-partner" className="footer-wrap-text" style={{ color: 'var(--color-text-muted)', display: 'block' }}>CPO & Franchise Partner</Link></li>
              <li><Link to="/downloads" className="footer-wrap-text" style={{ color: 'var(--color-text-muted)', display: 'block' }}>Datasheets & Certificates</Link></li>
            </ul>
          </div>

          {/* Corporate Links */}
          <div style={{ minWidth: 0 }}>
            <h4 style={{ marginBottom: '1.25rem', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-primary)' }}>
              Corporate
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem', padding: 0, margin: 0 }}>
              <li><Link to="/about" className="footer-wrap-text" style={{ color: 'var(--color-text-muted)', display: 'block' }}>About EcoMargin</Link></li>
              <li><Link to="/projects" className="footer-wrap-text" style={{ color: 'var(--color-text-muted)', display: 'block' }}>Completed Projects</Link></li>
              <li><Link to="/blogs" className="footer-wrap-text" style={{ color: 'var(--color-text-muted)', display: 'block' }}>Industry Insights</Link></li>
              <li><Link to="/career" className="footer-wrap-text" style={{ color: 'var(--color-text-muted)', display: 'block' }}>Careers</Link></li>
              <li><Link to="/contact" className="footer-wrap-text" style={{ color: 'var(--color-text-muted)', display: 'block' }}>Contact Sales</Link></li>
              <li><Link to="/privacy-policy" className="footer-wrap-text" style={{ color: 'var(--color-text-muted)', display: 'block' }}>Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Dedicated Dynamic Contact Column */}
          <div style={{ minWidth: 0 }}>
            <h4 style={{ marginBottom: '1.25rem', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-primary)' }}>
              CONTACT
            </h4>

            {cmsLoading ? (
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>Loading...</p>
            ) : cmsError || !footerCMS ? (
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>Contact information unavailable</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', fontSize: '0.85rem', color: 'var(--color-text-muted)', width: '100%', minWidth: 0 }}>
                {address && (
                  <div className="footer-contact-item">
                    <FiMapPin className="footer-contact-icon" style={{ color: 'var(--color-primary)' }} />
                    <span className="footer-wrap-text" style={{ whiteSpace: 'pre-line', lineHeight: 1.4 }}>{address}</span>
                  </div>
                )}

                {phone && (
                  <div className="footer-contact-item">
                    <FiPhoneCall className="footer-contact-icon" style={{ color: 'var(--color-primary)' }} />
                    <a href={`tel:${phone.replace(/[^0-9+]/g, '')}`} className="footer-wrap-text" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>
                      {phone}
                    </a>
                  </div>
                )}

                {altPhone && (
                  <div className="footer-contact-item">
                    <FiPhoneCall className="footer-contact-icon" style={{ color: 'var(--color-primary)' }} />
                    <a href={`tel:${altPhone.replace(/[^0-9+]/g, '')}`} className="footer-wrap-text" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>
                      {altPhone}
                    </a>
                  </div>
                )}

                {email && (
                  <div className="footer-contact-item">
                    <FiMail className="footer-contact-icon" style={{ color: 'var(--color-primary)' }} />
                    <a href={`mailto:${email}`} className="footer-wrap-text" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>
                      {email}
                    </a>
                  </div>
                )}

                {supportEmail && (
                  <div className="footer-contact-item">
                    <FiMail className="footer-contact-icon" style={{ color: 'var(--color-primary)' }} />
                    <a href={`mailto:${supportEmail}`} className="footer-wrap-text" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>
                      {supportEmail}
                    </a>
                  </div>
                )}

                {businessHours && (
                  <div className="footer-contact-item">
                    <FiClock className="footer-contact-icon" style={{ color: 'var(--color-primary)' }} />
                    <span className="footer-wrap-text" style={{ whiteSpace: 'pre-line', lineHeight: 1.4 }}>{businessHours}</span>
                  </div>
                )}

                {whatsapp && (
                  <div className="footer-contact-item">
                    <FiMessageSquare className="footer-contact-icon" style={{ color: 'var(--color-primary)' }} />
                    <a 
                      href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="footer-wrap-text"
                      style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}
                    >
                      {whatsapp}
                    </a>
                  </div>
                )}

                {googleMapsEmbedUrl && (
                  <div className="footer-contact-item">
                    <FiExternalLink className="footer-contact-icon" style={{ color: 'var(--color-primary)' }} />
                    <a 
                      href={googleMapsEmbedUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="footer-wrap-text"
                      style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}
                    >
                      View on Map
                    </a>
                  </div>
                )}
              </div>
            )}
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

