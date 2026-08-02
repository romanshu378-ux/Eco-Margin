import React from 'react'
import { motion } from 'framer-motion'
import Button from '@components/ui/Button/Button'

export default function NewsletterSection() {
  return (
    <section style={{ padding: '6rem 0', background: 'var(--color-bg-card)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
      <div className="container">
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '2rem' }}>
          
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} style={{ flex: '1 1 400px' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Stay Ahead of the Curve</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.125rem' }}>
              Subscribe to our newsletter for the latest EV industry trends, product updates, and exclusive offers. No spam, ever.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} style={{ flex: '1 1 400px', display: 'flex', gap: '0.5rem' }}>
            <input 
              type="email" 
              placeholder="Enter your email address"
              style={{ flex: 1, padding: '1rem 1.5rem', borderRadius: 'var(--radius-full)', background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)', outline: 'none' }}
            />
            <Button variant="primary" style={{ borderRadius: 'var(--radius-full)' }}>Subscribe</Button>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
