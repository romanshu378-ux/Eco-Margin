import React, { useState } from 'react'
import SEO from '@seo/SEO'
import PageHeader from '@components/common/PageHeader/PageHeader'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@animations/variants'
import Button from '@components/ui/Button/Button'
import { FiCheckCircle, FiSend } from 'react-icons/fi'
import publicApi from '../../services/publicApi'
import { trackDealerAppSubmit } from '../../utils/analytics'

export default function DealerPartnerPage() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    city: '',
    partnerType: 'Distributor / Dealer',
    experience: '',
    investmentCapacity: '10 to 25 Lakhs'
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await publicApi.submitDealerApplication({
        fullName: formData.name,
        name: formData.name,
        companyName: formData.company,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        experience: formData.partnerType,
        investmentCapacity: formData.investmentCapacity,
        message: `Partnership Type: ${formData.partnerType}`
      })
      trackDealerAppSubmit(formData)
      setSubmitted(true)
    } catch (err) {
      console.warn('⚠️ [Dealer Partner Form Submission]:', err.message)
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SEO 
        title="Become an EcoMargin Authorized Dealer & CPO Partner" 
        description="Partner with India's leading EV charger manufacturer. Franchise, Distributor, and Charge Point Operator (CPO) business opportunities." 
      />

      <PageHeader 
        title="Dealer & Channel Partner Program" 
        description="Expand Your Business into India's Fast-Growing EV Charging Infrastructure Sector."
      />

      <div className="container" style={{ padding: '5rem 0' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'flex-start' }}>
          
          {/* Partnership Benefits */}
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Why Partner With EcoMargin?
            </span>
            <h2 style={{ fontSize: '2.25rem', marginTop: '0.5rem', marginBottom: '1.5rem', fontFamily: 'Outfit, sans-serif' }}>
              Direct Factory Support & Unmatched Commercial Margins
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '2rem' }}>
              Join an elite network of regional distributors, system integrators, and charge point operators (CPOs). EcoMargin provides direct factory pricing, marketing collateral, technical training, and 24/7 backend NOC support.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <FiCheckCircle style={{ color: 'var(--color-primary)', fontSize: '1.25rem', marginTop: '0.2rem', flexShrink: 0 }} />
                <div>
                  <strong>OEM Factory Margin:</strong> High gross margins on AC Wallboxes and DC Fast Charging Stations.
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <FiCheckCircle style={{ color: 'var(--color-primary)', fontSize: '1.25rem', marginTop: '0.2rem', flexShrink: 0 }} />
                <div>
                  <strong>Turnkey Support:</strong> Training for civil, electrical, transformer setup, and commissioning.
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <FiCheckCircle style={{ color: 'var(--color-primary)', fontSize: '1.25rem', marginTop: '0.2rem', flexShrink: 0 }} />
                <div>
                  <strong>White-Label CPO Software:</strong> Offer custom branded OCPP CSMS software & mobile apps to your clients.
                </div>
              </div>
            </div>
          </motion.div>

          {/* Partner Inquiry Form */}
          <div style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', padding: '2.5rem', boxShadow: 'var(--shadow-xl)' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <FiCheckCircle style={{ fontSize: '3.5rem', color: 'var(--color-primary)', marginBottom: '1rem' }} />
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Partner Application Submitted</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                  Our Dealer Onboarding Team will evaluate your details and call you back within 24 hours.
                </p>
              </div>
            ) : (
              <>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Partner Application Form</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                  Fill out the form below to receive our partner prospectus and commercial pricing sheet.
                </p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Full Name *</label>
                    <input
                      type="text" required value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Vikram Mehta"
                      style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-md)', background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)', outline: 'none', fontSize: '0.875rem' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Work Email *</label>
                      <input
                        type="email" required value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder="vikram@company.com"
                        style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-md)', background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)', outline: 'none', fontSize: '0.875rem' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Company Name</label>
                      <input
                        type="text" value={formData.company}
                        onChange={e => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. Apex Electricals"
                        style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-md)', background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)', outline: 'none', fontSize: '0.875rem' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Phone *</label>
                      <input
                        type="tel" required value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-md)', background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)', outline: 'none', fontSize: '0.875rem' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Target City / Region *</label>
                      <input
                        type="text" required value={formData.city}
                        onChange={e => setFormData({ ...formData, city: e.target.value })}
                        placeholder="e.g. Pune, Maharashtra"
                        style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-md)', background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)', outline: 'none', fontSize: '0.875rem' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Partnership Type</label>
                    <select
                      value={formData.partnerType}
                      onChange={e => setFormData({ ...formData, partnerType: e.target.value })}
                      style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-md)', background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)', outline: 'none', fontSize: '0.875rem' }}
                    >
                      <option value="Distributor / Dealer">Exclusive Regional Distributor</option>
                      <option value="CPO Franchise Operator">CPO Franchise Charging Operator</option>
                      <option value="EPC Installer Partner">EPC Electrical & Civil Installer</option>
                    </select>
                  </div>

                  <Button type="submit" variant="primary" fullWidth disabled={loading} style={{ marginTop: '0.5rem' }}>
                    {loading ? 'Submitting Application...' : <>Submit Partner Application <FiSend style={{ marginLeft: '0.5rem' }} /></>}
                  </Button>
                </form>
              </>
            )}
          </div>

        </div>

      </div>
    </>
  )
}
