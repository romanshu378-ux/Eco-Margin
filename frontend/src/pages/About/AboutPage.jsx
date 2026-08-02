// EcoMargin Frontend — Dynamic About Page Component
// src/pages/About/AboutPage.jsx
import React from 'react'
import SEO from '@seo/SEO'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@animations/variants'
import PageHeader from '@components/common/PageHeader/PageHeader'
import { useAbout } from '../../hooks/useCMS'

export default function AboutPage() {
  const { data: aboutData } = useAbout()

  const story = aboutData?.story || "Founded in 2020, EcoMargin has grown into a leading OEM EV charger manufacturer and EPC infrastructure contractor operating a 50,000 sq.ft. certified facility in Noida, India."
  const vision = aboutData?.vision || "To accelerate global e-mobility adoption by manufacturing reliable, high-uptime EV charging hardware."
  const mission = aboutData?.mission || "Engineering 100% indigenous Indian-manufactured commercial chargers tailored for harsh grid conditions."
  const directorMessage = aboutData?.directorMessage || "India's EV revolution requires ultra-fast, robust charging stations backed by 24/7 NOC monitoring."
  const factoryArea = aboutData?.factoryArea || "50,000 sq.ft."
  const annualCapacity = aboutData?.annualCapacity || "50,000+ Units"
  const burnInTestingHours = aboutData?.burnInTestingHours || "48 Hours"
  const defectRate = aboutData?.defectRate || "0.01%"

  return (
    <>
      <SEO title="About Us" description="Learn more about EcoMargin's manufacturing mission and EV charging infrastructure." />
      
      <PageHeader 
        title="About EcoMargin OEM Factory" 
        description="Pioneering Indigenous EV Charger Manufacturing & Turnkey EPC Infrastructure."
      />

      <div className="container" style={{ padding: '6rem 0' }}>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} style={{ maxWidth: '900px', margin: '0 auto' }}>
          
          {/* Corporate Story */}
          <motion.div variants={fadeUp} style={{ background: 'var(--color-bg-card)', padding: '3rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)', marginBottom: '3rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--color-primary)' }}>Our Manufacturing Legacy</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', lineHeight: '1.7', fontSize: '1.05rem' }}>
              {story}
            </p>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.7', fontSize: '1.05rem' }}>
              {directorMessage}
            </p>
          </motion.div>

          {/* Plant Metrics */}
          <motion.div variants={fadeUp} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
            {[
              { title: 'Factory Plant Area', icon: '🏭', desc: factoryArea },
              { title: 'Annual Capacity', icon: '⚡', desc: annualCapacity },
              { title: 'Burn-in Testing', icon: '🔥', desc: burnInTestingHours },
              { title: 'RMA Defect Rate', icon: '🛡️', desc: defectRate }
            ].map((val, i) => (
              <div key={i} style={{ background: 'var(--color-bg-alt)', padding: '1.75rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', textAlign: 'center' }}>
                <div style={{ fontSize: '2.25rem', marginBottom: '0.75rem' }}>{val.icon}</div>
                <h4 style={{ marginBottom: '0.35rem', color: 'var(--color-primary)' }}>{val.title}</h4>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>{val.desc}</div>
              </div>
            ))}
          </motion.div>

          {/* Vision & Mission Cards */}
          <motion.div variants={fadeUp} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
            <div style={{ background: 'var(--color-bg-card)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--color-primary)' }}>🌍 Corporate Vision</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>{vision}</p>
            </div>
            <div style={{ background: 'var(--color-bg-card)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--color-primary)' }}>⚡ Core Mission</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>{mission}</p>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </>
  )
}
