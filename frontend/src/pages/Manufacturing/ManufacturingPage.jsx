// EcoMargin Frontend — Dynamic Manufacturing Page Component
// src/pages/Manufacturing/ManufacturingPage.jsx
import React from 'react'
import SEO from '@seo/SEO'
import PageHeader from '@components/common/PageHeader/PageHeader'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@animations/variants'
import Button from '@components/ui/Button/Button'
import { Link } from 'react-router-dom'
import { useManufacturing } from '../../hooks/useCMS'

const fallbackSteps = [
  {
    title: '1. In-House SMT & PCB Assembly',
    description: 'Automated surface mount lines assemble main controller boards, power metering units, and safety protection circuits under Class 100,000 cleanroom standards.'
  },
  {
    title: '2. Enclosure Fabrication & IP Rating',
    description: 'Heavy-duty Galvanized Steel and Stainless Steel outer cabinets coated with anti-corrosive outdoor UV powder coating (IP55/IP65 Outdoor Rated).'
  },
  {
    title: '3. Full Power Burn-in Testing',
    description: '100% of manufactured chargers undergo a 48-hour continuous full-load endurance test in environmental thermal chambers.'
  },
  {
    title: '4. Safety Inspection',
    description: 'Rigorous insulation resistance, earth continuity, high-voltage withstand, surge suppression, and ground fault circuit breaker verification.'
  },
  {
    title: '5. Firmware & OCPP Protocol Validation',
    description: 'Automated software simulation testing compatibility across 50+ EV models and OCPP 1.6J/2.0.1 central management systems.'
  },
  {
    title: '6. Quality Dispatch & Logistics',
    description: 'Sealed shockproof packaging with complete test calibration reports, installation manuals, and warranty documentation.'
  }
]

export default function ManufacturingPage() {
  const { data: mfgData } = useManufacturing()

  const heroTitle = mfgData?.heroTitle || 'Designed & Built for Indian Operating Conditions'
  const heroSubtitle = mfgData?.heroSubtitle || 'OEM & White Label Manufacturing'
  const description = mfgData?.description || "Grid fluctuations, extreme ambient temperatures (up to 55°C), and dust exposure require specialized hardware engineering. EcoMargin's chargers feature built-in isolation transformers, wide input voltage tolerance (200V–480V AC), and IP55 weatherproof enclosures."
  const factoryArea = mfgData?.factoryArea || '50,000 sq.ft.'
  const annualCapacity = mfgData?.annualCapacity || '50,000+ Units'
  const burnInTestingHours = mfgData?.burnInTestingHours || '48 Hours'
  const defectRate = mfgData?.defectRate || '0.01%'
  const manufacturingSteps = mfgData?.manufacturingSteps || fallbackSteps

  return (
    <>
      <SEO 
        title="EV Charger Manufacturing & Plant Infrastructure" 
        description="Explore EcoMargin's SMT assembly lines, testing labs, burn-in chambers, and R&D facility in India." 
      />

      <PageHeader 
        title="Manufacturing Capability & Quality Infrastructure" 
        description="State-of-the-Art Production Facility Engineering India's Highest Uptime Commercial Chargers."
      />

      <div className="container" style={{ padding: '5rem 0' }}>
        
        {/* Plant Overview */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center', marginBottom: '6rem' }}>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
              {heroSubtitle}
            </span>
            <h2 style={{ fontSize: '2.25rem', marginTop: '0.5rem', marginBottom: '1.25rem', fontFamily: 'Outfit, sans-serif' }}>
              {heroTitle}
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              {description}
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link to="/contact">
                <Button variant="primary">Schedule Factory Visit</Button>
              </Link>
            </div>
          </motion.div>

          <div style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', padding: '2rem', boxShadow: 'var(--shadow-xl)' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem' }}>
              Factory Metrics
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <div style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--color-primary)' }}>{factoryArea}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Factory Floor Area</div>
              </div>
              <div>
                <div style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--color-primary)' }}>{annualCapacity}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Chargers Produced / Year</div>
              </div>
              <div>
                <div style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--color-primary)' }}>{burnInTestingHours}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Full Burn-in Testing</div>
              </div>
              <div>
                <div style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--color-primary)' }}>{defectRate}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>RMA Defect Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Manufacturing Step Grid */}
        <div style={{ marginBottom: '4rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 3.5rem auto' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Standard Operating Procedure
            </span>
            <h2 style={{ fontSize: '2.25rem', marginTop: '0.25rem', fontFamily: 'Outfit, sans-serif' }}>
              The 6-Step Manufacturing Process
            </h2>
          </div>

          <motion.div 
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}
          >
            {manufacturingSteps.map((step, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                style={{
                  background: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.75rem',
                  boxShadow: 'var(--shadow-md)'
                }}
              >
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', color: 'var(--color-primary)' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </>
  )
}
