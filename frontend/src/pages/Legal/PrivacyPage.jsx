import React from 'react'
import SEO from '@seo/SEO'
import PageHeader from '@components/common/PageHeader/PageHeader'
import { motion } from 'framer-motion'
import { fadeUp } from '@animations/variants'

export default function PrivacyPage() {
  return (
    <>
      <SEO title="Privacy Policy" />
      <PageHeader title="Privacy Policy" description="Last updated: August 1, 2026" />
      
      <div className="container" style={{ padding: '6rem 0' }}>
        <motion.div initial="hidden" animate="visible" variants={fadeUp} style={{ maxWidth: '800px', margin: '0 auto', color: 'var(--color-text-muted)', lineHeight: '1.8' }}>
          
          <h2 style={{ color: 'var(--color-text)', marginBottom: '1rem', marginTop: '2rem' }}>1. Information We Collect</h2>
          <p style={{ marginBottom: '1rem' }}>
            We collect information you provide directly to us, such as when you create or modify your account, request on-demand services, contact customer support, or otherwise communicate with us. This information may include: name, email, phone number, postal address, profile picture, payment method, and other information you choose to provide.
          </p>

          <h2 style={{ color: 'var(--color-text)', marginBottom: '1rem', marginTop: '2rem' }}>2. How We Use Information</h2>
          <p style={{ marginBottom: '1rem' }}>
            We use the information we collect to provide, maintain, and improve our services, including to facilitate payments, send receipts, provide products and services you request, develop new features, provide customer support to Users and Drivers, develop safety features, authenticate users, and send product updates and administrative messages.
          </p>

          <h2 style={{ color: 'var(--color-text)', marginBottom: '1rem', marginTop: '2rem' }}>3. Location Data</h2>
          <p style={{ marginBottom: '1rem' }}>
            When you use our services, we may collect precise location data about the charging station you are using and your device's location to facilitate routing and booking. You can opt-out of location sharing, but it may affect app functionality.
          </p>
          
        </motion.div>
      </div>
    </>
  )
}
