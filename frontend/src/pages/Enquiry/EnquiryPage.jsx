// EcoMargin Frontend — Dedicated EV Charging Enquiry Page
// src/pages/Enquiry/EnquiryPage.jsx

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FiSend, 
  FiCheckCircle, 
  FiZap, 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiClock, 
  FiShield, 
  FiHelpCircle 
} from 'react-icons/fi'
import SEO from '@seo/SEO'
import PageHeader from '@components/common/PageHeader/PageHeader'
import Button from '@components/ui/Button/Button'
import { fadeUp, staggerContainer } from '@animations/variants'
import publicApi from '../../services/publicApi'

export default function EnquiryPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    city: '',
    requirementType: 'EV Charging Station',
    chargerRequirement: '',
    requiredPower: '',
    quantity: '1',
    installationRequired: 'Yes',
    message: ''
  })

  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)

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
        requirementType: formData.requirementType,
        chargerRequirement: formData.chargerRequirement.trim(),
        requiredPower: formData.requiredPower.trim(),
        quantity: formData.quantity,
        installationRequired: formData.installationRequired,
        message: formData.message.trim(),
        subject: `Enquiry: ${formData.requirementType}${formData.chargerRequirement ? ` - ${formData.chargerRequirement}` : ''}`
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
        requirementType: 'EV Charging Station',
        chargerRequirement: '',
        requiredPower: '',
        quantity: '1',
        installationRequired: 'Yes',
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
        description="Tell us about your EV charging requirement and our team will get back to you."
      />

      <section style={{ padding: '5rem 0', background: 'var(--color-bg)' }}>
        <div className="container">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'start' }}
          >
            
            {/* Left Column — Professional Form */}
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
                  ⚡ Rapid Sales &amp; Technical Support
                </span>
                <h2 style={{ fontSize: '1.75rem', marginTop: '0.4rem', color: 'var(--color-text)' }}>
                  Send Your Enquiry
                </h2>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                  Tell us about your EV charging requirement and our team will get back to you.
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
                  <FiCheckCircle style={{ fontSize: '4rem', color: '#10b981', marginBottom: '1rem' }} />
                  <h3 style={{ fontSize: '1.4rem', color: 'var(--color-text)', marginBottom: '0.75rem' }}>
                    Thank You!
                  </h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem', maxWidth: '460px', margin: '0 auto 2rem' }}>
                    Thank you! Your enquiry has been submitted successfully. Our team will contact you shortly.
                  </p>
                  <Button variant="primary" onClick={() => setSubmitted(false)}>
                    Send Another Enquiry
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  
                  {errorMsg && (
                    <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-danger, #ef4444)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', fontSize: '0.875rem', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                      {errorMsg}
                    </div>
                  )}

                  {/* Row 1: Full Name & Company */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
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

                  {/* Row 2: Email & Phone */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
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

                  {/* Row 3: City & Requirement Type */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
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
                        Requirement Type *
                      </label>
                      <select 
                        name="requirementType"
                        required
                        value={formData.requirementType}
                        onChange={handleChange}
                        style={{
                          width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)',
                          background: 'var(--color-bg)', border: '1px solid var(--color-border)',
                          color: 'var(--color-text)', outline: 'none', fontSize: '0.9rem'
                        }}
                      >
                        <option value="EV Charging Station">EV Charging Station</option>
                        <option value="AC Charger">AC Charger</option>
                        <option value="DC Fast Charger">DC Fast Charger</option>
                        <option value="Ultra-Fast Charger">Ultra-Fast Charger</option>
                        <option value="Fleet Charging">Fleet Charging</option>
                        <option value="Commercial Charging">Commercial Charging</option>
                        <option value="Home Charging">Home Charging</option>
                        <option value="EPC / Installation">EPC / Installation</option>
                        <option value="AMC / Service">AMC / Service</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 4: Charger Requirement & Required Power */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--color-text)' }}>
                        Charger Requirement
                      </label>
                      <input 
                        type="text" 
                        name="chargerRequirement"
                        value={formData.chargerRequirement}
                        onChange={handleChange}
                        placeholder="e.g. 60kW Dual Gun CCS2 / AC Type-2"
                        style={{
                          width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)',
                          background: 'var(--color-bg)', border: '1px solid var(--color-border)',
                          color: 'var(--color-text)', outline: 'none', fontSize: '0.9rem'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--color-text)' }}>
                        Required Power
                      </label>
                      <input 
                        type="text" 
                        name="requiredPower"
                        value={formData.requiredPower}
                        onChange={handleChange}
                        placeholder="e.g. 7.4kW / 30kW / 60kW / 120kW / 240kW"
                        style={{
                          width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)',
                          background: 'var(--color-bg)', border: '1px solid var(--color-border)',
                          color: 'var(--color-text)', outline: 'none', fontSize: '0.9rem'
                        }}
                      />
                    </div>
                  </div>

                  {/* Row 5: Quantity & Installation Required */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--color-text)' }}>
                        Quantity
                      </label>
                      <input 
                        type="number" 
                        name="quantity"
                        min="1"
                        value={formData.quantity}
                        onChange={handleChange}
                        style={{
                          width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)',
                          background: 'var(--color-bg)', border: '1px solid var(--color-border)',
                          color: 'var(--color-text)', outline: 'none', fontSize: '0.9rem'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--color-text)' }}>
                        Installation Required
                      </label>
                      <select 
                        name="installationRequired"
                        value={formData.installationRequired}
                        onChange={handleChange}
                        style={{
                          width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)',
                          background: 'var(--color-bg)', border: '1px solid var(--color-border)',
                          color: 'var(--color-text)', outline: 'none', fontSize: '0.9rem'
                        }}
                      >
                        <option value="Yes">Yes (Turnkey Installation Needed)</option>
                        <option value="No">No (Supply Only)</option>
                        <option value="Consultation Needed">Consultation Needed</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 6: Message */}
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
                      placeholder="Please describe your project location, grid power availability, timeline, or any specific requirements..."
                      style={{
                        width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)',
                        background: 'var(--color-bg)', border: '1px solid var(--color-border)',
                        color: 'var(--color-text)', outline: 'none', fontSize: '0.9rem', resize: 'vertical'
                      }}
                    />
                  </div>

                  <div style={{ marginTop: '0.5rem' }}>
                    <Button type="submit" variant="primary" size="lg" fullWidth disabled={loading}>
                      {loading ? 'Submitting...' : 'Submit Enquiry →'}
                    </Button>
                  </div>

                </form>
              )}
            </motion.div>

            {/* Right Column — Corporate Info & Highlights */}
            <motion.div 
              variants={fadeUp}
              style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
            >
              
              {/* Highlight Card 1 */}
              <div 
                style={{
                  background: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-xl)',
                  padding: '2rem',
                  boxShadow: 'var(--shadow-md)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', padding: '0.85rem', borderRadius: 'var(--radius-md)', fontSize: '1.5rem', display: 'flex' }}>
                    <FiZap />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', color: 'var(--color-text)', margin: 0 }}>
                      Fast Turnaround
                    </h3>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                      Dedicated Engineering Sales Team
                    </span>
                  </div>
                </div>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                  Our technical team evaluates your site specifications, electrical load requirements, and charger selection to provide a tailored quote within 4 business hours.
                </p>
              </div>

              {/* Highlight Card 2: Contact Details */}
              <div 
                style={{
                  background: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-xl)',
                  padding: '2rem',
                  boxShadow: 'var(--shadow-md)'
                }}
              >
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', color: 'var(--color-text)' }}>
                  Direct Contact Information
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <FiMail style={{ color: 'var(--color-primary)', fontSize: '1.25rem', marginTop: '0.2rem' }} />
                    <div>
                      <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Sales &amp; Corporate Email</span>
                      <a href="mailto:support@ecomargin.in" style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none' }}>
                        support@ecomargin.in
                      </a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <FiPhone style={{ color: 'var(--color-primary)', fontSize: '1.25rem', marginTop: '0.2rem' }} />
                    <div>
                      <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Hotline / Support</span>
                      <a href="tel:+918302313065" style={{ color: 'var(--color-text)', fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none' }}>
                        +91-8302313065
                      </a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <FiMapPin style={{ color: 'var(--color-primary)', fontSize: '1.25rem', marginTop: '0.2rem' }} />
                    <div>
                      <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Manufacturing Plant</span>
                      <span style={{ color: 'var(--color-text)', fontSize: '0.9rem', lineHeight: 1.4, display: 'block' }}>
                        EcoMargin LLP Facility, Industrial Area, Rajasthan, India
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Highlight Card 3: Trust Badges */}
              <div 
                style={{
                  background: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-xl)',
                  padding: '1.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.25rem'
                }}
              >
                <FiShield style={{ fontSize: '2.5rem', color: 'var(--color-primary)', flexShrink: 0 }} />
                <div>
                  <h4 style={{ fontSize: '1rem', color: 'var(--color-text)', margin: '0 0 0.25rem 0' }}>
                    ARAI &amp; ISO Certified Manufacturing
                  </h4>
                  <p style={{ fontSize: '0.825rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.4 }}>
                    Heavy-duty EV chargers built to IEC standards with 3-Year comprehensive warranty.
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
