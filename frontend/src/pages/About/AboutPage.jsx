import React from 'react'
import SEO from '@seo/SEO'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@animations/variants'
import PageHeader from '@components/common/PageHeader/PageHeader'

export default function AboutPage() {
  return (
    <>
      <SEO title="About Us" description="Learn more about EcoMargin's mission to power the electric future." />
      
      <PageHeader 
        title="About Us" 
        description="Driving the Green Revolution one charger at a time."
      />

      <div className="container" style={{ padding: '6rem 0' }}>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} style={{ maxWidth: '800px', margin: '0 auto' }}>
          
          <motion.div variants={fadeUp} style={{ background: 'var(--color-bg-card)', padding: '3rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)', marginBottom: '3rem' }}>
            <h2 style={{ marginBottom: '1rem' }}>Our Story</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              Started in 2024 by a team of passionate EV enthusiasts and software engineers, EcoMargin noticed a gap in the market: while EVs were becoming mainstream, the charging infrastructure software was lagging behind. It was fragmented, unreliable, and hard to use.
            </p>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
              We built a unified platform that connects hardware operators directly with consumers, providing real-time data, seamless payments, and guaranteed bookings. Today, we manage thousands of chargers globally, ensuring 99.9% uptime.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {[
              { title: 'Sustainability First', icon: '🌍', desc: 'Every line of code we write is aimed at reducing global carbon emissions.' },
              { title: 'Reliability', icon: '⚡', desc: 'If our app says a charger is available, it is. No more broken promises.' },
              { title: 'Innovation', icon: '💡', desc: 'We continuously push the boundaries of what smart grids can do.' }
            ].map((val, i) => (
              <div key={i} style={{ background: 'var(--color-bg-alt)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{val.icon}</div>
                <h3 style={{ marginBottom: '0.5rem' }}>{val.title}</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>{val.desc}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}
