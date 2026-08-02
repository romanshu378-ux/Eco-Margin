import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEO from '@seo/SEO'
import Button from '@components/ui/Button/Button'
import { PATHS } from '@routes/paths'

export default function RegisterPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      navigate(PATHS.LOGIN)
    }, 1000)
  }

  return (
    <>
      <SEO title="Register" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ 
          width: '100%', maxWidth: '450px', background: 'var(--color-bg-card)', 
          padding: '2.5rem', borderRadius: 'var(--radius-xl)', 
          border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-lg)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Create an account</h1>
          <p style={{ color: 'var(--color-text-muted)' }}>Join EcoMargin to access premium charging stations.</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Full Name</label>
            <input 
              type="text" required
              value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
              style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)', outline: 'none' }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Email</label>
            <input 
              type="email" required
              value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
              style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Phone Number (Optional)</label>
            <input 
              type="tel"
              value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })}
              style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Password</label>
            <input 
              type="password" required minLength={8}
              value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })}
              style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)', outline: 'none' }}
            />
          </div>

          <Button type="submit" variant="primary" fullWidth disabled={isLoading}>
            {isLoading ? 'Creating account...' : 'Create account'}
          </Button>
        </form>

        <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
          Already have an account? <Link to={PATHS.LOGIN} style={{ color: 'var(--color-primary)', fontWeight: '600' }}>Log in</Link>
        </div>
      </motion.div>
    </>
  )
}
