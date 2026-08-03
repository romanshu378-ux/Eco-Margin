// EcoMargin Frontend — Dynamic Contact Page Component
// src/pages/Contact/ContactPage.jsx

import React, { useState } from 'react'
import SEO from '@seo/SEO'
import Button from '@components/ui/Button/Button'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, slideInRight } from '@animations/variants'
import PageHeader from '@components/common/PageHeader/PageHeader'
import { 
  FiPhoneCall, FiMail, FiMapPin, FiClock, FiMessageCircle, 
  FiSend, FiCheckCircle, FiAlertCircle, FiGlobe
} from 'react-icons/fi'
import { useFooterCMS } from '../../hooks/useCMS'
import publicApi from '../../services/publicApi'

export default function ContactPage() {
  const { data: footerData, loading, error } = useFooterCMS()

  // Match all exact fields returned by Footer CMS API
  const companyName = footerData?.companyName || 'Not Available'
  const address = footerData?.address || 'Not Available'
  const phone = footerData?.phone || 'Not Available'
  const altPhone = footerData?.altPhone || 'Not Available'
  const email = footerData?.email || 'Not Available'
  const supportEmail = footerData?.supportEmail || 'Not Available'
  const rawWhatsapp = footerData?.whatsapp || ''
  const businessHours = footerData?.businessHours || 'Not Available'
  const googleMapsEmbedUrl = footerData?.googleMapsEmbedUrl || ''

  // Sanitize WhatsApp number to digits-only format (e.g. 918302313065)
  let cleanWhatsapp = rawWhatsapp.replace(/[^0-9]/g, '')
  if (cleanWhatsapp && cleanWhatsapp.length === 10) {
    cleanWhatsapp = '91' + cleanWhatsapp
  }

  const [isSent, setIsSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    requirement: 'AC / DC Charger Purchase',
    message: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await publicApi.submitRFQ({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        product: formData.requirement,
        requirements: formData.message
      })
    } catch (err) {
      console.warn('⚠️ [Contact RFQ Form Submission]:', err.message)
    } finally {
      setSubmitting(false)
      setIsSent(true)
    }
  }

  return (
    <>
      <SEO title="Contact Corporate Sales & Factory" description="Contact EcoMargin's EV Charger engineering sales team, request factory quotes, or schedule a plant visit." />

      <PageHeader
        title="Contact Corporate Sales & Factory"
        description="Get Direct Technical Proposals, Custom RFQs, and Turnkey EPC Estimates."
      />

      <div className="container" style={{ padding: '5rem 0' }}>

        {/* Loading Indicator */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-primary)' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '3px solid var(--color-border)', borderTopColor: 'var(--color-primary)', animation: 'spin 1s linear infinite', margin: '0 auto 1rem auto' }}></div>
            <span>Loading factory contact details from database...</span>
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid #ef4444', padding: '1rem 1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <FiAlertCircle style={{ fontSize: '1.25rem' }} /> Notice: {error}
          </div>
        )}

        {/* Quick Action Badges */}
        {!loading && (
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '4rem' }}>
            {cleanWhatsapp && (
              <a
                href={`https://wa.me/${cleanWhatsapp}?text=Hello%20EcoMargin%20Sales,%20I%20want%20a%20quote%20for%20EV%20Chargers`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.65rem', background: '#25D366', color: '#ffffff', padding: '0.85rem 1.75rem', borderRadius: '9999px', fontWeight: 700, textDecoration: 'none', fontSize: '0.95rem' }}
              >
                <FiMessageCircle style={{ fontSize: '1.3rem' }} /> Chat on WhatsApp Sales
              </a>
            )}

            {phone !== 'Not Available' && (
              <a
                href={`tel:${phone}`}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.65rem', background: 'var(--color-primary)', color: '#0f0f1a', padding: '0.85rem 1.75rem', borderRadius: '9999px', fontWeight: 700, textDecoration: 'none', fontSize: '0.95rem' }}
              >
                <FiPhoneCall style={{ fontSize: '1.2rem' }} /> Call Sales Desk ({phone})
              </a>
            )}
          </div>
        )}

        <motion.div variants={staggerContainer} initial="hidden" animate="visible" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'flex-start' }}>

          {/* Left Info: Factory & Contact CMS Data */}
          <motion.div variants={fadeUp}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', fontFamily: 'Outfit, sans-serif' }}>Factory Headquarters</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', marginBottom: '2.5rem', lineHeight: 1.6 }}>
              Visit our state-of-the-art manufacturing facility or send your technical specifications to our engineering sales team.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', marginBottom: '3rem' }}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ fontSize: '1.5rem', color: 'var(--color-primary)' }}><FiMapPin /></div>
                <div>
                  <h4 style={{ marginBottom: '0.25rem' }}>Factory & R&D Center</h4>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                    <strong>{companyName}</strong><br />
                    {address}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ fontSize: '1.5rem', color: 'var(--color-primary)' }}><FiMail /></div>
                <div>
                  <h4 style={{ marginBottom: '0.25rem' }}>Email & Phone Inquiries</h4>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    Sales & RFQs: <strong>{email}</strong> {phone !== 'Not Available' ? `• ${phone}` : ''}<br />
                    Technical Support: <strong>{supportEmail}</strong> {altPhone !== 'Not Available' ? `• ${altPhone}` : ''}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ fontSize: '1.5rem', color: 'var(--color-primary)' }}><FiClock /></div>
                <div>
                  <h4 style={{ marginBottom: '0.25rem' }}>Business Hours</h4>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    {businessHours}<br />
                    24/7 Remote NOC Desk Active
                  </p>
                </div>
              </div>
            </div>

            {/* Google Map iFrame */}
            {googleMapsEmbedUrl ? (
              <div style={{ width: '100%', height: '230px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--color-border)', background: 'var(--color-bg-card)' }}>
                <iframe
                  title="EcoMargin Factory Location"
                  src={googleMapsEmbedUrl}
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy"
                ></iframe>
              </div>
            ) : (
              <div style={{ width: '100%', height: '140px', borderRadius: 'var(--radius-lg)', border: '1px dashed var(--color-border)', background: 'var(--color-bg-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)', fontSize: '0.9rem', gap: '0.5rem' }}>
                <FiGlobe /> Map Location Not Available
              </div>
            )}
          </motion.div>

          {/* Right Lead Form */}
          <motion.div variants={slideInRight} style={{ background: 'var(--color-bg-card)', padding: '2.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-xl)' }}>
            {isSent ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <FiCheckCircle style={{ fontSize: '4rem', color: 'var(--color-primary)', marginBottom: '1rem' }} />
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Thank You for Reaching Out!</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
                  Our EV infrastructure sales manager will review your specs and contact you within 4 business hours with a formal proposal.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Direct B2B Desk
                  </span>
                  <h3 style={{ fontSize: '1.5rem', marginTop: '0.2rem', marginBottom: '0.5rem' }}>Request Factory Quotation</h3>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Full Name *</label>
                  <input
                    type="text" required value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ramesh Kumar"
                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Work Email *</label>
                    <input
                      type="email" required value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ramesh@company.com"
                      style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Phone Number *</label>
                    <input
                      type="tel" required value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)', outline: 'none' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Company / Organization</label>
                  <input
                    type="text" value={formData.company}
                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. National Logistics Ltd."
                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Equipment Requirement</label>
                  <select
                    value={formData.requirement}
                    onChange={e => setFormData({ ...formData, requirement: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)', outline: 'none' }}
                  >
                    <option value="AC / DC Charger Purchase">AC / DC Fast Charger Hardware Purchase</option>
                    <option value="Turnkey EPC Installation">Turnkey Substation & Charging Plinth EPC</option>
                    <option value="White Label CPO CSMS Software">White Label OCPP CSMS Software & App</option>
                    <option value="AMC & Operation Services">AMC Maintenance & NOC Field Support</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Message / RFQ Specs</label>
                  <textarea
                    rows="3" value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide charger quantities, desired kW output (e.g. 60kW Dual CCS2), location..."
                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)', outline: 'none' }}
                  ></textarea>
                </div>

                <Button type="submit" variant="primary" fullWidth disabled={submitting} style={{ marginTop: '0.5rem' }}>
                  {submitting ? 'Submitting Quotation...' : <>Submit RFQ Quotation <FiSend style={{ marginLeft: '0.5rem' }} /></>}
                </Button>
              </form>
            )}
          </motion.div>

        </motion.div>

      </div>
    </>
  )
}
