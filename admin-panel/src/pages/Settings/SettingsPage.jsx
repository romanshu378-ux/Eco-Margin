// EcoMargin Admin Panel — Website & Global System Settings Management
// src/pages/Settings/SettingsPage.jsx

import React, { useState, useEffect, useMemo } from 'react';
import { 
  FiSliders, FiPlus, FiSearch, FiFilter, FiRefreshCw, 
  FiEdit2, FiTrash2, FiCheck, FiAlertCircle, FiX, FiSave, FiCode, FiFolder
} from 'react-icons/fi';
import adminService from '../../services/adminService';

export default function SettingsPage() {
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingSetting, setEditingSetting] = useState(null);
  const [formData, setFormData] = useState({
    key: '',
    value: '',
    category: 'General',
    description: ''
  });
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState(null);

  const fetchSettings = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await adminService.getSettings({
        search: searchQuery,
        category: categoryFilter
      });

      if (res && res.data) {
        setSettings(res.data);
      } else if (Array.isArray(res)) {
        setSettings(res);
      } else {
        setSettings([]);
      }
    } catch (err) {
      console.error('❌ Error fetching settings:', err);
      setError(err.message || 'Failed to load website settings from MySQL database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, [categoryFilter]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Open Modal for Add
  const handleOpenAdd = () => {
    setEditingSetting(null);
    setFormData({
      key: '',
      value: '',
      category: 'General',
      description: ''
    });
    setFormError(null);
    setShowModal(true);
  };

  // Open Modal for Edit
  const handleOpenEdit = (setting) => {
    setEditingSetting(setting);
    setFormData({
      key: setting.key || '',
      value: setting.value || '',
      category: setting.category || 'General',
      description: setting.description || ''
    });
    setFormError(null);
    setShowModal(true);
  };

  // Delete Setting
  const handleDelete = async (id, keyName) => {
    if (!window.confirm(`Are you sure you want to delete setting "${keyName}" permanently?`)) return;
    try {
      await adminService.deleteSetting(id);
      showToast(`Setting "${keyName}" deleted successfully!`);
      setSettings(prev => prev.filter(s => s.id !== id));
      fetchSettings();
    } catch (err) {
      console.error('❌ Error deleting setting:', err);
      setError(err.message || 'Failed to delete setting.');
    }
  };

  // Submit Add / Edit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!formData.key.trim()) {
      setFormError('Setting Key is required.');
      return;
    }
    if (!formData.value.trim()) {
      setFormError('Setting Value is required.');
      return;
    }

    setSaving(true);
    try {
      if (editingSetting) {
        await adminService.updateSetting(editingSetting.id, formData);
        showToast(`Setting "${formData.key}" updated successfully!`);
      } else {
        await adminService.createSetting(formData);
        showToast(`Setting "${formData.key}" created successfully!`);
      }
      setShowModal(false);
      fetchSettings();
    } catch (err) {
      console.error('❌ Error saving setting:', err);
      setFormError(err.message || err.data?.message || 'Failed to save setting.');
    } finally {
      setSaving(false);
    }
  };

  // Filtered Settings List
  const filteredSettings = useMemo(() => {
    if (!searchQuery.trim()) return settings;
    const q = searchQuery.toLowerCase();
    return settings.filter(s => {
      const k = (s.key || '').toLowerCase();
      const v = (s.value || '').toLowerCase();
      const d = (s.description || '').toLowerCase();
      return k.includes(q) || v.includes(q) || d.includes(q);
    });
  }, [settings, searchQuery]);

  const getCategoryBadgeStyle = (cat) => {
    switch (cat) {
      case 'General': return { bg: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6', border: '1px solid rgba(59, 130, 246, 0.3)' };
      case 'Contact & Sales': return { bg: 'rgba(16, 185, 129, 0.15)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.3)' };
      case 'Hardware & Grid': return { bg: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', border: '1px solid rgba(245, 158, 11, 0.3)' };
      case 'SEO & Analytics': return { bg: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6', border: '1px solid rgba(139, 92, 246, 0.3)' };
      default: return { bg: 'rgba(107, 114, 128, 0.15)', color: '#6b7280', border: '1px solid rgba(107, 114, 128, 0.3)' };
    }
  };

  return (
    <div style={{ padding: '1.5rem' }}>

      {/* Top Header & Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>Website & System Settings</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Manage Global Environment Parameters, System Endpoints, and Global Constants</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={handleOpenAdd} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiPlus /> Add New Setting
          </button>
          <button onClick={fetchSettings} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiRefreshCw className={loading ? 'spin' : ''} /> Refresh
          </button>
        </div>
      </div>

      {/* Toast & Error Banners */}
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

      {/* Controls & Search Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', marginBottom: '1.5rem', alignItems: 'center' }}>
        
        {/* Live Search */}
        <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-card)', padding: '0.55rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
          <FiSearch style={{ color: 'var(--text-muted)', marginRight: '0.5rem' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search settings by key, value, or description..."
            style={{ background: 'transparent', border: 'none', color: 'inherit', width: '100%', outline: 'none', fontSize: '0.875rem' }}
          />
        </div>

        {/* Category Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FiFilter style={{ color: 'var(--text-muted)' }} />
          <select className="input" value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} style={{ minWidth: '150px', fontSize: '0.85rem' }}>
            <option value="All">All Categories</option>
            <option value="General">General</option>
            <option value="Contact & Sales">Contact & Sales</option>
            <option value="Hardware & Grid">Hardware & Grid</option>
            <option value="SEO & Analytics">SEO & Analytics</option>
            <option value="System">System</option>
          </select>
        </div>

      </div>

      {/* Settings Table */}
      <div className="card" style={{ padding: '1rem', overflowX: 'auto' }}>
        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading system settings from MySQL database...</div>
        ) : filteredSettings.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            <FiSliders style={{ fontSize: '2.5rem', marginBottom: '0.5rem', opacity: 0.5 }} /><br />
            No system settings match your search or filter criteria.
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '0.75rem 1rem' }}>ID</th>
                <th style={{ padding: '0.75rem 1rem' }}>Setting Key</th>
                <th style={{ padding: '0.75rem 1rem' }}>Setting Value</th>
                <th style={{ padding: '0.75rem 1rem' }}>Category</th>
                <th style={{ padding: '0.75rem 1rem' }}>Description</th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSettings.map(s => {
                const catStyle = getCategoryBadgeStyle(s.category);

                return (
                  <tr key={s.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 600 }}>#{s.id}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ 
                        fontFamily: 'Consolas, monospace', 
                        background: 'rgba(255,255,255,0.05)', 
                        border: '1px solid var(--border)', 
                        padding: '0.25rem 0.6rem', 
                        borderRadius: '4px', 
                        fontSize: '0.8rem', 
                        color: 'var(--primary)',
                        fontWeight: 600 
                      }}>
                        {s.key}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', maxWidth: '280px', wordBreak: 'break-word', fontWeight: 500 }}>
                      {s.value}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ 
                        background: catStyle.bg, 
                        color: catStyle.color, 
                        border: catStyle.border, 
                        padding: '0.2rem 0.6rem', 
                        borderRadius: '6px', 
                        fontSize: '0.75rem', 
                        fontWeight: 700 
                      }}>
                        {s.category || 'General'}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.8rem', maxWidth: '220px' }}>
                      {s.description || 'Global setting parameter'}
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                        <button onClick={() => handleOpenEdit(s)} className="btn btn-outline" style={{ padding: '0.4rem', color: 'var(--primary)' }} title="Edit Setting">
                          <FiEdit2 />
                        </button>
                        <button onClick={() => handleDelete(s.id, s.key)} className="btn btn-outline" style={{ padding: '0.4rem', color: 'var(--danger)' }} title="Delete Setting">
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

      {/* Add / Edit Setting Modal */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.75)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="card" style={{ width: '100%', maxWidth: '550px', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FiSliders style={{ color: 'var(--primary)' }} /> {editingSetting ? `Edit Setting #${editingSetting.id}` : 'Create New Setting'}
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
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Setting Key *</label>
                <input 
                  type="text" 
                  required 
                  className="input" 
                  value={formData.key} 
                  disabled={editingSetting !== null}
                  onChange={e => setFormData({ ...formData, key: e.target.value })} 
                  placeholder="e.g. site_name or support_phone"
                />
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Unique key identifier (snake_case format recommended)</span>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Category</label>
                <select className="input" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
                  <option value="General">General</option>
                  <option value="Contact & Sales">Contact & Sales</option>
                  <option value="Hardware & Grid">Hardware & Grid</option>
                  <option value="SEO & Analytics">SEO & Analytics</option>
                  <option value="System">System</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Setting Value *</label>
                <textarea 
                  rows="3" 
                  required 
                  className="input" 
                  value={formData.value} 
                  onChange={e => setFormData({ ...formData, value: e.target.value })} 
                  placeholder="e.g. EcoMargin Infrastructure Pvt. Ltd. or sales@ecomargin.com"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Description</label>
                <input 
                  type="text" 
                  className="input" 
                  value={formData.description} 
                  onChange={e => setFormData({ ...formData, description: e.target.value })} 
                  placeholder="Context explanation for administrators..."
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setShowModal(false)} disabled={saving} className="btn btn-outline">Cancel</button>
                <button type="submit" disabled={saving} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {saving ? 'Saving...' : <><FiSave /> {editingSetting ? 'Save Changes' : 'Create Setting'}</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
