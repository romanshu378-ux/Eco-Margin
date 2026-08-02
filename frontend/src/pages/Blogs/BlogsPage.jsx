import React from 'react'
import SEO from '@seo/SEO'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@animations/variants'
import PageHeader from '@components/common/PageHeader/PageHeader'
import Button from '@components/ui/Button/Button'

export default function BlogsPage() {
  const blogs = [
    { title: 'The Future of V2G Technology', date: 'Oct 12, 2026', category: 'Technology', desc: 'How Vehicle-to-Grid will change the way we think about peak energy demand.' },
    { title: 'Optimizing Fleet Charging Schedules', date: 'Sep 28, 2026', category: 'Fleet Management', desc: 'Strategies for delivery fleets to minimize downtime and charging costs.' },
    { title: 'OCPP 2.0.1 Explained', date: 'Sep 15, 2026', category: 'Industry Standards', desc: 'Everything you need to know about the latest Open Charge Point Protocol.' },
    { title: 'Understanding Dynamic Load Balancing', date: 'Sep 02, 2026', category: 'Technology', desc: 'How to charge 50 EVs simultaneously on a 200A panel.' },
    { title: 'State of Public Charging 2026', date: 'Aug 20, 2026', category: 'Market Insights', desc: 'An analysis of global public charging infrastructure growth.' },
    { title: 'EcoMargin Series B Funding', date: 'Aug 05, 2026', category: 'Company News', desc: 'We raised $50M to accelerate our global expansion and R&D.' }
  ]

  return (
    <>
      <SEO title="Blogs & Insights" description="Latest news, guides, and industry insights from EcoMargin." />
      
      <PageHeader 
        title="Blogs & Insights" 
        description="Stay up to date with the latest trends in EV charging technology and company news."
      />

      <div className="container" style={{ padding: '6rem 0' }}>
        {/* Featured Post */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', background: 'var(--color-bg-card)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)', overflow: 'hidden' }}>
            <div style={{ flex: '1 1 500px', height: '400px', background: 'var(--color-bg-alt)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <span style={{ color: 'var(--color-text-muted)' }}>[Featured Image]</span>
            </div>
            <div style={{ flex: '1 1 400px', padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ color: 'var(--color-primary)', fontWeight: '600', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.875rem' }}>Featured</div>
              <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>How AI is Transforming EV Charging Network Reliability</h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '1.125rem', marginBottom: '2rem', lineHeight: '1.6' }}>
                Discover how machine learning algorithms predict hardware failures before they happen, ensuring 99.9% uptime across the EcoMargin network.
              </p>
              <div>
                <Button variant="primary">Read Full Article</Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Post Grid */}
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {blogs.map((blog, i) => (
            <motion.article 
              key={i} variants={fadeUp}
              whileHover={{ y: -5 }}
              style={{ background: 'var(--color-bg)', borderRadius: 'var(--radius-xl)', overflow: 'hidden', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', transition: 'transform var(--transition-fast)' }}
            >
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
    </>
  )
}
