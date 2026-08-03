// EcoMargin Admin Panel — RFQ Enquiries & Lead Management System
// src/pages/Contact/ContactPage.jsx

import React, { useState, useEffect, useMemo } from 'react';
import { 
  FiMail, FiPhone, FiUser, FiBriefcase, FiCalendar, FiSearch, 
  FiFilter, FiRefreshCw, FiEdit2, FiTrash2, FiCheck, FiAlertCircle, 
  FiX, FiSave, FiInbox, FiClock, FiCheckCircle
} from 'react-icons/fi';
import adminService from '../../services/adminService';

export default function ContactPage() {
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({
    totalLeads: 0,
    newLeads: 0,
    todayLeads: 0,
    closedLeads: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('all');

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    status: 'New',
    notes: ''
  });
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState(null);

  const fetchLeads = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await adminService.getLeads({
        search: searchQuery,
        status: statusFilter,
        dateRange: dateFilter
      });

      if (res && res.data) {
        setLeads(res.data);
        if (res.stats) {
          setStats(res.stats);
        } else {
          computeLocalStats(res.data);
        }
      } else if (Array.isArray(res)) {
        setLeads(res);
        computeLocalStats(res);
      } else {
        setLeads([]);
      }
    } catch (err) {
      console.error('❌ Error fetching leads:', err);
      setError(err.message || err.data?.message || 'Failed to load leads from database.');
    } finally {
      setLoading(false);
    }
  };

  const computeLocalStats = (dataList) => {
    if (!Array.isArray(dataList)) return;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const totalLeads = dataList.length;
    const newLeads = dataList.filter(l => l.status === 'New').length;
    const todayLeads = dataList.filter(l => new Date(l.createdAt || l.created_at) >= today).length;
    const closedLeads = dataList.filter(l => l.status === 'Closed').length;

    setStats({ totalLeads, newLeads, todayLeads, closedLeads });
  };

  useEffect(() => {
    fetchLeads();
  }, [statusFilter, dateFilter]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Instant Status Change Handler
  const handleStatusChange = async (leadId, newStatus) => {
    try {
      await adminService.updateLeadStatus(leadId, newStatus);
      showToast(`Status updated to "${newStatus}"!`);
      // Update local state instantly
      setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
      // Re-compute stats
      fetchLeads();
    } catch (err) {
      console.error('❌ Error updating lead status:', err);
      setError(err.message || 'Failed to update status.');
    }
  };

  // Handle Edit Lead Modal
  const handleOpenEdit = (lead) => {
    setEditingLead(lead);
    setFormData({
      fullName: lead.fullName || lead.full_name || lead.name || '',
      email: lead.email || '',
      phone: lead.phone || '',
      company: lead.company || '',
      subject: lead.subject || lead.product_requirement || '',
      message: lead.message || lead.requirements || '',
      status: lead.status || 'New',
      notes: lead.notes || ''
    });
    setFormError(null);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this lead inquiry permanently?')) return;
    try {
      await adminService.deleteLead(id);
      showToast('Lead deleted successfully!');
      setLeads(prev => prev.filter(l => l.id !== id));
      fetchLeads();
    } catch (err) {
      console.error('❌ Error deleting lead:', err);
      setError(err.message || 'Failed to delete lead.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setFormError('Full Name, Email, and Phone number are required.');
      return;
    }

    setSaving(true);
    try {
      if (editingLead) {
        await adminService.updateLead(editingLead.id, formData);
        showToast('Lead details updated successfully!');
      } else {
        await adminService.createLead(formData);
        showToast('Lead created successfully!');
      }
      setShowModal(false);
      fetchLeads();
    } catch (err) {
      console.error('❌ Error saving lead:', err);
      setFormError(err.message || err.data?.message || 'Failed to save lead');
    } finally {
      setSaving(false);
    }
  };

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    if (!searchQuery.trim()) return leads;
    const q = searchQuery.toLowerCase();
    return leads.filter(l => {
      const name = (l.fullName || l.full_name || l.name || '').toLowerCase();
      const email = (l.email || '').toLowerCase();
      const company = (l.company || '').toLowerCase();
      const subject = (l.subject || '').toLowerCase();
      return name.includes(q) || email.includes(q) || company.includes(q) || subject.includes(q);
    });
  }, [leads, searchQuery]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'New': return { bg: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6', border: '1px solid rgba(59, 130, 246, 0.3)' };
      case 'In Progress': return { bg: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', border: '1px solid rgba(245, 158, 11, 0.3)' };
      case 'Replied': return { bg: 'rgba(16, 185, 129, 0.15)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.3)' };
      case 'Closed': return { bg: 'rgba(107, 114, 128, 0.15)', color: '#6b7280', border: '1px solid rgba(107, 114, 128, 0.3)' };
      default: return { bg: 'rgba(107, 114, 128, 0.15)', color: '#6b7280', border: '1px solid rgba(107, 114, 128, 0.3)' };
    }
  };

  return (
    <div style={{ padding: '1.5rem' }}>

      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>RFQ Enquiries & Lead Management</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Track B2B Leads, RFQ Quotations, Inquiry Statuses, and Admin Follow-up Notes</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={fetchLeads} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiRefreshCw className={loading ? 'spin' : ''} /> Refresh
          </button>
        </div>
      </div>

      {/* Notifications */}
      {toastMessage && (
        <div style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--primary)', border: '1px solid var(--primary)', padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
          <FiCheck /> {toastMessage}
        </div>
      )}
      {error && (
        <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', border: '1px solid var(--danger)', padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
          <FiAlertCircle /> {error}
        </div>
      )}

      {/* Dashboard Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        <div className="card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
            <FiInbox />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Leads</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{stats.totalLeads}</div>
          </div>
        </div>

        <div className="card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
            <FiClock />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>New Leads</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f59e0b' }}>{stats.newLeads}</div>
          </div>
        </div>

        <div className="card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
            <FiCalendar />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Today's Leads</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)' }}>{stats.todayLeads}</div>
          </div>
        </div>

        <div className="card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(107, 114, 128, 0.15)', color: '#6b7280', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
            <FiCheckCircle />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Closed Leads</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{stats.closedLeads}</div>
          </div>
        </div>
      </div>

      {/* Filter & Controls Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '1rem', marginBottom: '1.5rem', alignItems: 'center' }}>
        
        {/* Search */}
        <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-card)', padding: '0.55rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
          <FiSearch style={{ color: 'var(--text-muted)', marginRight: '0.5rem' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search leads by name, email, company, or subject..."
            style={{ background: 'transparent', border: 'none', color: 'inherit', width: '100%', outline: 'none', fontSize: '0.875rem' }}
          />
        </div>

        {/* Status Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FiFilter style={{ color: 'var(--text-muted)' }} />
          <select
            className="input"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            style={{ minWidth: '130px', fontSize: '0.85rem' }}
          >
            <option value="All">All Statuses</option>
            <option value="New">New</option>
            <option value="In Progress">In Progress</option>
            <option value="Replied">Replied</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        {/* Date Filter */}
        <div>
          <select
            className="input"
            value={dateFilter}
            onChange={e => setDateFilter(e.target.value)}
            style={{ minWidth: '130px', fontSize: '0.85rem' }}
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>

      </div>

      {/* Lead Table */}
      <div className="card" style={{ padding: '1rem', overflowX: 'auto' }}>
        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading lead enquiries from database...</div>
        ) : filteredLeads.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            <FiInbox style={{ fontSize: '2.5rem', marginBottom: '0.5rem', opacity: 0.5 }} /><br />
            No lead enquiries match your search or filter criteria.
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '0.75rem 1rem' }}>ID & Date</th>
                <th style={{ padding: '0.75rem 1rem' }}>Full Name</th>
                <th style={{ padding: '0.75rem 1rem' }}>Email & Phone</th>
                <th style={{ padding: '0.75rem 1rem' }}>Company</th>
                <th style={{ padding: '0.75rem 1rem' }}>Subject / Requirement</th>
                <th style={{ padding: '0.75rem 1rem' }}>Status</th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map(lead => {
                const name = lead.fullName || lead.full_name || lead.name || 'Client';
                const createdDate = lead.createdAt || lead.created_at ? new Date(lead.createdAt || lead.created_at).toLocaleDateString() : 'Today';
                const statusStyle = getStatusColor(lead.status);

                return (
                  <tr key={lead.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>
                      <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>#{lead.id}</span><br />
                      <span style={{ fontSize: '0.75rem' }}>{createdDate}</span>
                    </td>
                    <td style={{ padding: '1rem', fontWeight: 600 }}>{name}</td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--primary)' }}>
                        <FiMail size={13} /> <a href={`mailto:${lead.email}`} style={{ color: 'inherit', textDecoration: 'none' }}>{lead.email}</a>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.2rem' }}>
                        <FiPhone size={13} /> {lead.phone}
                      </div>
                    </td>
                    <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{lead.company || 'Individual'}</td>
                    <td style={{ padding: '1rem', maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {lead.subject || lead.product_requirement || 'EV Charger Inquiry'}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <select
                        value={lead.status || 'New'}
                        onChange={e => handleStatusChange(lead.id, e.target.value)}
                        style={{
                          background: statusStyle.bg,
                          color: statusStyle.color,
                          border: statusStyle.border,
                          padding: '0.25rem 0.5rem',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          outline: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        <option value="New" style={{ background: '#1e293b', color: '#fff' }}>New</option>
                        <option value="In Progress" style={{ background: '#1e293b', color: '#fff' }}>In Progress</option>
                        <option value="Replied" style={{ background: '#1e293b', color: '#fff' }}>Replied</option>
                        <option value="Closed" style={{ background: '#1e293b', color: '#fff' }}>Closed</option>
                      </select>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                        <button onClick={() => handleOpenEdit(lead)} className="btn btn-outline" style={{ padding: '0.4rem', color: 'var(--primary)' }} title="View Details / Edit Notes">
                          <FiEdit2 />
                        </button>
                        <button onClick={() => handleDelete(lead.id)} className="btn btn-outline" style={{ padding: '0.4rem', color: 'var(--danger)' }} title="Delete Lead">
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Edit Lead & Notes Modal */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.75)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="card" style={{ width: '100%', maxWidth: '650px', padding: '2rem', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', margin: 0 }}>
                {editingLead ? `Lead Inquiry #${editingLead.id}` : 'Create Lead Record'}
              </h3>
              <button onClick={() => setShowModal(false)} className="btn btn-outline" style={{ border: 'none', padding: '0.4rem' }}>
                <FiX size={20} />
              </button>
            </div>

            {formError && (
              <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem', fontSize: '0.875rem' }}>
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Full Name *</label>
                  <input type="text" required className="input" value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Work Email *</label>
                  <input type="email" required className="input" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Phone Number *</label>
                  <input type="text" required className="input" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Company Name</label>
                  <input type="text" className="input" value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} placeholder="e.g. Nexus Logistics" />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Subject / Product Requirement</label>
                  <input type="text" className="input" value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Lead Status</label>
                  <select className="input" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                    <option value="New">New</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Replied">Replied</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Original Lead Message</label>
                <textarea rows="3" className="input" value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} placeholder="Client inquiry details..." />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--primary)' }}>Admin Internal Notes & Follow-up History</label>
                <textarea rows="3" className="input" value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })} placeholder="Add follow-up notes, sales representative calls, or proposal links..." />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setShowModal(false)} disabled={saving} className="btn btn-outline">Cancel</button>
                <button type="submit" disabled={saving} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {saving ? 'Saving...' : <><FiSave /> Save Changes</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
