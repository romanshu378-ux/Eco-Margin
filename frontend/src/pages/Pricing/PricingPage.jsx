import React from 'react'
import SEO from '@seo/SEO'
import Button from '@components/ui/Button/Button'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@animations/variants'

export default function PricingPage() {
  const plans = [
    {
      name: 'Pay As You Go',
      price: '₹0',
      period: '/month',
      desc: 'Perfect for occasional chargers.',
      features: ['Standard charging rates', 'Basic support', 'Map access'],
      button: 'Sign Up Free',
      variant: 'outline'
    },
    {
      name: 'Eco Pro',
      price: '₹499',
      period: '/month',
      desc: 'For regular commuters.',
      features: ['10% discount on charging', 'Priority booking (24h in advance)', '24/7 Priority support', 'Detailed analytics'],
      button: 'Get Pro',
      variant: 'primary',
      popular: true
    },
    {
      name: 'Fleet Operator',
      price: 'Custom',
      period: '',
      desc: 'For businesses with multiple EVs.',
      features: ['Dedicated account manager', 'API access', 'Custom billing', 'Fleet dashboard'],
      button: 'Contact Sales',
      variant: 'outline'
    }
  ]

  return (
    <div className="container" style={{ padding: '4rem 0 8rem' }}>
      <SEO title="Pricing" />
      
      <div style={{ textAlign: 'center', marginBottom: '4rem', maxWidth: '600px', margin: '0 auto 4rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Transparent Pricing</h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.125rem' }}>
          Choose the plan that fits your charging habits. No hidden fees.
        </p>
      </div>

      <motion.div 
        variants={staggerContainer} initial="hidden" animate="visible"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'center' }}
      >
        {plans.map((plan, i) => (
          <motion.div 
            key={plan.name} variants={fadeUp}
            style={{ 
              background: 'var(--color-bg-card)', 
              padding: '2.5rem', 
              borderRadius: 'var(--radius-xl)', 
              border: plan.popular ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
              position: 'relative',
              boxShadow: plan.popular ? 'var(--shadow-glow)' : 'var(--shadow-md)',
              transform: plan.popular ? 'scale(1.05)' : 'scale(1)',
              zIndex: plan.popular ? 2 : 1
            }}
          >
            {plan.popular && (
              <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'var(--color-primary)', color: '#0f0f1a', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase' }}>
                Most Popular
              </div>
            )}
            
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{plan.name}</h3>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>{plan.desc}</p>
            
            <div style={{ marginBottom: '2rem' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: '800', fontFamily: 'Outfit' }}>{plan.price}</span>
              <span style={{ color: 'var(--color-text-muted)' }}>{plan.period}</span>
            </div>

            <ul style={{ listStyle: 'none', marginBottom: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {plan.features.map(feat => (
                <li key={feat} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <span style={{ color: 'var(--color-primary)' }}>✓</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            <Button variant={plan.variant} fullWidth>{plan.button}</Button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
