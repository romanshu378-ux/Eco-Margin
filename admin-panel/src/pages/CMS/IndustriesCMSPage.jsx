// EcoMargin Admin Panel — Industries & Sectors CMS
// src/pages/CMS/IndustriesCMSPage.jsx

import React, { useState, useEffect, useMemo } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiCheck, FiRefreshCw, FiAlertCircle, FiUploadCloud, FiX, FiSave } from 'react-icons/fi';
import adminService from '../../services/adminService';

export default function IndustriesCMSPage() {
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    icon: '⚡',
    description: '',
    imageUrl: '',
    displayOrder: 0,
    status: 'Active'
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formError, setFormError] = useState(null);

  const fetchIndustries = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await adminService.getIndustries();
      if (res && res.data) {
        setIndustries(res.data);
      } else if (Array.isArray(res)) {
        setIndustries(res);
      } else {
        setIndustries([]);
      }
    } catch (err) {
      console.error('❌ Error fetching industries:', err);
      setError(err.message || err.data?.message || 'Failed to load industries from database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIndustries();
  }, []);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({ name: '', icon: '⚡', description: '', imageUrl: '', displayOrder: 0, status: 'Active' });
    setFormError(null);
    setShowModal(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name || '',
      icon: item.icon || '⚡',
      description: item.description || item.desc || '',
      imageUrl: item.imageUrl || item.image_url || '',
      displayOrder: item.displayOrder ?? item.display_order ?? 0,
      status: item.status || 'Active'
    });
    setFormError(null);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this industry sector?')) return;
    try {
      await adminService.deleteIndustry(id);
      showToast('Industry sector deleted successfully!');
      fetchIndustries();
    } catch (err) {
      console.error('❌ Error deleting industry:', err);
      setError(err.message || 'Failed to delete industry sector.');
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setFormError(null);
    try {
      const data = new FormData();
      data.append('file', file);
      const res = await adminService.uploadMedia(data);
      const url = res?.data?.url || res?.url || res?.data?.secure_url;
      if (url) {
        setFormData(prev => ({ ...prev, imageUrl: url }));
      } else {
        throw new Error('Upload succeeded but no image URL was returned.');
      }
    } catch (err) {
      console.error('❌ Error uploading image:', err);
      setFormError(err.message || 'Failed to upload image to Cloudinary');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    if (!formData.name.trim()) {
      setFormError('Sector Name is required.');
      return;
    }

    setSaving(true);
    try {
      if (editingItem) {
        await adminService.updateIndustry(editingItem.id, formData);
        showToast('Industry sector updated successfully!');
      } else {
        await adminService.createIndustry(formData);
        showToast('Industry sector created successfully!');
      }
      setShowModal(false);
      fetchIndustries();
    } catch (err) {
      console.error('❌ Error saving industry:', err);
      setFormError(err.message || err.data?.message || 'Failed to save industry sector');
    } finally {
      setSaving(false);
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredIndustries = useMemo(() => {
    if (!searchQuery.trim()) return industries;
    const q = searchQuery.toLowerCase();
    return industries.filter(i => (i.name && i.name.toLowerCase().includes(q)) || (i.description && i.description.toLowerCase().includes(q)));
  }, [industries, searchQuery]);

  return (
    <div style={{ padding: '1.5rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>Industries & Sectors CMS</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Manage Industry Verticals (Highways, Fleets, Bus Depots, Hotels, Apartments, Petrol Pumps)</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={fetchIndustries} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiRefreshCw className={loading ? 'spin' : ''} /> Refresh
          </button>
          <button onClick={handleOpenAdd} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiPlus /> Add Industry Sector
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

      {/* Search Bar */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', background: 'var(--bg-card)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
        <FiSearch style={{ color: 'var(--text-muted)', marginRight: '0.5rem' }} />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search industry sectors by title or description..."
          style={{ background: 'transparent', border: 'none', color: 'inherit', width: '100%', outline: 'none', fontSize: '0.875rem' }}
        />
      </div>

      {/* Table */}
      <div className="card" style={{ padding: '1rem', overflowX: 'auto' }}>
        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading industry sectors from database...</div>
        ) : filteredIndustries.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>No industry sectors found in database.</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '0.75rem 1rem' }}>Industry Sector</th>
                <th style={{ padding: '0.75rem 1rem' }}>Icon</th>
                <th style={{ padding: '0.75rem 1rem' }}>Target Description</th>
                <th style={{ padding: '0.75rem 1rem' }}>Order</th>
                <th style={{ padding: '0.75rem 1rem' }}>Status</th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredIndustries.map(ind => (
                <tr key={ind.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '1rem', fontWeight: 600 }}>{ind.name}</td>
                  <td style={{ padding: '1rem', fontSize: '1.25rem' }}>{ind.icon || '⚡'}</td>
                  <td style={{ padding: '1rem', color: 'var(--text-muted)', maxWidth: '350px' }}>{ind.description || ind.desc}</td>
                  <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{ind.displayOrder ?? ind.display_order ?? 0}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, background: ind.status === 'Active' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)', color: ind.status === 'Active' ? 'var(--primary)' : 'var(--danger)' }}>
                      {ind.status || 'Active'}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                      <button onClick={() => handleOpenEdit(ind)} className="btn btn-outline" style={{ padding: '0.4rem', color: 'var(--primary)' }} title="Edit">
                        <FiEdit2 />
                      </button>
                      <button onClick={() => handleDelete(ind.id)} className="btn btn-outline" style={{ padding: '0.4rem', color: 'var(--danger)' }} title="Delete">
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal Form */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="card" style={{ width: '100%', maxWidth: '550px', padding: '2rem', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', margin: 0 }}>
                {editingItem ? 'Edit Industry Sector' : 'Add New Industry Sector'}
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
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Sector Name *</label>
                <input type="text" required className="input" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. Express Highways & Petrol Pumps" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Icon / Emoji</label>
                  <input type="text" className="input" value={formData.icon} onChange={e => setFormData({ ...formData, icon: e.target.value })} placeholder="🛣️" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Status</label>
                  <select className="input" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                    <option value="Active">Active</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Target Description</label>
                <textarea rows="3" className="input" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Describe charger solutions for this vertical..." />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Icon/Banner Image (Cloudinary)</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input type="url" className="input" value={formData.imageUrl} onChange={e => setFormData({ ...formData, imageUrl: e.target.value })} placeholder="https://res.cloudinary.com/..." />
                  <label htmlFor="ind-img-file" className="btn btn-outline" style={{ cursor: 'pointer', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <FiUploadCloud /> {uploading ? '...' : 'Upload'}
                  </label>
                  <input id="ind-img-file" type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Display Order</label>
                <input type="number" className="input" value={formData.displayOrder} onChange={e => setFormData({ ...formData, displayOrder: e.target.value })} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setShowModal(false)} disabled={saving} className="btn btn-outline">Cancel</button>
                <button type="submit" disabled={saving || uploading} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {saving ? 'Saving...' : editingItem ? <><FiSave /> Save Changes</> : <><FiPlus /> Add Sector</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
