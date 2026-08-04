// EcoMargin Admin Panel — Lead Timeline & Follow-up Notes Modal
// src/components/modals/LeadTimelineModal.jsx

import React, { useState, useEffect } from 'react'
import { FiX, FiClock, FiPlus, FiSave, FiAlertCircle, FiCheckCircle, FiCalendar, FiUser } from 'react-icons/fi'
import adminService from '../../services/adminService'

export default function LeadTimelineModal({ lead, onClose }) {
  const [activeTab, setActiveTab] = useState('timeline') // timeline or notes
  const [timeline, setTimeline] = useState([])
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Note form state
  const [noteForm, setNoteForm] = useState({
    title: '',
    note: '',
    priority: 'Medium',
    reminderDate: ''
  })
  const [savingNote, setSavingNote] = useState(false)

  const fetchData = async () => {
    if (!lead?.id) return
    setLoading(true)
    setError(null)
    try {
      const [tRes, nRes] = await Promise.all([
        adminService.getLeadTimeline(lead.id),
        adminService.getLeadNotes(lead.id)
      ])

      if (tRes && tRes.data) setTimeline(tRes.data)
      if (nRes && nRes.data) setNotes(nRes.data)
    } catch (err) {
      console.error('❌ Error fetching lead CRM history:', err)
      setError(err.message || 'Failed to load timeline history.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [lead])

  const handleAddNote = async (e) => {
    e.preventDefault()
    if (!noteForm.title.trim() || !noteForm.note.trim()) return

    setSavingNote(true)
    try {
      await adminService.addLeadNote({
        leadId: lead.id,
        ...noteForm
      })

      setNoteForm({ title: '', note: '', priority: 'Medium', reminderDate: '' })
      fetchData()
      setActiveTab('notes')
    } catch (err) {
      setError(err.message || 'Failed to save note')
    } finally {
      setSavingNote(false)
    }
  }

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'Urgent':
      case 'High':
        return { bg: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' }
      case 'Medium':
        return { bg: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' }
      default:
        return { bg: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' }
    }
  }

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div className="card" style={{ width: '100%', maxWidth: '750px', padding: '2rem', maxHeight: '88vh', overflowY: 'auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FiClock style={{ color: 'var(--primary)' }} /> Lead Activity Timeline & Follow-up Notes
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0.25rem 0 0 0' }}>
              #{lead?.id} — {lead?.fullName || lead?.name} ({lead?.company || 'Individual'})
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

        {/* Tab Selector */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
          <button 
            type="button" 
            onClick={() => setActiveTab('timeline')}
            style={{
              background: 'none',
              border: 'none',
              color: activeTab === 'timeline' ? 'var(--primary)' : 'var(--text-muted)',
              borderBottom: activeTab === 'timeline' ? '2px solid var(--primary)' : 'none',
              paddingBottom: '0.5rem',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer'
            }}
          >
            Activity History ({timeline.length})
          </button>
          <button 
            type="button" 
            onClick={() => setActiveTab('notes')}
            style={{
              background: 'none',
              border: 'none',
              color: activeTab === 'notes' ? 'var(--primary)' : 'var(--text-muted)',
              borderBottom: activeTab === 'notes' ? '2px solid var(--primary)' : 'none',
              paddingBottom: '0.5rem',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer'
            }}
          >
            Admin Notes ({notes.length})
          </button>
          <button 
            type="button" 
            onClick={() => setActiveTab('addNote')}
            style={{
              background: 'none',
              border: 'none',
              color: activeTab === 'addNote' ? 'var(--primary)' : 'var(--text-muted)',
              borderBottom: activeTab === 'addNote' ? '2px solid var(--primary)' : 'none',
              paddingBottom: '0.5rem',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}
          >
            <FiPlus /> Add New Note
          </button>
        </div>

        {/* Tab 1: Timeline View */}
        {activeTab === 'timeline' && (
          <div>
            {timeline.length === 0 ? (
              <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>No activities logged for this lead yet.</div>
            ) : (
              <div style={{ position: 'relative', paddingLeft: '1.5rem', borderLeft: '2px solid var(--border)' }}>
                {timeline.map((act) => (
                  <div key={act.id} style={{ marginBottom: '1.5rem', position: 'relative' }}>
                    <div style={{ position: 'absolute', left: '-1.95rem', top: '0.2rem', width: '12px', height: '12px', borderRadius: '50%', background: 'var(--primary)' }}></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--primary)' }}>{act.action}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{new Date(act.createdAt || act.created_at).toLocaleString()}</span>
                    </div>
                    <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{act.description}</p>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>By: {act.performed_by || 'System'}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Admin Notes List */}
        {activeTab === 'notes' && (
          <div>
            {notes.length === 0 ? (
              <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>No admin notes recorded yet.</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {notes.map((n) => {
                  const pBadge = getPriorityBadge(n.priority)
                  return (
                    <div key={n.id} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{n.title}</span>
                        <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: '4px', background: pBadge.bg, color: pBadge.color, fontWeight: 700 }}>
                          {n.priority} Priority
                        </span>
                      </div>
                      <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{n.note}</p>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                        <span>Created by: {n.created_by || 'Admin'}</span>
                        <span>{new Date(n.createdAt || n.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Add Note Form */}
        {activeTab === 'addNote' && (
          <form onSubmit={handleAddNote} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Note Title *</label>
              <input type="text" required className="input" value={noteForm.title} onChange={e => setNoteForm({ ...noteForm, title: e.target.value })} placeholder="e.g. Phone Discussion with Procurement Head" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Priority Level</label>
                <select className="input" value={noteForm.priority} onChange={e => setNoteForm({ ...noteForm, priority: e.target.value })}>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Follow-up Reminder Date</label>
                <input type="date" className="input" value={noteForm.reminderDate} onChange={e => setNoteForm({ ...noteForm, reminderDate: e.target.value })} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Note Description *</label>
              <textarea rows="4" required className="input" value={noteForm.note} onChange={e => setNoteForm({ ...noteForm, note: e.target.value })} placeholder="Type call summary, customer feedback, or site visit notes..." />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
              <button type="button" onClick={() => setActiveTab('timeline')} className="btn btn-outline">Cancel</button>
              <button type="submit" disabled={savingNote} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {savingNote ? 'Saving...' : <><FiSave /> Save Note</>}
              </button>
            </div>
          </form>
        )}

        <div style={{ marginTop: '1.5rem', textAlign: 'right', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
          <button onClick={onClose} className="btn btn-outline">Close</button>
        </div>

      </div>
    </div>
  )
}
