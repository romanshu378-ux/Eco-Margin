// EcoMargin Frontend — Dedicated EV Charging Enquiry Page
// src/pages/Enquiry/EnquiryPage.jsx

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FiSend, 
  FiCheckCircle, 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiClock, 
  FiExternalLink,
  FiAlertCircle
} from 'react-icons/fi'
import { 
  FaYoutube, 
  FaInstagram, 
  FaFacebook, 
  FaLinkedin 
} from 'react-icons/fa6'
import SEO from '@seo/SEO'
import PageHeader from '@components/common/PageHeader/PageHeader'
import Button from '@components/ui/Button/Button'
import { fadeUp, staggerContainer } from '@animations/variants'
import publicApi from '../../services/publicApi'
import { useFooterCMS } from '../../hooks/useCMS'

export default function EnquiryPage() {
  const { data: cmsData, loading: cmsLoading } = useFooterCMS()

  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    city: '',
    chargerRequirement: '',
    message: ''
  })

  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)

  // Dynamic Contact & Social Details from CMS
  const salesEmail = cmsData?.email || 'sales@ecomargin.com'
  const supportEmail = cmsData?.supportEmail || 'support@ecomargin.in'
  const phone = cmsData?.phone || '+91-8302313065'
  const altPhone = cmsData?.altPhone || ''
  const address = cmsData?.address || 'NH-11, iStart Nest, Govt Engineering College, Bharatpur, Rajasthan - 321001'
  const youtubeUrl = cmsData?.youtube || 'https://youtube.com/@ecomargin'
  const instagramUrl = cmsData?.instagram || 'https://instagram.com/ecomargin'
  const facebookUrl = cmsData?.facebook || 'https://facebook.com/ecomargin'
  const linkedinUrl = cmsData?.linkedin || 'https://linkedin.com/company/ecomargin'

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg(null)

    // Validation
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setErrorMsg('Please fill in all required fields marked with *.')
      return
    }

    setLoading(true)

    try {
      const res = await publicApi.submitEnquiry({
        fullName: formData.fullName.trim(),
        name: formData.fullName.trim(),
        company: formData.company.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        city: formData.city.trim(),
        chargerRequirement: formData.chargerRequirement.trim(),
        message: formData.message.trim(),
        subject: `Enquiry${formData.chargerRequirement.trim() ? `: ${formData.chargerRequirement.trim()}` : ''}`
      })

      if (res && res.success === false && res.message) {
        throw new Error(res.message)
      }

      setSubmitted(true)
      setFormData({
        fullName: '',
        company: '',
        email: '',
        phone: '',
        city: '',
        chargerRequirement: '',
        message: ''
      })
    } catch (err) {
      console.warn('⚠️ [Enquiry Submission Error]:', err.message)
      setErrorMsg('Unable to send enquiry right now. Please check your connection or contact sales directly.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SEO 
        title="EV Charging Enquiry | EcoMargin"
        description="Send your EV charging requirement to EcoMargin for AC chargers, DC fast chargers, fleet charging, EV charging stations, installation and support."
        pageRoute="/enquiry"
      />

      <PageHeader 
        title="Send Your Enquiry"
        description="Tell us about your EV charging requirement and our engineering sales team will connect with you."
      />

      <section style={{ padding: '4.5rem 0', background: 'var(--color-bg)' }}>
        <div className="container">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
              gap: '2.5rem', 
              alignItems: 'start' 
            }}
          >
            
            {/* Left Column — Public Enquiry Form */}
            <motion.div 
              variants={fadeUp}
              style={{
                background: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-xl)',
                padding: '2.5rem',
                boxShadow: 'var(--shadow-lg)'
              }}
            >
              <div style={{ marginBottom: '2rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  ⚡ Rapid Sales &amp; Technical Consultation
                </span>
                <h2 style={{ fontSize: '1.75rem', marginTop: '0.4rem', color: 'var(--color-text)', fontWeight: 700 }}>
                  Send Your Requirement
                </h2>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                  Provide your project details below. Our team reviews your power specifications and provides a tailored commercial proposal.
                </p>
              </div>

              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ 
                    textAlign: 'center', 
                    padding: '3rem 1.5rem',
                    background: 'rgba(16, 185, 129, 0.08)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid rgba(16, 185, 129, 0.2)'
                  }}
                >
                  <FiCheckCircle style={{ fontSize: '3.5rem', color: '#10b981', marginBottom: '1rem' }} />
                  <h3 style={{ fontSize: '1.4rem', color: 'var(--color-text)', marginBottom: '0.75rem', fontWeight: 700 }}>
                    Thank You!
                  </h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem', maxWidth: '440px', margin: '0 auto 2rem' }}>
                    Your enquiry has been received successfully. A dedicated EcoMargin charging specialist will reach out to you shortly.
                  </p>
                  <Button variant="primary" onClick={() => setSubmitted(false)}>
                    Send Another Enquiry
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  
                  {errorMsg && (
                    <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-danger, #ef4444)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', fontSize: '0.875rem', border: '1px solid rgba(239, 68, 68, 0.3)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <FiAlertCircle /> {errorMsg}
                    </div>
                  )}

                  {/* Row 1: Full Name & Company Name */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--color-text)' }}>
                        Full Name *
                      </label>
                      <input 
                        type="text" 
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g. Rahul Sharma"
                        style={{
                          width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)',
                          background: 'var(--color-bg)', border: '1px solid var(--color-border)',
                          color: 'var(--color-text)', outline: 'none', fontSize: '0.9rem'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--color-text)' }}>
                        Company Name
                      </label>
                      <input 
                        type="text" 
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="e.g. Metro Infra Pvt Ltd"
                        style={{
                          width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)',
                          background: 'var(--color-bg)', border: '1px solid var(--color-border)',
                          color: 'var(--color-text)', outline: 'none', fontSize: '0.9rem'
                        }}
                      />
                    </div>
                  </div>

                  {/* Row 2: Email Address & Phone Number */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--color-text)' }}>
                        Email Address *
                      </label>
                      <input 
                        type="email" 
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="rahul@company.com"
                        style={{
                          width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)',
                          background: 'var(--color-bg)', border: '1px solid var(--color-border)',
                          color: 'var(--color-text)', outline: 'none', fontSize: '0.9rem'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--color-text)' }}>
                        Phone Number *
                      </label>
                      <input 
                        type="tel" 
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        style={{
                          width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)',
                          background: 'var(--color-bg)', border: '1px solid var(--color-border)',
                          color: 'var(--color-text)', outline: 'none', fontSize: '0.9rem'
                        }}
                      />
                    </div>
                  </div>

                  {/* Row 3: City / Location & Charger Requirement */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--color-text)' }}>
                        City / Location
                      </label>
                      <input 
                        type="text" 
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="e.g. New Delhi / Jaipur"
                        style={{
                          width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)',
                          background: 'var(--color-bg)', border: '1px solid var(--color-border)',
                          color: 'var(--color-text)', outline: 'none', fontSize: '0.9rem'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--color-text)' }}>
                        Charger Requirement
                      </label>
                      <input 
                        type="text" 
                        name="chargerRequirement"
                        value={formData.chargerRequirement}
                        onChange={handleChange}
                        placeholder="e.g. 60kW DC Fast / 22kW Dual AC / CSMS"
                        style={{
                          width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)',
                          background: 'var(--color-bg)', border: '1px solid var(--color-border)',
                          color: 'var(--color-text)', outline: 'none', fontSize: '0.9rem'
                        }}
                      />
                    </div>
                  </div>

                  {/* Row 4: Message */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--color-text)' }}>
                      Message *
                    </label>
                    <textarea 
                      name="message"
                      required
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please describe your project location, power availability, expected chargers count, timeline, or any specific technical requirements..."
                      style={{
                        width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)',
                        background: 'var(--color-bg)', border: '1px solid var(--color-border)',
                        color: 'var(--color-text)', outline: 'none', fontSize: '0.9rem', resize: 'vertical'
                      }}
                    />
                  </div>

                  <div style={{ marginTop: '0.5rem' }}>
                    <Button type="submit" variant="primary" size="lg" fullWidth disabled={loading}>
                      {loading ? 'Submitting Enquiry...' : 'Submit Enquiry →'}
                    </Button>
                  </div>

                </form>
              )}
            </motion.div>

            {/* Right Column — Connect With EcoMargin Section */}
            <motion.div 
              variants={fadeUp}
              style={{
                background: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-xl)',
                padding: '2.5rem',
                boxShadow: 'var(--shadow-lg)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.75rem'
              }}
            >
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  🌿 Get In Touch
                </span>
                <h2 style={{ fontSize: '1.75rem', marginTop: '0.4rem', color: 'var(--color-text)', fontWeight: 700 }}>
                  Connect With EcoMargin
                </h2>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginTop: '0.25rem', lineHeight: 1.5 }}>
                  Reach out directly to our engineering specialists or join our growing EV community across official digital channels.
                </p>
              </div>

              {/* Direct Contact Channels */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                
                {/* Email Address */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ 
                    width: '42px', height: '42px', borderRadius: '10px', 
                    background: 'rgba(16, 185, 129, 0.12)', color: 'var(--color-primary, #10b981)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem',
                    flexShrink: 0
                  }}>
                    <FiMail />
                  </div>
                  <div style={{ overflowWrap: 'break-word', wordBreak: 'break-word', minWidth: 0 }}>
                    <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Sales &amp; Corporate Email
                    </span>
                    <a 
                      href={`mailto:${salesEmail}`} 
                      style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none', display: 'inline-block' }}
                    >
                      {salesEmail}
                    </a>
                    {supportEmail && supportEmail !== salesEmail && (
                      <span style={{ display: 'block', fontSize: '0.825rem', color: 'var(--color-text-muted)', marginTop: '0.15rem' }}>
                        Support: <a href={`mailto:${supportEmail}`} style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>{supportEmail}</a>
                      </span>
                    )}
                  </div>
                </div>

                {/* Phone Number */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ 
                    width: '42px', height: '42px', borderRadius: '10px', 
                    background: 'rgba(16, 185, 129, 0.12)', color: 'var(--color-primary, #10b981)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem',
                    flexShrink: 0
                  }}>
                    <FiPhone />
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Sales Hotline &amp; Technical Desk
                    </span>
                    <a 
                      href={`tel:${phone.replace(/[^0-9+]/g, '')}`} 
                      style={{ color: 'var(--color-text)', fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none' }}
                    >
                      {phone}
                    </a>
                    {altPhone && (
                      <span style={{ display: 'block', fontSize: '0.825rem', color: 'var(--color-text-muted)', marginTop: '0.15rem' }}>
                        Support: <a href={`tel:${altPhone.replace(/[^0-9+]/g, '')}`} style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>{altPhone}</a>
                      </span>
                    )}
                  </div>
                </div>

                {/* Address */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ 
                    width: '42px', height: '42px', borderRadius: '10px', 
                    background: 'rgba(16, 185, 129, 0.12)', color: 'var(--color-primary, #10b981)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem',
                    flexShrink: 0
                  }}>
                    <FiMapPin />
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Factory &amp; Corporate Address
                    </span>
                    <span style={{ color: 'var(--color-text)', fontSize: '0.9rem', lineHeight: 1.5, display: 'block' }}>
                      {address}
                    </span>
                  </div>
                </div>

              </div>

              {/* Divider */}
              <div style={{ borderTop: '1px solid var(--color-border)', margin: '0.25rem 0' }} />

              {/* Social Channels Section */}
              <div>
                <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.75rem' }}>
                  Official Social Channels
                </span>
                
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', 
                  gap: '0.75rem' 
                }}>
                  
                  {/* YouTube */}
                  <a 
                    href={youtubeUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.65rem',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--color-bg)',
                      border: '1px solid var(--color-border)',
                      textDecoration: 'none',
                      color: 'var(--color-text)',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#dc2626'
                      e.currentTarget.style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-border)'
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                  >
                    <div style={{ 
                      width: '32px', height: '32px', borderRadius: '8px', 
                      background: 'rgba(220, 38, 38, 0.1)', color: '#dc2626',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem'
                    }}>
                      <FaYoutube />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>YouTube</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>Videos &amp; Demos</div>
                    </div>
                  </a>

                  {/* Instagram */}
                  <a 
                    href={instagramUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.65rem',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--color-bg)',
                      border: '1px solid var(--color-border)',
                      textDecoration: 'none',
                      color: 'var(--color-text)',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#e1306c'
                      e.currentTarget.style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-border)'
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                  >
                    <div style={{ 
                      width: '32px', height: '32px', borderRadius: '8px', 
                      background: 'rgba(225, 48, 108, 0.1)', color: '#e1306c',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem'
                    }}>
                      <FaInstagram />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Instagram</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>Highlights &amp; Updates</div>
                    </div>
                  </a>

                  {/* Facebook */}
                  <a 
                    href={facebookUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.65rem',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--color-bg)',
                      border: '1px solid var(--color-border)',
                      textDecoration: 'none',
                      color: 'var(--color-text)',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#1877f2'
                      e.currentTarget.style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-border)'
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                  >
                    <div style={{ 
                      width: '32px', height: '32px', borderRadius: '8px', 
                      background: 'rgba(24, 119, 242, 0.1)', color: '#1877f2',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem'
                    }}>
                      <FaFacebook />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Facebook</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>Community Hub</div>
                    </div>
                  </a>

                  {/* LinkedIn */}
                  <a 
                    href={linkedinUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.65rem',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--color-bg)',
                      border: '1px solid var(--color-border)',
                      textDecoration: 'none',
                      color: 'var(--color-text)',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#0a66c2'
                      e.currentTarget.style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-border)'
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                  >
                    <div style={{ 
                      width: '32px', height: '32px', borderRadius: '8px', 
                      background: 'rgba(10, 102, 194, 0.1)', color: '#0a66c2',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem'
                    }}>
                      <FaLinkedin />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>LinkedIn</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>Corporate &amp; Careers</div>
                    </div>
                  </a>

                </div>
              </div>

              {/* Service Level Agreement / Assurance */}
              <div 
                style={{
                  background: 'rgba(16, 185, 129, 0.05)',
                  border: '1px solid rgba(16, 185, 129, 0.15)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginTop: '0.5rem'
                }}
              >
                <FiClock style={{ fontSize: '1.75rem', color: 'var(--color-primary)', flexShrink: 0 }} />
                <div>
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--color-text)', margin: '0 0 0.15rem 0', fontWeight: 700 }}>
                    Fast Turnaround Guarantee
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.4 }}>
                    Custom engineering RFQ evaluations and commercial quotes dispatched within 4 business hours.
                  </p>
                </div>
              </div>

            </motion.div>

          </motion.div>
        </div>
      </section>
    </>
  )
}
