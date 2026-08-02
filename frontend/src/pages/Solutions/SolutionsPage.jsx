import React from 'react'
import SEO from '@seo/SEO'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@animations/variants'
import PageHeader from '@components/common/PageHeader/PageHeader'

export default function SolutionsPage() {
  const solutions = [
    { title: 'Commercial Real Estate', img: '🏢', desc: 'Attract high-value tenants and visitors by offering reliable on-site EV charging. We handle the billing and maintenance.' },
    { title: 'Retail & Hospitality', img: '🏪', desc: 'Increase dwell time and foot traffic. Shoppers stay longer when their cars are charging, boosting your revenue.' },
    { title: 'Fleet Operations', img: '🚚', desc: 'Ensure your electric vans, trucks, or taxis are fully charged and ready for routes with smart scheduling and load balancing.' },
    { title: 'Workplaces', img: '💼', desc: 'Provide an essential perk for employees transitioning to EVs. Set custom tariffs for employees vs. guests.' },
    { title: 'Public Charging Networks', img: '🛣️', desc: 'Scale your fast-charging network across highways and cities with our robust roaming and authorization integrations.' },
    { title: 'Residential Complexes', img: '🏘️', desc: 'Fair billing and load management for apartment buildings where power capacity is limited.' }
  ]

  return (
    <>
      <SEO title="Solutions by Industry" description="Tailored EV charging solutions for every industry." />
      
      <PageHeader 
        title="Solutions by Industry" 
        description="Our platform adapts to your specific business model and energy requirements."
      />

      <div className="container" style={{ padding: '6rem 0' }}>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          
          {solutions.map((sol, i) => (
            <motion.div 
              key={i} 
              variants={fadeUp}
              whileHover={{ y: -5 }}
              style={{ 
                background: 'var(--color-bg-card)', 
                borderRadius: 'var(--radius-xl)', 
                border: '1px solid var(--color-border)',
                overflow: 'hidden',
                transition: 'transform var(--transition-fast)'
              }}
            >
              <div style={{ height: '180px', background: 'var(--color-bg-alt)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '5rem', borderBottom: '1px solid var(--color-border)' }}>
                {sol.img}
              </div>
              <div style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>{sol.title}</h3>
                <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>{sol.desc}</p>
              </div>
            </motion.div>
          ))}
          
        </motion.div>
      </div>
    </>
  )
}
