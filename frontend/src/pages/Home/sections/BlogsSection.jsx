import React from 'react'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@animations/variants'
import Button from '@components/ui/Button/Button'

export default function BlogsSection() {
  const blogs = [
    { title: 'The Future of V2G Technology', date: 'Oct 12, 2026', category: 'Technology', desc: 'How Vehicle-to-Grid will change the way we think about peak energy demand.' },
    { title: 'Optimizing Fleet Charging Schedules', date: 'Sep 28, 2026', category: 'Fleet Management', desc: 'Strategies for delivery fleets to minimize downtime and charging costs.' },
    { title: 'OCPP 2.0.1 Explained', date: 'Sep 15, 2026', category: 'Industry Standards', desc: 'Everything you need to know about the latest Open Charge Point Protocol.' }
  ]

  return (
    <section style={{ padding: '8rem 0', background: 'var(--color-bg-alt)' }}>
      <div className="container">
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '2rem', marginBottom: '4rem' }}>
          <div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
              Latest Insights
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} style={{ color: 'var(--color-text-muted)', fontSize: '1.125rem' }}>
              News, guides, and updates from the EcoMargin team.
            </motion.p>
          </div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <Button variant="outline">View All Articles</Button>
          </motion.div>
        </div>

        <motion.div 
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}
        >
          {blogs.map((blog, i) => (
            <motion.article 
              key={i} variants={fadeUp}
              whileHover={{ y: -5 }}
              style={{ background: 'var(--color-bg)', borderRadius: 'var(--radius-xl)', overflow: 'hidden', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', transition: 'transform var(--transition-fast)' }}
            >
              {/* Image Placeholder */}
              <div style={{ height: '200px', background: 'var(--color-bg-card)', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>[Blog Cover]</span>
              </div>
              <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', fontSize: '0.875rem' }}>
                  <span style={{ color: 'var(--color-primary)', fontWeight: '600' }}>{blog.category}</span>
                  <span style={{ color: 'var(--color-text-muted)' }}>{blog.date}</span>
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', lineHeight: '1.4' }}>{blog.title}</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', flex: 1 }}>{blog.desc}</p>
                <div style={{ color: 'var(--color-primary)', fontWeight: '600', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  Read Article <span>&rarr;</span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
