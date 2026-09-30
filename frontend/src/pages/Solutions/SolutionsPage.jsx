import React from 'react'
import { Link } from 'react-router-dom'
import SEO from '@seo/SEO'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@animations/variants'
import PageHeader from '@components/common/PageHeader/PageHeader'
import Button from '@components/ui/Button/Button'

export default function SolutionsPage() {
  const solutions = [
    { title: 'Commercial Real Estate', img: '🏢', desc: 'Attract high-value tenants and visitors by offering reliable on-site EV charging. We handle turnkey hardware, billing, and maintenance.' },
    { title: 'Retail & Hospitality', img: '🏪', desc: 'Increase dwell time and foot traffic. Shoppers stay longer when their electric cars are charging, boosting your revenue.' },
    { title: 'Fleet Operations & Logistics', img: '🚚', desc: 'Ensure your electric vans, trucks, or taxis are fully charged and ready for daily delivery routes with smart scheduling and load balancing.' },
    { title: 'Workplaces & IT Parks', img: '💼', desc: 'Provide an essential green perk for employees transitioning to EVs. Set custom tariffs for employees vs. visitors.' },
    { title: 'Highway Fast Charging Plazas', img: '🛣️', desc: 'Scale high-power 60kW to 240kW DC fast charging stations along state and national expressways with reliable grid load management.' },
    { title: 'Residential & Gated Communities', img: '🏘️', desc: 'Fair automated billing, RFID access control, and dynamic load management for apartment complexes and residential towers.' }
  ]

  return (
    <>
      <SEO 
        title="EV Charging Solutions for Businesses & Infrastructure | EcoMargin" 
        description="Turnkey EV charging solutions for commercial complexes, highway corridors, residential projects, hotels, and fleet hubs across India by EcoMargin." 
        pageRoute="/solutions"
      />
      
      <PageHeader 
        title="EV Charging Solutions by Industry" 
        description="Scalable hardware and intelligent OCPP software tailored for commercial complexes, highway hubs, and fleets."
      />

      <div className="container" style={{ padding: '6rem 0' }}>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          
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
                transition: 'transform var(--transition-fast)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ height: '180px', background: 'var(--color-bg-alt)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '5rem', borderBottom: '1px solid var(--color-border)' }}>
                  {sol.img}
                </div>
                <div style={{ padding: '2rem' }}>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>{sol.title}</h3>
                  <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>{sol.desc}</p>
                </div>
              </div>
              <div style={{ padding: '0 2rem 2rem 2rem' }}>
                <Link to="/enquiry" style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                  Consult for {sol.title} →
                </Link>
              </div>
            </motion.div>
          ))}
          
        </motion.div>

        {/* Bottom CTA for Enterprise RFQ */}
        <motion.div 
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ 
            marginTop: '5rem', 
            background: 'var(--color-bg-card)', 
            border: '1px solid var(--color-border)', 
            borderRadius: 'var(--radius-xl)', 
            padding: '3.5rem 2rem', 
            textAlign: 'center',
            boxShadow: 'var(--shadow-md)'
          }}
        >
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', fontFamily: 'Outfit, sans-serif' }}>
            Need a Customized EV Infrastructure Plan?
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', maxWidth: '650px', margin: '0 auto 2rem' }}>
            Our engineering team conducts site feasibility studies, grid sanction analysis, and equipment sizing for your specific property.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/enquiry">
              <Button variant="primary" size="lg">Request Site Consultation</Button>
            </Link>
            <Link to="/products">
              <Button variant="outline" size="lg">Explore EV Chargers</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  )
}
