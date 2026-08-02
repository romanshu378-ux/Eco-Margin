import React from 'react'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@animations/variants'

export default function TestimonialsSection() {
  const testimonials = [
    { name: 'David Chen', role: 'CTO, Metro Transit', text: 'EcoMargin gave us the visibility we needed to manage our fleet of electric buses without worrying about peak demand charges.', rating: 5 },
    { name: 'Amanda Russo', role: 'Property Manager', text: 'The ease of onboarding new tenants to our charging network is incredible. Billing is handled completely automatically.', rating: 5 },
    { name: 'Michael O.', role: 'EV Driver', text: 'Best app out there for long road trips. I can book a 150kW charger an hour in advance and just plug in when I arrive.', rating: 5 }
  ]

  return (
    <section style={{ padding: '8rem 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
            What Our Users Say
          </motion.h2>
        </div>

        <motion.div 
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}
        >
          {testimonials.map((t, i) => (
            <motion.div 
              key={i} variants={fadeUp}
              style={{ background: 'var(--color-bg-card)', padding: '2rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)' }}
            >
              <div style={{ display: 'flex', gap: '4px', color: 'var(--color-warning)', marginBottom: '1rem', fontSize: '1.25rem' }}>
                {'★'.repeat(t.rating)}
              </div>
              <p style={{ color: 'var(--color-text)', fontSize: '1.125rem', lineHeight: '1.6', marginBottom: '1.5rem', fontStyle: 'italic' }}>
                "{t.text}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--color-bg-alt)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem' }}>{t.name}</h4>
                  <div style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
