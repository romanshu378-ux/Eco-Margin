import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fadeUp } from '@animations/variants'
import { PATHS } from '@routes/paths'

export default function PageHeader({ title, description, bgGradient = 'var(--color-primary-light)' }) {
  const location = useLocation()
  
  // Generate breadcrumbs from path
  const pathnames = location.pathname.split('/').filter(x => x)

  return (
    <section style={{ 
      padding: '8rem 0 4rem', 
      position: 'relative', 
      background: 'var(--color-bg-alt)',
      borderBottom: '1px solid var(--color-border)',
      overflow: 'hidden'
    }}>
      {/* Decorative Background Element */}
      <div style={{ 
        position: 'absolute', top: 0, right: 0, 
        width: '500px', height: '500px', 
        background: `radial-gradient(circle, ${bgGradient} 0%, transparent 70%)`, 
        filter: 'blur(60px)', zIndex: 0, opacity: 0.5 
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem' }}>{title}</h1>
          
          {description && (
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
              {description}
            </p>
          )}

          {/* Breadcrumbs */}
          <nav aria-label="breadcrumb">
            <ol style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '0.5rem', 
              listStyle: 'none',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}>
              <li>
                <Link to={PATHS.HOME} style={{ color: 'var(--color-text-muted)' }}>Home</Link>
              </li>
              {pathnames.length > 0 && <span style={{ color: 'var(--color-text-muted)' }}>/</span>}
              {pathnames.map((value, index) => {
                const to = `/${pathnames.slice(0, index + 1).join('/')}`
                const isLast = index === pathnames.length - 1
                
                // Capitalize and format text (e.g. privacy-policy -> Privacy Policy)
                const formattedValue = value.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())

                return (
                  <React.Fragment key={to}>
                    <li>
                      {isLast ? (
                        <span style={{ color: 'var(--color-primary)' }} aria-current="page">
                          {formattedValue}
                        </span>
                      ) : (
                        <Link to={to} style={{ color: 'var(--color-text-muted)' }}>
                          {formattedValue}
                        </Link>
                      )}
                    </li>
                    {!isLast && <span style={{ color: 'var(--color-text-muted)' }}>/</span>}
                  </React.Fragment>
                )
              })}
            </ol>
          </nav>
          
        </motion.div>
      </div>
    </section>
  )
}
