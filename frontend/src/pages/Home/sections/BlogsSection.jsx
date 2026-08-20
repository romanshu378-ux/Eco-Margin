import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@animations/variants'
import Button from '@components/ui/Button/Button'
import { Link } from 'react-router-dom'
import publicApi from '@services/publicApi'
import { DEFAULT_BLOGS } from '../../Blogs/defaultBlogs'

export default function BlogsSection() {
  const [blogs, setBlogs] = useState(DEFAULT_BLOGS.slice(0, 3))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLiveBlogs = async () => {
      try {
        const res = await publicApi.getBlogs()
        if (res && res.data && Array.isArray(res.data) && res.data.length > 0) {
          setBlogs(res.data.slice(0, 3))
        } else {
          setBlogs(DEFAULT_BLOGS.slice(0, 3))
        }
      } catch (err) {
        console.warn('Live blogs fetch notice:', err.message)
        setBlogs(DEFAULT_BLOGS.slice(0, 3))
      } finally {
        setLoading(false)
      }
    }
    fetchLiveBlogs()
  }, [])

  if (!loading && blogs.length === 0) {
    return null
  }

  return (
    <section style={{ padding: '8rem 0', background: 'var(--color-bg-alt)' }}>
      <div className="container">
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '2rem', marginBottom: '4rem' }}>
          <div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#0F172A' }}>
              Latest Insights & Whitepapers
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} style={{ color: 'var(--color-text-muted)', fontSize: '1.125rem' }}>
              News, safety standards, and engineering updates from the EcoMargin team.
            </motion.p>
          </div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <Link to="/blogs">
              <Button variant="outline">View All Articles</Button>
            </Link>
          </motion.div>
        </div>

        <motion.div 
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}
        >
          {blogs.map((blog, i) => {
            const defaultFallbackImg = DEFAULT_BLOGS[i % DEFAULT_BLOGS.length]?.coverImage || DEFAULT_BLOGS[0].coverImage
            const rawImg = blog.coverImage || blog.cover_image
            const img = (rawImg && rawImg.trim() !== '') ? rawImg : defaultFallbackImg
            const targetSlug = blog.slug || blog.id || DEFAULT_BLOGS[i % DEFAULT_BLOGS.length].slug

            return (
              <motion.article 
                key={blog.id || blog.slug || i} 
                variants={fadeUp}
                whileHover={{ y: -5 }}
                style={{ background: 'var(--color-bg)', borderRadius: 'var(--radius-xl)', overflow: 'hidden', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', transition: 'transform var(--transition-fast)' }}
              >
                <div style={{ height: '200px', background: 'var(--color-bg-card)', borderBottom: '1px solid var(--color-border)', overflow: 'hidden' }}>
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
                    <span style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>{blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : 'Technical Guide'}</span>
                  </div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', lineHeight: '1.4', color: '#0F172A' }}>
                    <Link to={`/blogs/${targetSlug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      {blog.title}
                    </Link>
                  </h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', flex: 1 }}>{blog.summary || (blog.content ? blog.content.substring(0, 100) + '...' : '')}</p>
                  <Link 
                    to={`/blogs/${targetSlug}`} 
                    style={{ 
                      color: 'var(--color-primary)', 
                      fontWeight: '600', 
                      fontSize: '0.875rem', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.5rem', 
                      textDecoration: 'none' 
                    }}
                  >
                    Read Article <span>&rarr;</span>
                  </Link>
                </div>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
