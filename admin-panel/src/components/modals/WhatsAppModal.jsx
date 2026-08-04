// EcoMargin Admin Panel — WhatsApp Integration Modal
// src/components/modals/WhatsAppModal.jsx

import React, { useState } from 'react'
import { FiX, FiMessageCircle, FiSend, FiCheck, FiExternalLink } from 'react-icons/fi'

export default function WhatsAppModal({ lead, onClose }) {
  const cleanPhone = (lead?.phone || '').replace(/[^0-9]/g, '')
  const formattedPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone

  const [message, setMessage] = useState(
    `Hello ${lead?.fullName || lead?.name || 'Client'}, thank you for contacting EcoMargin Infrastructure. We have received your inquiry for ${lead?.product_requirement || lead?.subject || 'EV Chargers'}. Our team is reviewing your requirement!`
  )

  const templates = {
    'Thank You': `Hello ${lead?.fullName || lead?.name || 'Client'}, thank you for contacting EcoMargin. We have received your inquiry regarding ${lead?.product_requirement || lead?.subject || 'EV Chargers'}. How can we assist your installation?`,
    'Quotation Sent': `Dear ${lead?.fullName || lead?.name || 'Client'}, we have generated your official commercial quotation for ${lead?.product_requirement || lead?.subject || 'EV Charging Station'}. Please check your email or let us know if you have any questions!`,
    'Meeting Scheduled': `Hello ${lead?.fullName || lead?.name || 'Client'}, confirming our technical site assessment discussion regarding your EV charger installation project. Looking forward to speaking with you!`,
    'Order Confirmed': `Dear ${lead?.fullName || lead?.name || 'Client'}, your EV charger manufacturing order has been confirmed and queued for assembly at our facility. Thank you for choosing EcoMargin!`
  }

  const handleSelectTemplate = (tmplKey) => {
    if (templates[tmplKey]) {
      setMessage(templates[tmplKey])
    }
  }

  const handleOpenWhatsApp = () => {
    if (!formattedPhone) {
      alert('Valid phone number is required.')
      return
    }
    const encodedText = encodeURIComponent(message)
    const url = `https://wa.me/${formattedPhone}?text=${encodedText}`
    window.open(url, '_blank')
    onClose()
  }

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div className="card" style={{ width: '100%', maxWidth: '600px', padding: '2rem', maxHeight: '85vh', overflowY: 'auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.25rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#25D366' }}>
            <FiMessageCircle /> WhatsApp Quick Connect — #{lead?.id}
          </h3>
          <button onClick={onClose} className="btn btn-outline" style={{ border: 'none', padding: '0.4rem' }}>
            <FiX size={20} />
          </button>
        </div>

        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--text-muted)' }}>Target WhatsApp Number</label>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#25D366' }}>
            +{formattedPhone} ({lead?.fullName || lead?.name})
          </div>
        </div>

        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Select Predefined Template</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {Object.keys(templates).map(tName => (
              <button 
                key={tName}
                type="button"
                onClick={() => handleSelectTemplate(tName)}
                className="btn btn-outline"
                style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
              >
                {tName}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>WhatsApp Message Text</label>
          <textarea 
            rows="5" 
            className="input" 
            value={message} 
            onChange={e => setMessage(e.target.value)} 
            style={{ fontSize: '0.9rem', lineHeight: 1.5 }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <button onClick={onClose} className="btn btn-outline">Cancel</button>
          <button 
            onClick={handleOpenWhatsApp} 
            className="btn" 
            style={{ background: '#25D366', color: '#ffffff', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', border: 'none' }}
          >
            <FiExternalLink /> Launch WhatsApp Chat
          </button>
        </div>

      </div>
    </div>
  )
}
