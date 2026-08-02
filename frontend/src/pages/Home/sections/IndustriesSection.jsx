import React from 'react'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@animations/variants'

export default function IndustriesSection() {
  const industries = [
    { title: 'Commercial Real Estate', img: '🏢', desc: 'Attract high-value tenants by offering reliable on-site EV charging.' },
    { title: 'Retail & Hospitality', img: '🏪', desc: 'Increase dwell time and foot traffic while shoppers charge.' },
    { title: 'Fleet Operations', img: '🚚', desc: 'Ensure your electric vans and trucks are fully charged and ready for routes.' },
    { title: 'Workplaces', img: '💼', desc: 'Provide an essential perk for employees transitioning to electric vehicles.' }
  ]

  return (
    <section style={{ padding: '8rem 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
            Solutions for Every Industry
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} style={{ color: 'var(--color-text-muted)', fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto' }}>
            Our platform adapts to your specific business model.
          </motion.p>
        </div>

        <motion.div 
          variants={staggerContainer} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-50px" }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}
        >
          {industries.map((ind, i) => (
            <motion.div 
              key={i} 
              variants={fadeUp}
              style={{ 
                background: 'var(--color-bg-alt)', 
                borderRadius: 'var(--radius-xl)', 
                border: '1px solid var(--color-border)',
                overflow: 'hidden'
              }}
            >
              <div style={{ height: '150px', background: 'var(--color-bg-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem', borderBottom: '1px solid var(--color-border)' }}>
                {ind.img}
              </div>
              <div style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>{ind.title}</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>{ind.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
