import React from 'react'
import SEO from '@seo/SEO'
import PageHeader from '@components/common/PageHeader/PageHeader'
import { motion } from 'framer-motion'
import { fadeUp } from '@animations/variants'

export default function TermsPage() {
  return (
    <>
      <SEO title="Terms of Service" />
      <PageHeader title="Terms of Service" description="Last updated: August 1, 2026" />
      
      <div className="container" style={{ padding: '6rem 0' }}>
        <motion.div initial="hidden" animate="visible" variants={fadeUp} style={{ maxWidth: '800px', margin: '0 auto', color: 'var(--color-text-muted)', lineHeight: '1.8' }}>
          
          <h2 style={{ color: 'var(--color-text)', marginBottom: '1rem', marginTop: '2rem' }}>1. Acceptance of Terms</h2>
          <p style={{ marginBottom: '1rem' }}>
            By accessing and using the EcoMargin website, mobile application, and related services (collectively, the "Services"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Services.
          </p>

          <h2 style={{ color: 'var(--color-text)', marginBottom: '1rem', marginTop: '2rem' }}>2. Use of Services</h2>
          <p style={{ marginBottom: '1rem' }}>
            You may use our Services only as permitted by law, including applicable export and re-export control laws and regulations. We may suspend or stop providing our Services to you if you do not comply with our terms or policies or if we are investigating suspected misconduct.
          </p>

          <h2 style={{ color: 'var(--color-text)', marginBottom: '1rem', marginTop: '2rem' }}>3. Payments and Billing</h2>
          <p style={{ marginBottom: '1rem' }}>
            By initiating a charging session, you authorize EcoMargin (or our third-party payment processors) to charge your selected payment method for the total amount of the session based on the tariff displayed at the time of booking or connection.
          </p>

        </motion.div>
      </div>
    </>
  )
}
