// EcoMargin Admin Panel — PDF Commercial Quotation Modal
// src/components/modals/QuotationModal.jsx

import React, { useState, useEffect } from 'react'
import { FiX, FiFileText, FiSend, FiDownload, FiCheck, FiPrinter, FiDollarSign } from 'react-icons/fi'
import adminService from '../../services/adminService'

export default function QuotationModal({ lead, onClose, onQuotationCreated }) {
  const [formData, setFormData] = useState({
    customerName: lead?.fullName || lead?.name || '',
    customerEmail: lead?.email || '',
    customerCompany: lead?.company || '',
    productName: lead?.product_requirement || lead?.subject || '60kW DC Fast Charger (Dual Gun CCS2)',
    amount: 350000,
    gstAmount: 63000,
    installationCharges: 25000,
    totalAmount: 438000,
    validityDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    warrantyTerms: '2 Years Standard Comprehensive Manufacturer Warranty on Power Modules & Controller.',
    termsAndConditions: 'Payment: 50% Advance along with PO, 50% prior to dispatch. Delivery: 2-3 Weeks from PO date.'
  })

  const [saving, setSaving] = useState(false)
  const [quotation, setQuotation] = useState(null)
  const [error, setError] = useState(null)
  const [successMsg, setSuccessMsg] = useState(null)
  const [showPreview, setShowPreview] = useState(false)

  // Auto-calculate GST and Total
  const handleAmountChange = (amt, inst) => {
    const baseAmt = parseFloat(amt || 0)
    const instAmt = parseFloat(inst || 0)
    const gst = baseAmt * 0.18
    const total = baseAmt + gst + instAmt

    setFormData(prev => ({
      ...prev,
      amount: baseAmt,
      installationCharges: instAmt,
      gstAmount: gst,
      totalAmount: total
    }))
  }

  const handleGenerate = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    try {
      const res = await adminService.generateQuotation({
        leadId: lead?.id,
        ...formData
      })

      if (res && res.success) {
        setQuotation(res.data)
        setSuccessMsg(`Quotation #${res.data.quotation_no} generated successfully!`)
        if (onQuotationCreated) onQuotationCreated()
      } else {
        setError(res?.message || 'Failed to generate quotation')
      }
    } catch (err) {
      console.error('❌ Error generating quotation:', err)
      setError(err.message || 'Failed to create quotation record')
    } finally {
      setSaving(false)
    }
  }

  const handleEmailQuotation = async () => {
    if (!quotation?.id) return
    setSaving(true)
    setError(null)
    try {
      const res = await adminService.emailQuotation(quotation.id)
      if (res && res.success) {
        setSuccessMsg(`Quotation #${quotation.quotation_no} emailed to ${quotation.customer_email}!`)
      } else {
        setError(res?.message || 'Failed to email quotation')
      }
    } catch (err) {
      setError(err.message || 'Failed to send quotation email')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div className="card" style={{ width: '100%', maxWidth: '800px', padding: '2rem', maxHeight: '90vh', overflowY: 'auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.25rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiFileText style={{ color: 'var(--primary)' }} /> Commercial PDF Quotation Generator
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

        {/* Printable / Preview PDF Document View */}
        {showPreview && quotation && (
          <div style={{ background: '#ffffff', color: '#0f172a', padding: '2.5rem', borderRadius: '8px', marginBottom: '1.5rem', fontFamily: 'Segoe UI, sans-serif' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #10b981', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <h2 style={{ margin: 0, color: '#065f46', fontSize: '1.5rem', fontWeight: 800 }}>EcoMargin Infrastructure Pvt. Ltd.</h2>
                <p style={{ margin: '0.2rem 0', fontSize: '0.85rem', color: '#475569' }}>Shiv Colony, Tijara Phatak, Alwar, Rajasthan 301001</p>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#475569' }}>Email: info@ecomargin.in | Phone: +91-8302313065</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ background: '#10b981', color: '#ffffff', padding: '0.25rem 0.75rem', borderRadius: '4px', fontWeight: 700, fontSize: '0.8rem' }}>COMMERCIAL QUOTATION</span>
                <h3 style={{ margin: '0.5rem 0 0 0', color: '#0f172a' }}>#{quotation.quotation_no}</h3>
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>Date: {new Date(quotation.createdAt || quotation.created_at || Date.now()).toLocaleDateString('en-IN')}</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              <div>
                <strong style={{ color: '#065f46' }}>Billed To:</strong>
                <div style={{ fontWeight: 700, fontSize: '1.05rem', marginTop: '0.2rem' }}>{quotation.customer_name}</div>
                <div>{quotation.customer_company || 'Individual Account'}</div>
                <div>{quotation.customer_email}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <strong style={{ color: '#065f46' }}>Quotation Details:</strong>
                <div>Validity Until: <strong>{quotation.validity_date || '30 Days'}</strong></div>
                <div>Status: <span style={{ color: '#10b981', fontWeight: 700 }}>{quotation.status}</span></div>
              </div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ background: '#f1f5f9', color: '#334155' }}>
                  <th style={{ padding: '0.6rem 0.8rem', textAlign: 'left' }}>Item Description</th>
                  <th style={{ padding: '0.6rem 0.8rem', textAlign: 'right' }}>Amount (INR)</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem 0.8rem', fontWeight: 600 }}>{quotation.product_name}</td>
                  <td style={{ padding: '0.75rem 0.8rem', textAlign: 'right' }}>₹{parseFloat(quotation.amount).toLocaleString('en-IN')}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.6rem 0.8rem', color: '#64748b' }}>GST @ 18%</td>
                  <td style={{ padding: '0.6rem 0.8rem', textAlign: 'right' }}>₹{parseFloat(quotation.gst_amount).toLocaleString('en-IN')}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.6rem 0.8rem', color: '#64748b' }}>Installation & Turnkey EPC Charges</td>
                  <td style={{ padding: '0.6rem 0.8rem', textAlign: 'right' }}>₹{parseFloat(quotation.installation_charges).toLocaleString('en-IN')}</td>
                </tr>
                <tr style={{ background: '#f8fafc', fontWeight: 800, fontSize: '1.05rem' }}>
                  <td style={{ padding: '0.8rem', color: '#065f46' }}>Total Net Payable Amount</td>
                  <td style={{ padding: '0.8rem', textAlign: 'right', color: '#10b981' }}>₹{parseFloat(quotation.total_amount).toLocaleString('en-IN')}</td>
                </tr>
              </tbody>
            </table>

            <div style={{ fontSize: '0.8rem', color: '#475569', borderTop: '1px solid #e2e8f0', paddingTop: '1rem' }}>
              <p style={{ margin: '0.2rem 0' }}><strong>Warranty:</strong> {quotation.warranty_terms}</p>
              <p style={{ margin: '0.2rem 0' }}><strong>Terms:</strong> {quotation.terms_and_conditions}</p>
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Computer Generated Quotation — No physical signature required</div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'Dancing Script, cursive', fontSize: '1.2rem', color: '#065f46', borderBottom: '1px solid #0f172a', paddingBottom: '0.2rem' }}>Authorized Signatory</div>
                <div style={{ fontSize: '0.75rem', color: '#475569', marginTop: '0.2rem' }}>EcoMargin Commercial Div.</div>
              </div>
            </div>

            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button onClick={() => window.print()} className="btn btn-outline" style={{ color: '#0f172a', borderColor: '#cbd5e1' }}><FiPrinter /> Print PDF</button>
              <button onClick={() => setShowPreview(false)} className="btn btn-outline" style={{ color: '#0f172a', borderColor: '#cbd5e1' }}>Back to Edit</button>
            </div>
          </div>
        )}

        {/* Edit / Generator Form */}
        {!showPreview && (
          <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Customer Name *</label>
                <input type="text" required className="input" value={formData.customerName} onChange={e => setFormData({ ...formData, customerName: e.target.value })} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Customer Email *</label>
                <input type="email" required className="input" value={formData.customerEmail} onChange={e => setFormData({ ...formData, customerEmail: e.target.value })} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Company / Org</label>
                <input type="text" className="input" value={formData.customerCompany} onChange={e => setFormData({ ...formData, customerCompany: e.target.value })} placeholder="e.g. Nexus Logistics" />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>EV Charger Product / Model *</label>
              <input type="text" required className="input" value={formData.productName} onChange={e => setFormData({ ...formData, productName: e.target.value })} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '1rem', background: 'var(--bg-card)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Base Price (₹) *</label>
                <input type="number" required className="input" value={formData.amount} onChange={e => handleAmountChange(e.target.value, formData.installationCharges)} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>GST (18%) (₹)</label>
                <input type="number" readOnly className="input" value={formData.gstAmount} style={{ opacity: 0.8 }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Installation (₹)</label>
                <input type="number" className="input" value={formData.installationCharges} onChange={e => handleAmountChange(formData.amount, e.target.value)} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--primary)' }}>Total Net (₹)</label>
                <input type="number" readOnly className="input" value={formData.totalAmount} style={{ fontWeight: 800, color: 'var(--primary)' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Warranty Terms</label>
                <input type="text" className="input" value={formData.warrantyTerms} onChange={e => setFormData({ ...formData, warrantyTerms: e.target.value })} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Validity Until</label>
                <input type="date" className="input" value={formData.validityDate} onChange={e => setFormData({ ...formData, validityDate: e.target.value })} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Terms & Conditions</label>
              <textarea rows="2" className="input" value={formData.termsAndConditions} onChange={e => setFormData({ ...formData, termsAndConditions: e.target.value })} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
              {quotation ? (
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button type="button" onClick={() => setShowPreview(true)} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <FiFileText /> Preview PDF
                  </button>
                  <button type="button" onClick={handleEmailQuotation} disabled={saving} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <FiSend /> Email Quotation PDF
                  </button>
                </div>
              ) : (
                <div></div>
              )}

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button type="button" onClick={onClose} disabled={saving} className="btn btn-outline">Close</button>
                <button type="submit" disabled={saving} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {saving ? 'Generating...' : <><FiFileText /> Generate Official Quotation</>}
                </button>
              </div>
            </div>

          </form>
        )}

      </div>
    </div>
  )
}
