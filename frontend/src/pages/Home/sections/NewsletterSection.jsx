import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Button from '@components/ui/Button/Button'
import publicApi from '../../../services/publicApi'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !email.includes('@')) return
    setLoading(true)
    try {
      await publicApi.subscribeNewsletter({ email })
      setSubscribed(true)
    } catch (err) {
      console.warn('⚠️ Newsletter subscription notice:', err.message)
      setSubscribed(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section style={{ padding: '6rem 0', background: 'var(--color-bg-card)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
      <div className="container">
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '2rem' }}>
          
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} style={{ flex: '1 1 400px' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Stay Ahead of the EV Curve</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.125rem' }}>
              Subscribe to our whitepapers for the latest AIS-138 standards, hardware thermal management guides, and EV charging industry updates.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} style={{ flex: '1 1 400px' }}>
            {subscribed ? (
              <div style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--color-primary)', border: '1px solid var(--color-primary)', padding: '1rem 1.5rem', borderRadius: 'var(--radius-full)', fontWeight: 600, textAlign: 'center' }}>
                ✓ Thank you for subscribing to EcoMargin Whitepapers!
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem' }}>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your work email address"
                  style={{ flex: 1, padding: '1rem 1.5rem', borderRadius: 'var(--radius-full)', background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)', outline: 'none' }}
                />
                <Button type="submit" variant="primary" disabled={loading} style={{ borderRadius: 'var(--radius-full)' }}>
                  {loading ? 'Subscribing...' : 'Subscribe'}
                </Button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
