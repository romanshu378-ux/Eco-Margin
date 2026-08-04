// EcoMargin Frontend — Dynamic Technical Downloads & Certificates Page
// src/pages/Downloads/DownloadsPage.jsx

import React, { useState, useEffect, useMemo } from 'react'
import SEO from '@seo/SEO'
import PageHeader from '@components/common/PageHeader/PageHeader'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@animations/variants'
import { FiDownload, FiFileText, FiAlertCircle, FiFolder, FiCheckCircle } from 'react-icons/fi'
import publicApi from '../../services/publicApi'
import { trackDownloadClick } from '../../utils/analytics'

export default function DownloadsPage() {
  const [downloads, setDownloads] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchDownloads = async () => {
    setLoading(true)
    setError(null)
    try {
      // Pass cache-busting timestamp parameter to prevent stale browser caching
      const res = await publicApi.getDownloads()
      let rawData = []
      if (res && res.data && Array.isArray(res.data)) {
        rawData = res.data
      } else if (Array.isArray(res)) {
        rawData = res
      }

      // Filter ONLY Active status records
      const activeRecords = rawData.filter(d => (d.status === 'Active' || !d.status))
      setDownloads(activeRecords)
    } catch (err) {
      console.error('❌ Error fetching public downloads:', err)
      setError(err.message || 'Failed to load downloads from database.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDownloads()
  }, [])

  // Group active download records by category
  const groupedDownloads = useMemo(() => {
    if (!downloads || downloads.length === 0) return []

    const groups = {}
    downloads.forEach(item => {
      const cat = item.category || 'General Downloads'
      if (!groups[cat]) {
        groups[cat] = []
      }
      groups[cat].push(item)
    })

    return Object.keys(groups).map(catName => ({
      category: catName,
      files: groups[catName]
    }))
  }, [downloads])

  return (
    <>
      <SEO 
        title="Technical Datasheets & ARAI Certificates" 
        description="Download technical specification sheets, ARAI/CE test certificates, and EPC installation manuals for EcoMargin EV Chargers." 
      />

      <PageHeader 
        title="Technical Downloads & Certificates" 
        description="Access Certified Test Reports, CAD Drawings, Installation Manuals, and Official Product Datasheets."
      />

      <div className="container" style={{ padding: '5rem 0' }}>
        
        {/* Loading Indicator */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--color-primary)' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', border: '3px solid var(--color-border)', borderTopColor: 'var(--color-primary)', animation: 'spin 1s linear infinite', margin: '0 auto 1rem auto' }}></div>
            <span style={{ fontSize: '1rem', fontWeight: 500 }}>Fetching live datasheets and certificates from database...</span>
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid #ef4444', padding: '1rem 1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <FiAlertCircle style={{ fontSize: '1.25rem' }} /> Notice: {error}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && downloads.length === 0 && (
          <div style={{ textAlignment: 'center', textAlign: 'center', padding: '4rem 1rem', background: 'var(--color-bg-card)', border: '1px border var(--color-border)', borderRadius: 'var(--radius-xl)' }}>
            <FiFolder style={{ fontSize: '3rem', color: 'var(--color-text-muted)', marginBottom: '1rem', opacity: 0.5 }} />
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>No Technical Downloads Available</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
              Check back soon for updated ARAI certificates and charger datasheets.
            </p>
          </div>
        )}

        {/* Dynamic Category Sections */}
        {!loading && groupedDownloads.map((section, idx) => (
          <div key={idx} style={{ marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontFamily: 'Outfit, sans-serif', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FiCheckCircle style={{ fontSize: '1.25rem' }} /> {section.category}
            </h2>

            <motion.div 
              variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}
            >
              {section.files.map((file) => {
                const docName = file.name || file.title || 'Technical Document'
                const pdfUrl = file.fileUrl || file.file_url || file.pdfUrl || '#'
                const iconUrl = file.iconUrl || file.icon_url
                const sizeStr = file.fileSize || file.file_size || 'PDF'

                return (
                  <motion.div
                    key={file.id}
                    variants={fadeUp}
                    style={{
                      background: 'var(--color-bg-card)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-lg)',
                      padding: '1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      boxShadow: 'var(--shadow-sm)',
                      gap: '1rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, overflow: 'hidden' }}>
                      {/* Logo / Icon image or fallback SVG */}
                      {iconUrl ? (
                        <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', background: '#ffffff', padding: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <img src={iconUrl} alt="Logo" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                        </div>
                      ) : (
                        <div style={{ fontSize: '1.75rem', color: 'var(--color-primary)', background: 'rgba(16, 185, 129, 0.1)', padding: '0.75rem', borderRadius: 'var(--radius-md)', flexShrink: 0 }}>
                          <FiFileText />
                        </div>
                      )}

                      <div style={{ flex: 1, overflow: 'hidden' }}>
                        <div style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.25rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={docName}>
                          {docName}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                          {file.category} • {sizeStr}
                        </div>
                        {file.description && (
                          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.2rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {file.description}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Download Button */}
                    <a 
                      href={pdfUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={() => trackDownloadClick(docName)}
                      aria-label={`Download ${docName}`}
                      style={{
                        background: 'var(--color-primary)',
                        color: '#0f0f1a',
                        padding: '0.55rem 1.1rem',
                        borderRadius: 'var(--radius-md)',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        textDecoration: 'none',
                        flexShrink: 0
                      }}
                    >
                      <FiDownload /> Download
                    </a>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        ))}

      </div>
    </>
  )
}
