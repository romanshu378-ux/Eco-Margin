// EcoMargin Admin Panel — Email History Log Modal
// src/components/modals/EmailHistoryModal.jsx

import React, { useState, useEffect } from 'react'
import { FiX, FiMail, FiCheckCircle, FiAlertCircle, FiClock, FiRefreshCw } from 'react-icons/fi'
import adminService from '../../services/adminService'

export default function EmailHistoryModal({ lead, onClose }) {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchHistory = async () => {
    if (!lead?.id) return
    setLoading(true)
    setError(null)
    try {
      const res = await adminService.getEmailHistory(lead.id)
      if (res && res.data) {
        setLogs(res.data)
      } else if (Array.isArray(res)) {
        setLogs(res)
      } else {
        setLogs([])
      }
    } catch (err) {
      console.error('❌ Error fetching email history:', err)
      setError(err.message || 'Failed to load email log history.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHistory()
  }, [lead])

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Sent':
        return { bg: 'rgba(16, 185, 129, 0.15)', color: '#10b981', icon: <FiCheckCircle /> }
      case 'Failed':
        return { bg: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', icon: <FiAlertCircle /> }
      default:
        return { bg: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', icon: <FiClock /> }
    }
  }

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div className="card" style={{ width: '100%', maxWidth: '750px', padding: '2rem', maxHeight: '85vh', overflowY: 'auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FiMail style={{ color: 'var(--primary)' }} /> Email History Logs — Lead #{lead.id}
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0.25rem 0 0 0' }}>
              Client: {lead.fullName || lead.full_name || lead.name} ({lead.email})
            </p>
          </div>
          <button onClick={onClose} className="btn btn-outline" style={{ border: 'none', padding: '0.4rem' }}>
            <FiX size={20} />
          </button>
        </div>

        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem', fontSize: '0.875rem' }}>
            {error}
          </div>
        )}

        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            <FiRefreshCw className="spin" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }} /><br />
            Fetching email delivery logs from database...
          </div>
        ) : logs.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            <FiMail style={{ fontSize: '2.5rem', marginBottom: '0.5rem', opacity: 0.4 }} /><br />
            No email logs recorded yet for this lead inquiry.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {logs.map((log) => {
              const badge = getStatusBadge(log.status)
              const dateStr = log.sent_at || log.sentAt ? new Date(log.sent_at || log.sentAt).toLocaleString() : 'N/A'

              return (
                <div key={log.id} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: '4px', background: badge.bg, color: badge.color, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                      {badge.icon} {log.status} ({log.email_type || log.emailType || 'Email'})
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{dateStr}</span>
                  </div>

                  <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.25rem' }}>{log.subject}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                    <strong>To:</strong> {log.recipient} | <strong>Sender:</strong> {log.sent_by || 'System'}
                  </div>

                  {log.error_message && (
                    <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '0.5rem', borderRadius: '4px', fontSize: '0.75rem', marginTop: '0.5rem' }}>
                      <strong>SMTP Error:</strong> {log.error_message}
                    </div>
                  )}

                  {log.body && (
                    <details style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      <summary style={{ cursor: 'pointer', color: 'var(--primary)', fontWeight: 600 }}>View Email HTML Body</summary>
                      <div 
                        style={{ marginTop: '0.5rem', padding: '1rem', background: '#0f172a', borderRadius: '6px', maxHeight: '200px', overflowY: 'auto' }}
                        dangerouslySetInnerHTML={{ __html: log.body }}
                      />
                    </details>
                  )}
                </div>
              )
            })}
          </div>
        )}

        <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
          <button onClick={onClose} className="btn btn-outline">Close</button>
        </div>

      </div>
    </div>
  )
}
