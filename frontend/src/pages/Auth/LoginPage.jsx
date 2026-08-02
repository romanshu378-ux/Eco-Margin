import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEO from '@seo/SEO'
import Button from '@components/ui/Button/Button'
import { PATHS } from '@routes/paths'
import { authService } from '@services/authService'
import { useAuthStore } from '@store/authStore'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login: setAuthStoreLogin } = useAuthStore()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMsg('')
    
    try {
      const res = await authService.login(formData)
      if (res.token && res.user) {
        setAuthStoreLogin(res.user, res.token)
        navigate(PATHS.DASHBOARD)
      } else {
        setErrorMsg(res.message || 'Login failed. Please check credentials.')
      }
    } catch (err) {
      setErrorMsg(err.message || 'Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <SEO title="Log In" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ 
          width: '100%', 
          maxWidth: '400px', 
          background: 'var(--color-bg-card)', 
          padding: '2.5rem', 
          borderRadius: 'var(--radius-xl)', 
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Welcome back</h1>
          <p style={{ color: 'var(--color-text-muted)' }}>Enter your details to access your account.</p>
        </div>

        {errorMsg && (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-error)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Email</label>
            <input 
              type="email" 
              required
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              style={{
                width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)',
                background: 'var(--color-bg)', border: '1px solid var(--color-border)',
                color: 'var(--color-text)', outline: 'none'
              }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: '500' }}>Password</label>
              <Link to={PATHS.FORGOT_PASSWORD} style={{ fontSize: '0.875rem', color: 'var(--color-primary)' }}>Forgot password?</Link>
            </div>
            <input 
              type="password" 
              required
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
              style={{
                width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)',
                background: 'var(--color-bg)', border: '1px solid var(--color-border)',
                color: 'var(--color-text)', outline: 'none'
              }}
            />
          </div>

          <Button type="submit" variant="primary" fullWidth disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>

        <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
          Don't have an account? <Link to={PATHS.REGISTER} style={{ color: 'var(--color-primary)', fontWeight: '600' }}>Sign up</Link>
        </div>
      </motion.div>
    </>
  )
}
