import React, { useState } from 'react'
import SEO from '@seo/SEO'
import Button from '@components/ui/Button/Button'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, slideInRight } from '@animations/variants'
import PageHeader from '@components/common/PageHeader/PageHeader'

export default function ContactPage() {
  const [isSent, setIsSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // simulate api call
    setTimeout(() => setIsSent(true), 500)
  }

  return (
    <>
      <SEO title="Contact Us" description="Get in touch with the EcoMargin team." />
      
      <PageHeader 
        title="Contact Us" 
        description="Have a question? Our team is here to help you deploy, manage, and scale your network."
      />

      <div className="container" style={{ padding: '6rem 0' }}>
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
          
          {/* Left Col - Info */}
          <motion.div variants={fadeUp}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Get in Touch</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.125rem', marginBottom: '3rem' }}>
              Whether you're looking for enterprise pricing, technical support, or partnership opportunities, we'd love to hear from you.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ fontSize: '1.5rem' }}>📍</div>
                <div>
                  <h4 style={{ marginBottom: '0.25rem' }}>Global Headquarters</h4>
                  <p style={{ color: 'var(--color-text-muted)' }}>123 Eco Way, Tech Park<br/>Mumbai, MH 400001</p>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ fontSize: '1.5rem' }}>📧</div>
                <div>
                  <h4 style={{ marginBottom: '0.25rem' }}>Email</h4>
                  <p style={{ color: 'var(--color-text-muted)' }}>support@ecomargin.com<br/>sales@ecomargin.com</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ fontSize: '1.5rem' }}>📞</div>
                <div>
                  <h4 style={{ marginBottom: '0.25rem' }}>Phone</h4>
                  <p style={{ color: 'var(--color-text-muted)' }}>+91 99999 99999 (Support)<br/>+91 88888 88888 (Sales)</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Col - Form */}
          <motion.div variants={slideInRight} style={{ background: 'var(--color-bg-card)', padding: '2.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-lg)' }}>
            {isSent ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                <h3>Message Sent!</h3>
                <p style={{ color: 'var(--color-text-muted)' }}>We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>First Name</label>
                    <input required type="text" style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)', outline: 'none' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Last Name</label>
                    <input required type="text" style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)', outline: 'none' }} />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Email Address</label>
                  <input required type="email" style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)', outline: 'none' }} />
                </div>
                
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Subject</label>
                  <select required style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)', outline: 'none' }}>
                    <option value="">Select a topic...</option>
                    <option value="sales">Enterprise Sales</option>
                    <option value="support">Technical Support</option>
                    <option value="partnership">Partnerships</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Message</label>
                  <textarea required rows="4" style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)', outline: 'none', resize: 'vertical' }}></textarea>
                </div>

                <Button type="submit" variant="primary" fullWidth>Send Message</Button>
              </form>
            )}
          </motion.div>

        </motion.div>
      </div>
    </>
  )
}
