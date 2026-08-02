import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEO from '@seo/SEO'
import Button from '@components/ui/Button/Button'
import { PATHS } from '@routes/paths'
import PageHeader from '@components/common/PageHeader/PageHeader'

export default function NotFoundPage() {
  return (
    <>
      <SEO title="404 Not Found" />
      
      <PageHeader title="Page Not Found" description="Error 404" bgGradient="var(--color-error)" />

      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center',
        textAlign: 'center',
        padding: '6rem 2rem'
      }}>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{ position: 'relative', marginBottom: '2rem' }}
        >
          <div style={{ fontSize: '8rem', fontFamily: 'Outfit', fontWeight: '800', color: 'var(--color-bg-card)' }}>
            404
          </div>
          <div style={{ 
            position: 'absolute', 
            top: '50%', left: '50%', 
            transform: 'translate(-50%, -50%)',
            fontSize: '4rem',
            color: 'var(--color-error)'
          }}>
            ⚡
          </div>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ fontSize: '2rem', marginBottom: '1rem' }}
        >
          Out of Juice
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ color: 'var(--color-text-muted)', fontSize: '1.125rem', maxWidth: '400px', marginBottom: '2rem' }}
        >
          The page you are looking for has been unplugged or moved to a different station.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Link to={PATHS.HOME}>
            <Button variant="primary">Return Home</Button>
          </Link>
        </motion.div>
      </div>
    </>
  )
}
