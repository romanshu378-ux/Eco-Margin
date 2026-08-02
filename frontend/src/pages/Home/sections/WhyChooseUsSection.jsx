import React from 'react'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, slideInLeft, slideInRight } from '@animations/variants'

export default function WhyChooseUsSection() {
  const points = [
    { title: '99.9% Uptime Guarantee', desc: 'Our redundant infrastructure ensures your chargers stay online.', icon: '🛡️' },
    { title: 'Automated Fault Recovery', desc: 'Remote reset capabilities resolve 70% of hardware faults automatically.', icon: '🤖' },
    { title: 'Bank-Grade Security', desc: 'PCI-DSS compliant payment gateways and encrypted OCPP communication.', icon: '🔒' },
    { title: '24/7 Global Support', desc: 'Dedicated NOC team monitoring your network around the clock.', icon: '🌐' }
  ]

  return (
    <section style={{ padding: '8rem 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, right: 0, width: '400px', height: '400px', background: 'radial-gradient(circle, var(--color-primary-light) 0%, transparent 70%)', filter: 'blur(80px)', zIndex: -1 }} />
      
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideInLeft}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Why Choose <br/><span className="text-gradient">EcoMargin?</span></h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.125rem', marginBottom: '2rem', lineHeight: '1.6' }}>
              Unlike generic software providers, we specialize exclusively in the EV charging domain. Our engineers understand the nuances of OCPP, load balancing, and EVSE hardware better than anyone else.
            </p>
            <div style={{ padding: '2rem', background: 'var(--color-bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-primary)', borderLeft: '4px solid var(--color-primary)' }}>
              <p style={{ fontStyle: 'italic', color: 'var(--color-text)' }}>
                "Switching to EcoMargin reduced our charger downtime by 85% in the first quarter alone."
              </p>
              <div style={{ marginTop: '1rem', fontWeight: '600', fontSize: '0.875rem' }}>— Sarah J., Fleet Director</div>
            </div>
          </motion.div>

          <motion.div 
            variants={staggerContainer} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            {points.map((pt, i) => (
              <motion.div 
                key={i} variants={fadeUp}
                style={{ display: 'flex', gap: '1.5rem', background: 'var(--color-bg-alt)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}
              >
                <div style={{ fontSize: '2rem', background: 'var(--color-bg)', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {pt.icon}
                </div>
                <div>
                  <h4 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>{pt.title}</h4>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', lineHeight: '1.5' }}>{pt.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
        </div>
      </div>
    </section>
  )
}
