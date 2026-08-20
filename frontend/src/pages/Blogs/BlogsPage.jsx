import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEO from '@seo/SEO'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@animations/variants'
import PageHeader from '@components/common/PageHeader/PageHeader'
import publicApi from '@services/publicApi'
import { DEFAULT_BLOGS } from './defaultBlogs'

export default function BlogsPage() {
  const [blogs, setBlogs] = useState(DEFAULT_BLOGS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLiveBlogs = async () => {
      try {
        const res = await publicApi.getBlogs()
        if (res && res.data && Array.isArray(res.data) && res.data.length > 0) {
          setBlogs(res.data)
        } else {
          setBlogs(DEFAULT_BLOGS)
        }
      } catch (err) {
        console.warn('Live blogs fetch notice:', err.message)
        setBlogs(DEFAULT_BLOGS)
      } finally {
        setLoading(false)
      }
    }
    fetchLiveBlogs()
  }, [])

  return (
    <>
      <SEO 
        title="EV Charging Blog & Technical Insights | EcoMargin LLP" 
        description="Read latest EV industry insights, technical whitepapers, Indian grid safety standards, thermal management, and OCPP software integration from EcoMargin LLP." 
        pageRoute="/blogs"
      />
      
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
              const defaultFallbackImg = DEFAULT_BLOGS[i % DEFAULT_BLOGS.length]?.coverImage || DEFAULT_BLOGS[0].coverImage
              const rawImg = blog.coverImage || blog.cover_image
              const img = (rawImg && rawImg.trim() !== '') ? rawImg : defaultFallbackImg
              const dateStr = blog.createdAt || blog.created_at
              const targetSlug = blog.slug || blog.id || DEFAULT_BLOGS[i % DEFAULT_BLOGS.length].slug

              return (
                <motion.article 
                  key={blog.id || blog.slug || i} 
                  variants={fadeUp}
                  whileHover={{ y: -5 }}
                  style={{ background: 'var(--color-bg-card)', borderRadius: 'var(--radius-xl)', overflow: 'hidden', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', transition: 'transform var(--transition-fast)' }}
                >
                  <div style={{ height: '220px', background: 'var(--color-bg-alt)', borderBottom: '1px solid var(--color-border)', overflow: 'hidden' }}>
                    <img 
                      src={img} 
                      alt={blog.title} 
                      loading="lazy" 
                      onError={(e) => {
                        e.currentTarget.onerror = null
                        e.currentTarget.src = defaultFallbackImg
                      }}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  </div>
                  <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', fontSize: '0.875rem' }}>
                      <span style={{ color: 'var(--color-primary)', fontWeight: '600' }}>{blog.author || 'EcoMargin Team'}</span>
                      <span style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>{dateStr ? new Date(dateStr).toLocaleDateString() : 'Technical Whitepaper'}</span>
                    </div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', lineHeight: '1.4', color: '#0F172A' }}>
                      <Link to={`/blogs/${targetSlug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        {blog.title}
                      </Link>
                    </h3>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', flex: 1 }}>{blog.summary || (blog.content ? blog.content.substring(0, 120) + '...' : '')}</p>
                    <div style={{ marginTop: 'auto' }}>
                      <Link 
                        to={`/blogs/${targetSlug}`} 
                        style={{ 
                          color: 'var(--color-primary)', 
                          fontWeight: '600', 
                          fontSize: '0.875rem', 
                          display: 'inline-flex', 
                          alignItems: 'center', 
                          gap: '0.5rem', 
                          textDecoration: 'none' 
                        }}
                      >
                        Read More <span>&rarr;</span>
                      </Link>
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
