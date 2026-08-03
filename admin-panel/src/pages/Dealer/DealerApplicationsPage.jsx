// EcoMargin Admin Panel — Dealer Partner Applications Management Page
// src/pages/Dealer/DealerApplicationsPage.jsx

import React, { useState, useEffect, useMemo } from 'react';
import { 
  FiUsers, FiSearch, FiFilter, FiRefreshCw, FiEdit2, FiTrash2, 
  FiCheck, FiAlertCircle, FiX, FiSave, FiDownload, FiPrinter, FiBriefcase, FiMapPin, FiMail, FiPhone
} from 'react-icons/fi';
import adminService from '../../services/adminService';

export default function DealerApplicationsPage() {
  const [dealers, setDealers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Filter & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedIds, setSelectedIds] = useState([]);

  // Modal
  const [showModal, setShowModal] = useState(false);
  const [editingDealer, setEditingDealer] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    experience: '',
    investmentCapacity: '',
    message: '',
    status: 'New',
    notes: ''
  });
  const [saving, setSaving] = useState(false);

  const fetchDealers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await adminService.getDealerApplications({ search: searchQuery, status: statusFilter });
      if (res && res.data) {
        setDealers(res.data);
      } else if (Array.isArray(res)) {
        setDealers(res);
      } else {
        setDealers([]);
      }
    } catch (err) {
      console.error('❌ Error fetching dealer applications:', err);
      setError(err.message || 'Failed to load dealer applications from database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDealers();
  }, [statusFilter]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await adminService.updateDealerStatus(id, newStatus);
      showToast(`Status updated to "${newStatus}"!`);
      setDealers(prev => prev.map(d => d.id === id ? { ...d, status: newStatus } : d));
    } catch (err) {
      setError('Failed to update status.');
    }
  };

  const handleOpenEdit = (dealer) => {
    setEditingDealer(dealer);
    setFormData({
      fullName: dealer.fullName || dealer.full_name || '',
      companyName: dealer.companyName || dealer.company_name || '',
      email: dealer.email || '',
      phone: dealer.phone || '',
      city: dealer.city || '',
      state: dealer.state || '',
      experience: dealer.experience || '',
      investmentCapacity: dealer.investmentCapacity || dealer.investment_capacity || '',
      message: dealer.message || '',
      status: dealer.status || 'New',
      notes: dealer.notes || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this dealer application permanently?')) return;
    try {
      await adminService.deleteDealer(id);
      showToast('Dealer application deleted successfully.');
      setDealers(prev => prev.filter(d => d.id !== id));
    } catch (err) {
      setError('Failed to delete dealer application.');
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!window.confirm(`Are you sure you want to delete ${selectedIds.length} selected applications?`)) return;
    try {
      await adminService.bulkDeleteDealers(selectedIds);
      showToast(`Deleted ${selectedIds.length} applications.`);
      setSelectedIds([]);
      fetchDealers();
    } catch (err) {
      setError('Bulk deletion failed.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingDealer) {
        await adminService.updateDealer(editingDealer.id, formData);
        showToast('Application updated successfully.');
      } else {
        await adminService.createDealer(formData);
        showToast('Dealer application created.');
      }
      setShowModal(false);
      fetchDealers();
    } catch (err) {
      setError('Failed to save changes.');
    } finally {
      setSaving(false);
    }
  };

  // CSV Export
  const exportCSV = () => {
    if (dealers.length === 0) return;
    const headers = ['ID', 'Full Name', 'Company', 'Email', 'Phone', 'City', 'State', 'Experience', 'Investment', 'Status', 'Date'];
    const rows = dealers.map(d => [
      d.id,
      `"${d.fullName || ''}"`,
      `"${d.companyName || ''}"`,
      d.email,
      d.phone,
      d.city,
      d.state,
      `"${d.experience || ''}"`,
      `"${d.investmentCapacity || ''}"`,
      d.status,
      d.createdAt ? new Date(d.createdAt).toLocaleDateString() : ''
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `EcoMargin_Dealer_Applications_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredDealers = useMemo(() => {
    if (!searchQuery.trim()) return dealers;
    const q = searchQuery.toLowerCase();
    return dealers.filter(d => {
      const name = (d.fullName || '').toLowerCase();
      const company = (d.companyName || '').toLowerCase();
      const email = (d.email || '').toLowerCase();
      const city = (d.city || '').toLowerCase();
      return name.includes(q) || company.includes(q) || email.includes(q) || city.includes(q);
    });
  }, [dealers, searchQuery]);

  const toggleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filteredDealers.map(d => d.id));
    } else {
      setSelectedIds([]);
    }
  };

  const toggleSelect = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'New': return { bg: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6', border: '1px solid rgba(59, 130, 246, 0.3)' };
      case 'In Review': return { bg: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', border: '1px solid rgba(245, 158, 11, 0.3)' };
      case 'Approved': return { bg: 'rgba(16, 185, 129, 0.15)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.3)' };
      case 'Rejected': return { bg: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)' };
      default: return { bg: 'rgba(107, 114, 128, 0.15)', color: '#6b7280', border: '1px solid rgba(107, 114, 128, 0.3)' };
    }
  };

  return (
    <div style={{ padding: '1.5rem' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>Dealer Partner Applications</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Review Distribution Partnerships, Regional Franchises, and Franchisee Profiles</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={exportCSV} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiDownload /> Export CSV
          </button>
          <button onClick={() => window.print()} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiPrinter /> Print
          </button>
          <button onClick={fetchDealers} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiRefreshCw className={loading ? 'spin' : ''} /> Refresh
          </button>
        </div>
      </div>

      {toastMessage && (
        <div style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--primary)', border: '1px solid var(--primary)', padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FiCheck /> {toastMessage}
        </div>
      )}
      {error && (
        <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', border: '1px solid var(--danger)', padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FiAlertCircle /> {error}
        </div>
      )}

      {/* Controls Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '1rem', marginBottom: '1.5rem', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-card)', padding: '0.55rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
          <FiSearch style={{ color: 'var(--text-muted)', marginRight: '0.5rem' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search dealer applications by applicant name, company, email, or city..."
            style={{ background: 'transparent', border: 'none', color: 'inherit', width: '100%', outline: 'none', fontSize: '0.875rem' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FiFilter style={{ color: 'var(--text-muted)' }} />
          <select className="input" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="All">All Statuses</option>
            <option value="New">New</option>
            <option value="In Review">In Review</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {selectedIds.length > 0 && (
          <button onClick={handleBulkDelete} className="btn btn-outline" style={{ color: 'var(--danger)', border: '1px solid var(--danger)' }}>
            Delete Selected ({selectedIds.length})
          </button>
        )}
      </div>

      {/* Table */}
      <div className="card" style={{ padding: '1rem', overflowX: 'auto' }}>
        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading dealer applications from MySQL...</div>
        ) : filteredDealers.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>No dealer applications found.</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '0.75rem' }}>
                  <input type="checkbox" onChange={toggleSelectAll} checked={selectedIds.length === filteredDealers.length && filteredDealers.length > 0} />
                </th>
                <th style={{ padding: '0.75rem' }}>ID & Date</th>
                <th style={{ padding: '0.75rem' }}>Applicant & Company</th>
                <th style={{ padding: '0.75rem' }}>Contact Info</th>
                <th style={{ padding: '0.75rem' }}>City & State</th>
                <th style={{ padding: '0.75rem' }}>Investment Capacity</th>
                <th style={{ padding: '0.75rem' }}>Status</th>
                <th style={{ padding: '0.75rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDealers.map(dealer => {
                const statusStyle = getStatusColor(dealer.status);
                const createdDate = dealer.createdAt ? new Date(dealer.createdAt).toLocaleDateString() : 'Today';

                return (
                  <tr key={dealer.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '0.75rem' }}>
                      <input type="checkbox" checked={selectedIds.includes(dealer.id)} onChange={() => toggleSelect(dealer.id)} />
                    </td>
                    <td style={{ padding: '0.75rem', color: 'var(--text-muted)' }}>
                      <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>#{dealer.id}</span><br />
                      <span style={{ fontSize: '0.75rem' }}>{createdDate}</span>
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      <div style={{ fontWeight: 600 }}>{dealer.fullName}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{dealer.companyName || 'Individual Business'}</div>
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      <div style={{ color: 'var(--primary)' }}><FiMail size={12} /> {dealer.email}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}><FiPhone size={12} /> {dealer.phone}</div>
                    </td>
                    <td style={{ padding: '0.75rem' }}>{dealer.city || 'N/A'}, {dealer.state || ''}</td>
                    <td style={{ padding: '0.75rem', fontWeight: 600, color: 'var(--primary)' }}>{dealer.investmentCapacity || 'Flexible'}</td>
                    <td style={{ padding: '0.75rem' }}>
                      <select
                        value={dealer.status || 'New'}
                        onChange={e => handleStatusChange(dealer.id, e.target.value)}
                        style={{ background: statusStyle.bg, color: statusStyle.color, border: statusStyle.border, padding: '0.25rem 0.5rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, outline: 'none' }}
                      >
                        <option value="New" style={{ background: '#1e293b', color: '#fff' }}>New</option>
                        <option value="In Review" style={{ background: '#1e293b', color: '#fff' }}>In Review</option>
                        <option value="Approved" style={{ background: '#1e293b', color: '#fff' }}>Approved</option>
                        <option value="Rejected" style={{ background: '#1e293b', color: '#fff' }}>Rejected</option>
                      </select>
                    </td>
                    <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                        <button onClick={() => handleOpenEdit(dealer)} className="btn btn-outline" style={{ padding: '0.4rem', color: 'var(--primary)' }}>
                          <FiEdit2 />
                        </button>
                        <button onClick={() => handleDelete(dealer.id)} className="btn btn-outline" style={{ padding: '0.4rem', color: 'var(--danger)' }}>
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

      {/* Modal */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.75)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="card" style={{ width: '100%', maxWidth: '650px', padding: '2rem', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Dealer Application #{editingDealer?.id}</h3>
              <button onClick={() => setShowModal(false)} className="btn btn-outline" style={{ border: 'none', padding: '0.4rem' }}><FiX size={20} /></button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Full Name *</label>
                  <input type="text" required className="input" value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Company Name</label>
                  <input type="text" className="input" value={formData.companyName} onChange={e => setFormData({ ...formData, companyName: e.target.value })} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Email *</label>
                  <input type="email" required className="input" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Phone *</label>
                  <input type="text" required className="input" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>City</label>
                  <input type="text" className="input" value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>State</label>
                  <input type="text" className="input" value={formData.state} onChange={e => setFormData({ ...formData, state: e.target.value })} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Industry Experience</label>
                  <input type="text" className="input" value={formData.experience} onChange={e => setFormData({ ...formData, experience: e.target.value })} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Investment Capacity</label>
                  <input type="text" className="input" value={formData.investmentCapacity} onChange={e => setFormData({ ...formData, investmentCapacity: e.target.value })} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Applicant Message</label>
                <textarea rows="3" className="input" value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--primary)' }}>Admin Internal Follow-up Notes</label>
                <textarea rows="3" className="input" value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })} placeholder="Add regional manager review notes..." />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-outline">Cancel</button>
                <button type="submit" disabled={saving} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FiSave /> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
