// EcoMargin Admin Panel — Send Custom Email Modal
// src/components/modals/SendEmailModal.jsx

import React, { useState, useEffect } from 'react'
import { FiX, FiSend, FiPaperclip, FiSave, FiMail, FiCheck } from 'react-icons/fi'
import adminService from '../../services/adminService'

export default function SendEmailModal({ lead, onClose, onEmailSent }) {
  const [formData, setFormData] = useState({
    from: 'support@ecomargin.in',
    to: lead?.email || '',
    cc: '',
    bcc: '',
    subject: `RE: EV Charger Requirement - EcoMargin LLP`,
    body: '',
    template: 'Custom'
  })
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(null)
  const [successMsg, setSuccessMsg] = useState(null)

  const emailTemplates = {
    'Thank You': {
      subject: `Thank You for Choosing EcoMargin LLP`,
      body: `Dear ${lead?.fullName || lead?.name || 'Client'},\n\nThank you for getting in touch with EcoMargin LLP. We have received your inquiry for ${lead?.product_requirement || lead?.subject || 'EV Charging Infrastructure'}.\n\nOur technical engineering representative will get in touch with you shortly to discuss site assessment and commercial specifications.\n\nWarm regards,\nSales Team\nEcoMargin LLP\nhttps://www.ecomargin.in`
    },
    'Quotation': {
      subject: `Commercial Offer & Quotation - EcoMargin LLP EV Chargers`,
      body: `Dear ${lead?.fullName || lead?.name || 'Client'},\n\nWe are pleased to enclose our commercial proposal for your EV charging project requirement.\n\nEcoMargin LLP manufactures high-uptime, ARAI certified AC & DC fast chargers engineered for high reliability in Indian operating conditions.\n\nPlease find the detailed specification and pricing overview attached.\n\nBest regards,\nCommercial Division\nEcoMargin LLP`
    },
    'Meeting Request': {
      subject: `Technical Site Survey & Discussion Schedule - EcoMargin LLP`,
      body: `Dear ${lead?.fullName || lead?.name || 'Client'},\n\nWe would like to request a 15-minute technical discovery call or physical site survey regarding your EV charging station installation.\n\nPlease let us know your preferred date and time for the discussion.\n\nSincerely,\nEngineering Operations\nEcoMargin LLP`
    },
    'Reminder': {
      subject: `Follow-up: EV Charging Project Inquiry #${lead?.id || ''}`,
      body: `Dear ${lead?.fullName || lead?.name || 'Client'},\n\nFollowing up on our recent commercial communication regarding your EV charger requirements.\n\nPlease let us know if you need any clarification on grid capacity, DISCOM transformer guidelines, or OCPP software integration.\n\nRegards,\nEcoMargin LLP Sales Team`
    },
    'Order Confirmation': {
      subject: `Order Confirmation & Dispatch Schedule - EcoMargin LLP`,
      body: `Dear ${lead?.fullName || lead?.name || 'Client'},\n\nWe are delighted to confirm receipt of your Purchase Order. Your EV charger units have been queued for factory assembly and testing.\n\nDispatch details and warranty certificates will be shared upon final factory inspection.\n\nThank you,\nOperations & Logistics\nEcoMargin LLP`
    }
  }

  const handleSelectTemplate = (templateKey) => {
    if (templateKey === 'Custom') return
    const tmpl = emailTemplates[templateKey]
    if (tmpl) {
      setFormData(prev => ({
        ...prev,
        template: templateKey,
        subject: tmpl.subject,
        body: tmpl.body
      }))
    }
  }

  const handleSend = async (e) => {
    e.preventDefault()
    if (!formData.to || !formData.subject || !formData.body) {
      setError('Recipient email, Subject, and Email body are required.')
      return
    }

    setSending(true)
    setError(null)
    try {
      // Convert plain text newlines to HTML paragraphs if sending raw text
      const htmlBody = formData.body.replace(/\n/g, '<br/>')
      
      const res = await adminService.sendCustomEmail({
        leadId: lead?.id,
        to: formData.to,
        cc: formData.cc,
        bcc: formData.bcc,
        subject: formData.subject,
        body: `<div style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #1e293b;">${htmlBody}</div>`,
        sentBy: 'Sales Admin'
      })

      if (res && res.success) {
        setSuccessMsg('Email sent successfully via Nodemailer SMTP!')
        if (onEmailSent) onEmailSent()
        setTimeout(() => {
          onClose()
        }, 1500)
      } else {
        setError(res?.message || 'Failed to deliver email')
      }
    } catch (err) {
      console.error('❌ Error sending email:', err)
      setError(err.message || 'Failed to send email via SMTP transporter.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div className="card" style={{ width: '100%', maxWidth: '700px', padding: '2rem', maxHeight: '90vh', overflowY: 'auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.25rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiMail style={{ color: 'var(--primary)' }} /> Send Email to {lead?.fullName || lead?.name || 'Customer'}
          </h3>
          <button onClick={onClose} className="btn btn-outline" style={{ border: 'none', padding: '0.4rem' }}>
            <FiX size={20} />
          </button>
        </div>

        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem', fontSize: '0.875rem' }}>
            {error}
          </div>
        )}
        {successMsg && (
          <div style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--primary)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiCheck /> {successMsg}
          </div>
        )}

        <form onSubmit={handleSend} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>From Sender</label>
              <input type="email" readOnly className="input" value={formData.from} style={{ opacity: 0.8, background: '#0f172a' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Recipient (To) *</label>
              <input type="email" required className="input" value={formData.to} onChange={e => setFormData({ ...formData, to: e.target.value })} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>CC Email</label>
              <input type="email" className="input" value={formData.cc} onChange={e => setFormData({ ...formData, cc: e.target.value })} placeholder="optional..." />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>BCC Email</label>
              <input type="email" className="input" value={formData.bcc} onChange={e => setFormData({ ...formData, bcc: e.target.value })} placeholder="optional..." />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--primary)' }}>Predefined Template</label>
              <select className="input" value={formData.template} onChange={e => handleSelectTemplate(e.target.value)}>
                <option value="Custom">Custom Content</option>
                <option value="Thank You">Thank You</option>
                <option value="Quotation">Quotation</option>
                <option value="Meeting Request">Meeting Request</option>
                <option value="Reminder">Reminder</option>
                <option value="Order Confirmation">Order Confirmation</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Subject *</label>
            <input type="text" required className="input" value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Email Content / Message *</label>
            <textarea rows="7" required className="input" value={formData.body} onChange={e => setFormData({ ...formData, body: e.target.value })} placeholder="Type rich email body here..." style={{ fontSize: '0.9rem', lineHeight: 1.5 }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
            <button type="button" onClick={() => alert('Draft saved locally')} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem' }}>
              <FiSave /> Save Draft
            </button>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button type="button" onClick={onClose} disabled={sending} className="btn btn-outline">Cancel</button>
              <button type="submit" disabled={sending} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {sending ? 'Delivering via SMTP...' : <><FiSend /> Send Email Now</>}
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  )
}
