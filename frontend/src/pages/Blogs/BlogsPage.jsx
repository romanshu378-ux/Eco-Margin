import React, { useState, useEffect } from 'react'
import SEO from '@seo/SEO'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@animations/variants'
import PageHeader from '@components/common/PageHeader/PageHeader'
import publicApi from '@services/publicApi'

const fallbackBlogs = [
  { title: 'Understanding ARAI AIS-138 Certification for Indian EV Chargers', slug: 'arai-ais-138-certification-ev-chargers', author: 'Dr. R. K. Sharma (CTO)', summary: 'A comprehensive technical overview of grid safety, surge suppression, and insulation testing mandated under AIS-138 Part 1 & 2 standards.', coverImage: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80' },
  { title: 'Why Thermal Management & IP55 Enclosures Matter in 50°C Summers', slug: 'thermal-management-ip55-enclosures-ev-chargers', author: 'EcoMargin R&D Team', summary: 'How active liquid cooling and wide voltage tolerance prevent thermal throttling during peak Indian summer ambient temperatures.', coverImage: 'https://images.unsplash.com/photo-1558441719-aa34455441bd?auto=format&fit=crop&w=800&q=80' }
]

export default function BlogsPage() {
  const [blogs, setBlogs] = useState(fallbackBlogs)

  useEffect(() => {
    const fetchLiveBlogs = async () => {
      try {
        const res = await publicApi.getBlogs()
        if (res && res.data && res.data.length > 0) {
          setBlogs(res.data)
        }
      } catch (err) {
        console.warn('Live blogs fetch notice:', err.message)
      }
    }
    fetchLiveBlogs()
  }, [])

  return (
    <>
      <SEO title="Blogs & Technical Insights" description="Latest technical whitepapers, ARAI certification guides, and EV industry insights from EcoMargin." />
      
      <PageHeader 
        title="Blogs & Technical Insights" 
        description="Stay up to date with EV charging engineering, ARAI compliance standards, and OEM manufacturing technology."
      />

      <div className="container" style={{ padding: '6rem 0' }}>
        {/* Post Grid */}
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {blogs.map((blog, i) => {
            const img = blog.coverImage || blog.cover_image;
            return (
              <motion.article 
                key={blog.id || i} variants={fadeUp}
                whileHover={{ y: -5 }}
                style={{ background: 'var(--color-bg-card)', borderRadius: 'var(--radius-xl)', overflow: 'hidden', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', transition: 'transform var(--transition-fast)' }}
              >
                <div style={{ height: '220px', background: 'var(--color-bg-alt)', borderBottom: '1px solid var(--color-border)', overflow: 'hidden' }}>
                  {img ? (
                    <img src={img} alt={blog.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--color-text-muted)' }}>
                      [Blog Cover]
                    </div>
                  )}
                </div>
                <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', fontSize: '0.875rem' }}>
                    <span style={{ color: 'var(--color-primary)', fontWeight: '600' }}>{blog.author || 'EcoMargin Team'}</span>
                    <span style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>{blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : 'Technical Guide'}</span>
                  </div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', lineHeight: '1.4' }}>{blog.title}</h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', flex: 1 }}>{blog.summary || (blog.content ? blog.content.substring(0, 120) + '...' : '')}</p>
                </div>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </>
  )
}
