import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '@components/ui/Button/Button'
import { PATHS } from '@routes/paths'

export default function ContactCTASection() {
  return (
    <section style={{ padding: '8rem 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, var(--color-primary-light) 0%, transparent 100%)', zIndex: -1 }} />
      <div className="container" style={{ textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', marginBottom: '1.5rem', maxWidth: '800px', margin: '0 auto 1.5rem' }}>
            Ready to transform your EV charging network?
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.125rem', marginBottom: '2.5rem' }}>
            Our team of experts is ready to help you plan, deploy, and scale your infrastructure.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to={PATHS.CONTACT}>
              <Button size="lg" variant="primary">Talk to Sales</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
