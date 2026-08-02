import React from 'react'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@animations/variants'

export default function TimelineSection() {
  const steps = [
    { year: '2024', title: 'Foundation', desc: 'EcoMargin is founded to solve the fragmentation in EV charging networks.' },
    { year: '2025', title: 'Platform Launch', desc: 'Our v1.0 CSMS goes live, onboarding the first 1,000 chargers.' },
    { year: '2026', title: 'Global Expansion', desc: 'Expanding operations to Europe and Asia with localization support.' },
    { year: '2027', title: 'V2G Integration', desc: 'Pioneering Vehicle-to-Grid technology for true smart grid balance.' }
  ]

  return (
    <section style={{ padding: '8rem 0', background: 'var(--color-bg-alt)', position: 'relative' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
            Our Roadmap
          </motion.h2>
        </div>

        <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
          {/* Vertical Line */}
          <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 0, bottom: 0, width: '2px', background: 'var(--color-border)' }} />

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {steps.map((step, i) => (
              <motion.div key={i} variants={fadeUp} style={{ display: 'flex', justifyContent: i % 2 === 0 ? 'flex-start' : 'flex-end', position: 'relative' }}>
                
                {/* Dot */}
                <div style={{ position: 'absolute', left: '50%', top: '24px', transform: 'translate(-50%, -50%)', width: '16px', height: '16px', borderRadius: '50%', background: 'var(--color-primary)', border: '4px solid var(--color-bg-alt)', zIndex: 2 }} />

                {/* Content Card */}
                <div style={{ width: '45%', padding: '1.5rem', background: 'var(--color-bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', position: 'relative' }}>
                  {/* Arrow pointing to line */}
                  <div style={{ 
                    position: 'absolute', top: '24px', [i % 2 === 0 ? 'right' : 'left']: '-8px', 
                    transform: 'translateY(-50%) rotate(45deg)', width: '16px', height: '16px', 
                    background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', 
                    borderLeft: i % 2 === 0 ? 'none' : undefined, borderBottom: i % 2 === 0 ? 'none' : undefined,
                    borderRight: i % 2 !== 0 ? 'none' : undefined, borderTop: i % 2 !== 0 ? 'none' : undefined,
                    zIndex: 1
                  }} />
                  <div style={{ color: 'var(--color-primary)', fontWeight: '700', fontSize: '1.25rem', marginBottom: '0.5rem', fontFamily: 'Outfit' }}>{step.year}</div>
                  <h4 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>{step.title}</h4>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>{step.desc}</p>
                </div>

              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
