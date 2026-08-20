import React, { useState, useEffect } from 'react'
import SEO from '@seo/SEO'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@animations/variants'
import PageHeader from '@components/common/PageHeader/PageHeader'
import publicApi from '@services/publicApi'

const fallbackBlogs = [
  { title: 'Understanding Indian Grid Standards & Safety Regulations for EV Chargers', slug: 'indian-grid-standards-ev-chargers', author: 'Dr. R. K. Sharma (CTO)', summary: 'A comprehensive technical overview of grid safety, surge suppression, and insulation testing mandated for EV charging infrastructure.', coverImage: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80' },
  { title: 'Why Thermal Management & IP55 Enclosures Matter in 50°C Summers', slug: 'thermal-management-ip55-enclosures-ev-chargers', author: 'EcoMargin R&D Team', summary: 'How active liquid cooling and wide voltage tolerance prevent thermal throttling during peak Indian summer ambient temperatures.', coverImage: 'https://images.unsplash.com/photo-1558441719-aa34455441bd?auto=format&fit=crop&w=800&q=80' }
]

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLiveBlogs = async () => {
      try {
        const res = await publicApi.getBlogs()
        if (res && res.data) {
          setBlogs(res.data)
        }
      } catch (err) {
        console.warn('Live blogs fetch notice:', err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchLiveBlogs()
  }, [])

  return (
    <>
      <SEO title="Blogs & Technical Insights" description="Latest technical whitepapers, safety compliance guides, and EV industry insights from EcoMargin." />
      
      <PageHeader 
        title="Blogs & Technical Insights" 
        description="Stay up to date with EV charging engineering, safety compliance standards, and OEM manufacturing technology."
      />

      <div className="container" style={{ padding: '6rem 0' }}>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem 0', color: 'var(--color-primary)' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '3px solid var(--color-border)', borderTopColor: 'var(--color-primary)', animation: 'spin 1s linear infinite' }}></div>
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
          </div>
        ) : blogs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--color-text-muted)' }}>
            <p style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>No published blog articles found.</p>
          </div>
        ) : (
          /* Post Grid */
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {blogs.map((blog, i) => {
              const img = blog.coverImage || blog.cover_image;
              const dateStr = blog.createdAt || blog.created_at;
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
                      <span style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>{dateStr ? new Date(dateStr).toLocaleDateString() : 'Technical Guide'}</span>
                    </div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', lineHeight: '1.4' }}>{blog.title}</h3>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', flex: 1 }}>{blog.summary || (blog.content ? blog.content.substring(0, 120) + '...' : '')}</p>
                    <div style={{ marginTop: 'auto' }}>
                      <button style={{ background: 'none', border: 'none', padding: 0, color: 'var(--color-primary)', fontWeight: '600', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        Read More <span>&rarr;</span>
                      </button>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </motion.div>
        )}
      </div>
    </>
  )
}
