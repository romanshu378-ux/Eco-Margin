// EcoMargin Admin Panel — EPC Projects Portfolio Management
// src/pages/Projects/ProjectsPage.jsx

import React, { useState, useEffect, useMemo } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiCheck, FiRefreshCw, FiAlertCircle, FiUploadCloud, FiX, FiSave } from 'react-icons/fi';
import adminService from '../../services/adminService';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    clientName: '',
    location: '',
    capacity: '',
    timeline: '',
    description: '',
    imageUrl: '',
    displayOrder: 0,
    status: 'Completed'
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formError, setFormError] = useState(null);

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await adminService.getProjects();
      if (res && res.data) {
        setProjects(res.data);
      } else if (Array.isArray(res)) {
        setProjects(res);
      } else {
        setProjects([]);
      }
    } catch (err) {
      console.error('❌ Error fetching projects:', err);
      setError(err.message || err.data?.message || 'Failed to load projects from database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      clientName: '',
      location: '',
      capacity: '',
      timeline: '',
      description: '',
      imageUrl: '',
      displayOrder: 0,
      status: 'Completed'
    });
    setFormError(null);
    setShowModal(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title || '',
      clientName: item.clientName || item.client_name || '',
      location: item.location || '',
      capacity: item.capacity || '',
      timeline: item.timeline || '',
      description: item.description || '',
      imageUrl: item.imageUrl || item.image_url || (Array.isArray(item.images) ? item.images[0] : '') || '',
      displayOrder: item.displayOrder ?? item.display_order ?? 0,
      status: item.status || 'Completed'
    });
    setFormError(null);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this EPC project record?')) return;
    try {
      await adminService.deleteProject(id);
      showToast('Project deleted successfully!');
      fetchProjects();
    } catch (err) {
      console.error('❌ Error deleting project:', err);
      setError(err.message || 'Failed to delete project.');
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
      setFormError(err.message || 'Failed to upload project image to Cloudinary');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    if (!formData.title.trim()) {
      setFormError('Project Title is required.');
      return;
    }

    setSaving(true);
    try {
      if (editingItem) {
        await adminService.updateProject(editingItem.id, formData);
        showToast('Project updated successfully!');
      } else {
        await adminService.createProject(formData);
        showToast('Project created successfully!');
      }
      setShowModal(false);
      fetchProjects();
    } catch (err) {
      console.error('❌ Error saving project:', err);
      setFormError(err.message || err.data?.message || 'Failed to save project record');
    } finally {
      setSaving(false);
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return projects;
    const q = searchQuery.toLowerCase();
    return projects.filter(p => 
      (p.title && p.title.toLowerCase().includes(q)) || 
      (p.clientName && p.clientName.toLowerCase().includes(q)) ||
      (p.location && p.location.toLowerCase().includes(q))
    );
  }, [projects, searchQuery]);

  return (
    <div style={{ padding: '1.5rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>EPC Projects Portfolio CMS</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Manage Turnkey EV Charging Station Installations, Highway Corridors & Bus Depots</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={fetchProjects} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiRefreshCw className={loading ? 'spin' : ''} /> Refresh
          </button>
          <button onClick={handleOpenAdd} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiPlus /> Add EPC Project
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
          placeholder="Search projects by title, client, or location..."
          style={{ background: 'transparent', border: 'none', color: 'inherit', width: '100%', outline: 'none', fontSize: '0.875rem' }}
        />
      </div>

      {/* Table */}
      <div className="card" style={{ padding: '1rem', overflowX: 'auto' }}>
        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading projects portfolio from database...</div>
        ) : filteredProjects.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>No projects found in database.</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '0.75rem 1rem' }}>Project Title</th>
                <th style={{ padding: '0.75rem 1rem' }}>Client</th>
                <th style={{ padding: '0.75rem 1rem' }}>Location</th>
                <th style={{ padding: '0.75rem 1rem' }}>Capacity</th>
                <th style={{ padding: '0.75rem 1rem' }}>Status</th>
                <th style={{ padding: '0.75rem 1rem' }}>Image</th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map(p => {
                const img = p.imageUrl || p.image_url || (Array.isArray(p.images) ? p.images[0] : '');
                return (
                  <tr key={p.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '1rem', fontWeight: 600 }}>{p.title}</td>
                    <td style={{ padding: '1rem' }}>{p.clientName || p.client_name || '—'}</td>
                    <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{p.location || '—'}</td>
                    <td style={{ padding: '1rem', color: 'var(--primary)', fontWeight: 600 }}>{p.capacity || '—'}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, background: p.status === 'Completed' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)', color: p.status === 'Completed' ? 'var(--primary)' : 'var(--warning)' }}>
                        {p.status || 'Completed'}
                      </span>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      {img ? (
                        <img src={img} alt={p.title} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                      ) : (
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>No image</span>
                      )}
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                        <button onClick={() => handleOpenEdit(p)} className="btn btn-outline" style={{ padding: '0.4rem', color: 'var(--primary)' }} title="Edit">
                          <FiEdit2 />
                        </button>
                        <button onClick={() => handleDelete(p.id)} className="btn btn-outline" style={{ padding: '0.4rem', color: 'var(--danger)' }} title="Delete">
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

      {/* Modal Form */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="card" style={{ width: '100%', maxWidth: '600px', padding: '2rem', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', margin: 0 }}>
                {editingItem ? 'Edit EPC Project' : 'Add New EPC Project'}
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
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Project Title *</label>
                <input type="text" required className="input" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="e.g. Delhi-Jaipur EV Superhighway Corridor" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Client Name</label>
                  <input type="text" className="input" value={formData.clientName} onChange={e => setFormData({ ...formData, clientName: e.target.value })} placeholder="e.g. DMRC / National Highway Logistics" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Location</label>
                  <input type="text" className="input" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} placeholder="e.g. NH-48 Expressway" />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Charger Capacity</label>
                  <input type="text" className="input" value={formData.capacity} onChange={e => setFormData({ ...formData, capacity: e.target.value })} placeholder="e.g. 120kW Dual CCS2" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Timeline / Year</label>
                  <input type="text" className="input" value={formData.timeline} onChange={e => setFormData({ ...formData, timeline: e.target.value })} placeholder="e.g. Completed 2025" />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Project Scope Description</label>
                <textarea rows="3" className="input" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Details on civil work, transformer, and DISCOM approvals..." />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Project Cover Image (Cloudinary)</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input type="url" className="input" value={formData.imageUrl} onChange={e => setFormData({ ...formData, imageUrl: e.target.value })} placeholder="https://images.unsplash.com/..." />
                  <label htmlFor="proj-img-file" className="btn btn-outline" style={{ cursor: 'pointer', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <FiUploadCloud /> {uploading ? '...' : 'Upload'}
                  </label>
                  <input id="proj-img-file" type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Display Order</label>
                  <input type="number" className="input" value={formData.displayOrder} onChange={e => setFormData({ ...formData, displayOrder: e.target.value })} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Status</label>
                  <select className="input" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                    <option value="Completed">Completed</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setShowModal(false)} disabled={saving} className="btn btn-outline">Cancel</button>
                <button type="submit" disabled={saving || uploading} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {saving ? 'Saving...' : editingItem ? <><FiSave /> Save Changes</> : <><FiPlus /> Add Project</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
