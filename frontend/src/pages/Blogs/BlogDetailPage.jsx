// EcoMargin Frontend — Blog Article Detail Page
// src/pages/Blogs/BlogDetailPage.jsx

import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import SEO from '@seo/SEO'
import { motion } from 'framer-motion'
import { fadeUp } from '@animations/variants'
import { FiArrowLeft, FiClock, FiUser, FiCalendar, FiShare2, FiCheckCircle } from 'react-icons/fi'
import publicApi from '@services/publicApi'
import { DEFAULT_BLOGS } from './defaultBlogs'
import Button from '@components/ui/Button/Button'
import QuoteModal from '@components/common/QuoteModal/QuoteModal'

export default function BlogDetailPage() {
  const { slug } = useParams()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quoteModalOpen, setQuoteModalOpen] = useState(false)
  const [imageSrc, setImageSrc] = useState(null)

  useEffect(() => {
    let isMounted = true
    const fetchBlog = async () => {
      setLoading(true)
      try {
        // 1. Try to fetch from API by slug or ID
        const res = await publicApi.getBlogBySlug(slug)
        let blogData = res?.data || res

        if (!blogData || !blogData.title) {
          // 2. Fallback to local default blogs list
          blogData = DEFAULT_BLOGS.find(
            b => b.slug === slug || String(b.id) === String(slug)
          )
        }

        if (isMounted && blogData) {
          setBlog(blogData)
          setImageSrc(blogData.coverImage || blogData.cover_image || DEFAULT_BLOGS[0].coverImage)
        }
      } catch (err) {
        console.warn('[Blog Detail Notice]:', err.message)
        if (isMounted) {
          const fallback = DEFAULT_BLOGS.find(
            b => b.slug === slug || String(b.id) === String(slug)
          ) || DEFAULT_BLOGS[0]
          setBlog(fallback)
          setImageSrc(fallback.coverImage)
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchBlog()
    window.scrollTo(0, 0)
    return () => { isMounted = false }
  }, [slug])

  const fallbackImage = DEFAULT_BLOGS[0].coverImage

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', color: 'var(--color-primary)' }}>
        <div style={{ width: '44px', height: '44px', borderRadius: '50%', border: '3px solid var(--color-border)', borderTopColor: 'var(--color-primary)', animation: 'spin 1s linear infinite' }}></div>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="container" style={{ padding: '8rem 0 5rem 0', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--color-text)' }}>Article Not Found</h2>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>The blog whitepaper you are looking for does not exist or has been moved.</p>
        <Link to="/blogs">
          <Button variant="primary">Back to All Articles</Button>
        </Link>
      </div>
    )
  }

  const formattedDate = blog.createdAt || blog.created_at
    ? new Date(blog.createdAt || blog.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : 'February 2026'

  // Other related articles (excluding current article)
  const relatedArticles = DEFAULT_BLOGS.filter(b => b.slug !== blog.slug).slice(0, 2)

  return (
    <>
      <SEO 
        title={`${blog.title} | EcoMargin LLP`} 
        description={blog.summary || (blog.content ? blog.content.substring(0, 155) : 'EcoMargin EV Charging Insights')} 
        pageRoute={`/blogs/${blog.slug}`}
        image={imageSrc}
        article={{
          title: blog.title,
          description: blog.summary || blog.title,
          image: imageSrc || DEFAULT_BLOGS[0].coverImage,
          author: blog.author || 'EcoMargin Engineering Team',
          datePublished: blog.createdAt || blog.created_at || '2026-02-15T00:00:00.000Z'
        }}
      />

      <div style={{ background: 'var(--color-bg)', minHeight: '100vh', paddingTop: '100px', paddingBottom: '6rem' }}>
        <div className="container">
          
          {/* Breadcrumb Navigation */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }}
            style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}
          >
            <Link to="/blogs" style={{ color: 'var(--color-primary)', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', textDecoration: 'none' }}>
              <FiArrowLeft /> Back to Blogs
            </Link>
            <span>/</span>
            <span style={{ color: 'var(--color-text)', fontWeight: '500', maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {blog.title}
            </span>
          </motion.div>

          {/* Main Article Container */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem' }}>
            
            <motion.article 
              variants={fadeUp} initial="hidden" animate="visible"
              style={{
                background: 'var(--color-bg-card)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--color-border)',
                padding: '2.5rem',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              {/* Category & Meta Information */}
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1.25rem', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
                <span style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)', fontWeight: 700, padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-md)' }}>
                  Technical Whitepaper
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: 'var(--color-text-muted)' }}>
                  <FiUser style={{ color: 'var(--color-primary)' }} /> {blog.author || 'EcoMargin Engineering Team'}
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: 'var(--color-text-muted)' }}>
                  <FiCalendar style={{ color: 'var(--color-primary)' }} /> {formattedDate}
                </span>
              </div>

              {/* Title */}
              <h1 style={{ fontSize: '2.25rem', lineHeight: 1.3, fontWeight: 800, color: 'var(--color-text)', fontFamily: 'Outfit, sans-serif', marginBottom: '1.5rem' }}>
                {blog.title}
              </h1>

              {/* Featured Cover Image */}
              <div style={{ height: '380px', width: '100%', borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: '2.5rem', background: 'var(--color-bg-alt)', border: '1px solid var(--color-border)' }}>
                <img 
                  src={imageSrc || fallbackImage} 
                  alt={blog.title}
                  onError={() => setImageSrc(fallbackImage)}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Summary Highlight Box */}
              {blog.summary && (
                <div style={{ background: 'var(--color-primary-light)', borderLeft: '4px solid var(--color-primary)', padding: '1.25rem 1.5rem', borderRadius: '0 var(--radius-md) var(--radius-md) 0', marginBottom: '2.5rem', color: 'var(--color-text)', fontSize: '1.05rem', lineHeight: 1.6, fontWeight: 500 }}>
                  {blog.summary}
                </div>
              )}

              {/* Body Content */}
              <div style={{ color: 'var(--color-text)', fontSize: '1.05rem', lineHeight: 1.8 }}>
                {blog.content ? (
                  blog.content.split('\n\n').map((paragraph, index) => {
                    if (paragraph.startsWith('### ')) {
                      return <h3 key={index} style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--color-text)', marginTop: '2rem', marginBottom: '1rem', fontFamily: 'Outfit, sans-serif' }}>{paragraph.replace('### ', '')}</h3>
                    }
                    if (paragraph.startsWith('- ')) {
                      const items = paragraph.split('\n- ')
                      return (
                        <ul key={index} style={{ paddingLeft: '1.5rem', margin: '1rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          {items.map((item, i) => <li key={i}>{item.replace('- ', '')}</li>)}
                        </ul>
                      )
                    }
                    return <p key={index} style={{ marginBottom: '1.25rem' }}>{paragraph}</p>
                  })
                ) : (
                  <p>EcoMargin engineering team provides high-reliability EV charging infrastructure solutions built for extreme temperature environments and grid load stabilization across India.</p>
                )}
              </div>

              {/* RFQ CTA Box Inside Article */}
              <div style={{ marginTop: '3.5rem', padding: '2.5rem', background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', borderRadius: 'var(--radius-xl)', color: '#FFFFFF', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.5rem', fontFamily: 'Outfit' }}>
                    Need Custom EV Charging Hardware or EPC Services?
                  </h3>
                  <p style={{ color: '#94A3B8', fontSize: '0.95rem', margin: 0 }}>
                    Speak with EcoMargin EV infrastructure engineers for turnkey deployment and OEM white-label supply.
                  </p>
                </div>
                <Button variant="primary" size="md" onClick={() => setQuoteModalOpen(true)}>
                  Request Commercial RFQ
                </Button>
              </div>

            </motion.article>

          </div>

          {/* Related Whitepapers Section */}
          {relatedArticles.length > 0 && (
            <div style={{ marginTop: '5rem' }}>
              <h3 style={{ fontSize: '1.75rem', color: 'var(--color-text)', fontFamily: 'Outfit', marginBottom: '2rem' }}>
                Related Technical Insights
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                {relatedArticles.map((rel) => (
                  <div key={rel.id} style={{ background: 'var(--color-bg-card)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)', padding: '1.75rem', display: 'flex', flexDirection: 'column' }}>
                    <h4 style={{ fontSize: '1.15rem', color: 'var(--color-text)', marginBottom: '0.75rem', lineHeight: 1.4 }}>
                      {rel.title}
                    </h4>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: '1.25rem', flex: 1, lineHeight: 1.6 }}>
                      {rel.summary}
                    </p>
                    <Link to={`/blogs/${rel.slug}`} style={{ color: 'var(--color-primary)', fontWeight: '700', fontSize: '0.875rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                      Read Article &rarr;
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
    </>
  )
}
