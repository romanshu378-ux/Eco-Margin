// EcoMargin Admin Panel — Newsletter Subscribers Management Page
// src/pages/Newsletter/NewsletterPage.jsx

import React, { useState, useEffect, useMemo } from 'react';
import { 
  FiMail, FiSearch, FiRefreshCw, FiTrash2, FiCheck, 
  FiAlertCircle, FiDownload, FiPrinter, FiCheckCircle
} from 'react-icons/fi';
import adminService from '../../services/adminService';

export default function NewsletterPage() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);

  const fetchSubscribers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await adminService.getNewsletters({ search: searchQuery });
      if (res && res.data) {
        setSubscribers(res.data);
      } else if (Array.isArray(res)) {
        setSubscribers(res);
      } else {
        setSubscribers([]);
      }
    } catch (err) {
      console.error('❌ Error fetching newsletter subscribers:', err);
      setError(err.message || 'Failed to load newsletter subscribers.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to remove this subscriber email permanently?')) return;
    try {
      await adminService.deleteNewsletter(id);
      showToast('Subscriber removed successfully.');
      setSubscribers(prev => prev.filter(s => s.id !== id));
    } catch (err) {
      setError('Failed to remove subscriber.');
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!window.confirm(`Are you sure you want to delete ${selectedIds.length} selected subscribers?`)) return;
    try {
      await adminService.bulkDeleteNewsletters(selectedIds);
      showToast(`Removed ${selectedIds.length} subscribers.`);
      setSelectedIds([]);
      fetchSubscribers();
    } catch (err) {
      setError('Bulk deletion failed.');
    }
  };

  const exportCSV = () => {
    if (subscribers.length === 0) return;
    const headers = ['ID', 'Email Address', 'Status', 'Subscribed Date'];
    const rows = subscribers.map(s => [
      s.id,
      s.email,
      s.status,
      s.createdAt ? new Date(s.createdAt).toLocaleDateString() : ''
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `EcoMargin_Newsletter_Subscribers_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredSubscribers = useMemo(() => {
    if (!searchQuery.trim()) return subscribers;
    const q = searchQuery.toLowerCase();
    return subscribers.filter(s => (s.email || '').toLowerCase().includes(q));
  }, [subscribers, searchQuery]);

  const toggleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filteredSubscribers.map(s => s.id));
    } else {
      setSelectedIds([]);
    }
  };

  const toggleSelect = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <div style={{ padding: '1.5rem' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>Newsletter Subscribers</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Manage Registered Email Leads for Whitepapers & Technical EV Bulletins</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={exportCSV} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiDownload /> Export CSV List
          </button>
          <button onClick={() => window.print()} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiPrinter /> Print
          </button>
          <button onClick={fetchSubscribers} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
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

      {/* Search & Bulk Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', marginBottom: '1.5rem', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-card)', padding: '0.55rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
          <FiSearch style={{ color: 'var(--text-muted)', marginRight: '0.5rem' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search subscribers by email address..."
            style={{ background: 'transparent', border: 'none', color: 'inherit', width: '100%', outline: 'none', fontSize: '0.875rem' }}
          />
        </div>

        {selectedIds.length > 0 && (
          <button onClick={handleBulkDelete} className="btn btn-outline" style={{ color: 'var(--danger)', border: '1px solid var(--danger)' }}>
            Remove Selected ({selectedIds.length})
          </button>
        )}
      </div>

      {/* Table */}
      <div className="card" style={{ padding: '1rem', overflowX: 'auto' }}>
        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading subscriber emails from database...</div>
        ) : filteredSubscribers.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>No subscribers found.</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '0.75rem' }}>
                  <input type="checkbox" onChange={toggleSelectAll} checked={selectedIds.length === filteredSubscribers.length && filteredSubscribers.length > 0} />
                </th>
                <th style={{ padding: '0.75rem' }}>Subscriber ID</th>
                <th style={{ padding: '0.75rem' }}>Email Address</th>
                <th style={{ padding: '0.75rem' }}>Status</th>
                <th style={{ padding: '0.75rem' }}>Subscribed Date</th>
                <th style={{ padding: '0.75rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubscribers.map(sub => {
                const createdDate = sub.createdAt ? new Date(sub.createdAt).toLocaleDateString() : 'Today';

                return (
                  <tr key={sub.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '0.75rem' }}>
                      <input type="checkbox" checked={selectedIds.includes(sub.id)} onChange={() => toggleSelect(sub.id)} />
                    </td>
                    <td style={{ padding: '0.75rem', fontWeight: 600 }}>#{sub.id}</td>
                    <td style={{ padding: '0.75rem', color: 'var(--primary)', fontWeight: 500 }}>
                      <FiMail style={{ marginRight: '0.35rem' }} /> {sub.email}
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      <span style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--primary)', border: '1px solid var(--primary)', padding: '0.2rem 0.5rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                        {sub.status || 'Subscribed'}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem', color: 'var(--text-muted)' }}>{createdDate}</td>
                    <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                      <button onClick={() => handleDelete(sub.id)} className="btn btn-outline" style={{ padding: '0.4rem', color: 'var(--danger)' }} title="Remove Email">
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
}
