import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEO from '@seo/SEO'
import Button from '@components/ui/Button/Button'
import { PATHS } from '@routes/paths'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSent, setIsSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setIsSent(true)
    }, 1000)
  }

  return (
    <>
      <SEO title="Reset Password" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ 
          width: '100%', maxWidth: '400px', background: 'var(--color-bg-card)', 
          padding: '2.5rem', borderRadius: 'var(--radius-xl)', 
          border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-lg)'
        }}
      >
        {!isSent ? (
          <>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Reset Password</h1>
              <p style={{ color: 'var(--color-text-muted)' }}>Enter your email and we'll send you a link to reset your password.</p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Email address</label>
                <input 
                  type="email" required
                  value={email} onChange={e => setEmail(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)', outline: 'none' }}
                />
              </div>

              <Button type="submit" variant="primary" fullWidth disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Send reset link'}
              </Button>
            </form>
          </>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '64px', height: '64px', background: 'var(--color-primary-light)', color: 'var(--color-primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            </div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Check your email</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>We've sent a password reset link to <br/><strong>{email}</strong></p>
          </div>
        )}

        <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.875rem' }}>
          <Link to={PATHS.LOGIN} style={{ color: 'var(--color-text-muted)' }}>&larr; Back to login</Link>
        </div>
      </motion.div>
    </>
  )
}
