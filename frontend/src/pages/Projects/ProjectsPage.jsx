import React from 'react'
import SEO from '@seo/SEO'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@animations/variants'
import PageHeader from '@components/common/PageHeader/PageHeader'

export default function ProjectsPage() {
  const projects = [
    { title: 'Metro City Fast Charging Hub', category: 'Public Infrastructure', scope: '50x 150kW DC Chargers' },
    { title: 'EcoRetail Shopping Mall Network', category: 'Retail', scope: '120x 22kW AC Chargers across 10 locations' },
    { title: 'Global Logistics Fleet Electrification', category: 'Fleet', scope: 'Custom CSMS & 200 Depot Chargers' },
    { title: 'Skyline Residential Towers', category: 'Real Estate', scope: 'Smart Load Balancing for 500 Parking Spots' },
    { title: 'Highway Supercharge Corridor', category: 'Public Infrastructure', scope: '300kW Ultra-Fast Chargers every 50 miles' },
    { title: 'TechPark Employee Transit', category: 'Workplace', scope: 'Bus Fleet Charging & Employee AC stations' }
  ]

  return (
    <>
      <SEO title="Our Projects" description="View our portfolio of successful EV charging deployments." />
      
      <PageHeader 
        title="Our Projects" 
        description="Discover how we've helped businesses across the globe electrify their operations."
      />

      <div className="container" style={{ padding: '6rem 0' }}>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
          
          {projects.map((proj, i) => (
            <motion.div 
              key={i} 
              variants={fadeUp}
              whileHover={{ y: -5 }}
              style={{ 
                background: 'var(--color-bg-card)', 
                borderRadius: 'var(--radius-xl)', 
                border: '1px solid var(--color-border)',
                overflow: 'hidden',
                transition: 'transform var(--transition-fast)',
                cursor: 'pointer'
              }}
            >
              <div style={{ height: '250px', background: 'var(--color-bg-alt)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>[Project Image Placeholder]</span>
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'var(--color-bg-glass)', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: '600', color: 'var(--color-text)', backdropFilter: 'blur(4px)' }}>
                  {proj.category}
                </div>
              </div>
              <div style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{proj.title}</h3>
                <p style={{ color: 'var(--color-primary)', fontSize: '0.9rem', fontWeight: '500' }}>{proj.scope}</p>
              </div>
            </motion.div>
          ))}
          
        </motion.div>
      </div>
    </>
  )
}
