import React from 'react'
import SEO from '@seo/SEO'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@animations/variants'
import PageHeader from '@components/common/PageHeader/PageHeader'
import Button from '@components/ui/Button/Button'

export default function ServicesPage() {
  const services = [
    { title: 'Turnkey Installation', icon: '🏗️', desc: 'From site assessment to grid connection, we handle the entire hardware deployment process.' },
    { title: 'Software Integration', icon: '🔌', desc: 'Connecting your chargers to the EcoMargin CSMS via OCPP, ensuring stable communication.' },
    { title: '24/7 Monitoring & NOC', desc: 'Our Network Operations Center monitors your hardware around the clock, proactively resolving issues.', icon: '📡' },
    { title: 'Maintenance & Repair', icon: '🔧', desc: 'On-site technical support and preventative maintenance to guarantee 99.9% uptime.' },
    { title: 'Custom App Development', icon: '📱', desc: 'White-labeled driver applications tailored to your brand identity and specific workflows.' },
    { title: 'Energy Consulting', icon: '🔋', desc: 'Strategic planning for microgrids, battery storage integrations, and peak demand shaving.' }
  ]

  return (
    <>
      <SEO title="Professional Services" description="End-to-end EV charging infrastructure services." />
      
      <PageHeader 
        title="Professional Services" 
        description="We don't just provide software. We partner with you to ensure your network succeeds from day one."
      />

      <div className="container" style={{ padding: '6rem 0' }}>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
          
          {services.map((srv, i) => (
            <motion.div 
              key={i} 
              variants={fadeUp}
              whileHover={{ y: -5, borderColor: 'var(--color-primary-light)' }}
              style={{ 
                background: 'var(--color-bg-card)', 
                padding: '3rem 2rem', 
                borderRadius: 'var(--radius-xl)', 
                border: '1px solid var(--color-border)',
                transition: 'all var(--transition-fast)',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1.5rem', background: 'var(--color-bg-alt)', width: '80px', height: '80px', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>
                {srv.icon}
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{srv.title}</h3>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6', marginBottom: '2rem' }}>{srv.desc}</p>
              <Button variant="outline" size="sm">Learn More</Button>
            </motion.div>
          ))}
          
        </motion.div>
      </div>
    </>
  )
}
