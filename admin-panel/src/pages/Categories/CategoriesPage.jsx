// EcoMargin Admin Panel — Product Categories Management
// src/pages/Categories/CategoriesPage.jsx

import React, { useState, useEffect, useMemo } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiCheck, FiRefreshCw, FiAlertCircle, FiX, FiSave } from 'react-icons/fi';
import adminService from '../../services/adminService';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    displayOrder: 0,
    status: 'Active'
  });
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState(null);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await adminService.getCategories();
      if (res && res.data) {
        setCategories(res.data);
      } else if (Array.isArray(res)) {
        setCategories(res);
      } else {
        setCategories([]);
      }
    } catch (err) {
      console.error('❌ Error fetching categories:', err);
      setError(err.message || err.data?.message || 'Failed to load categories from database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({ name: '', slug: '', description: '', displayOrder: 0, status: 'Active' });
    setFormError(null);
    setShowModal(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name || '',
      slug: item.slug || '',
      description: item.description || '',
      displayOrder: item.displayOrder ?? item.display_order ?? 0,
      status: item.status || 'Active'
    });
    setFormError(null);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product category?')) return;
    try {
      await adminService.deleteCategory(id);
      showToast('Category deleted successfully!');
      fetchCategories();
    } catch (err) {
      console.error('❌ Error deleting category:', err);
      setError(err.message || 'Failed to delete category.');
    }
  };

  const handleNameChange = (e) => {
    const val = e.target.value;
    const autoSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    setFormData(prev => ({
      ...prev,
      name: val,
      slug: editingItem ? prev.slug : autoSlug
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    if (!formData.name.trim()) {
      setFormError('Category name is required.');
      return;
    }

    setSaving(true);
    try {
      if (editingItem) {
        await adminService.updateCategory(editingItem.id, formData);
        showToast('Category updated successfully!');
      } else {
        await adminService.createCategory(formData);
        showToast('Category created successfully!');
      }
      setShowModal(false);
      fetchCategories();
    } catch (err) {
      console.error('❌ Error saving category:', err);
      setFormError(err.message || err.data?.message || 'Failed to save category');
    } finally {
      setSaving(false);
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return categories;
    const q = searchQuery.toLowerCase();
    return categories.filter(c => (c.name && c.name.toLowerCase().includes(q)) || (c.slug && c.slug.toLowerCase().includes(q)));
  }, [categories, searchQuery]);

  return (
    <div style={{ padding: '1.5rem' }}>
      
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>Product Categories CMS</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Manage Hardware & Software Categories (AC Chargers, DC Fast Chargers, LVDC, CSMS)</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={fetchCategories} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiRefreshCw className={loading ? 'spin' : ''} /> Refresh
          </button>
          <button onClick={handleOpenAdd} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiPlus /> Add Category
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
          placeholder="Search categories by name or slug..."
          style={{ background: 'transparent', border: 'none', color: 'inherit', width: '100%', outline: 'none', fontSize: '0.875rem' }}
        />
      </div>

      {/* Table */}
      <div className="card" style={{ padding: '1rem', overflowX: 'auto' }}>
        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading product categories from database...</div>
        ) : filteredCategories.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>No product categories found in database.</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '0.75rem 1rem' }}>ID</th>
                <th style={{ padding: '0.75rem 1rem' }}>Category Name</th>
                <th style={{ padding: '0.75rem 1rem' }}>URL Slug</th>
                <th style={{ padding: '0.75rem 1rem' }}>Description</th>
                <th style={{ padding: '0.75rem 1rem' }}>Order</th>
                <th style={{ padding: '0.75rem 1rem' }}>Status</th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.map(cat => (
                <tr key={cat.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>#{cat.id}</td>
                  <td style={{ padding: '1rem', fontWeight: 600 }}>{cat.name}</td>
                  <td style={{ padding: '1rem', color: 'var(--primary)', fontFamily: 'monospace' }}>{cat.slug}</td>
                  <td style={{ padding: '1rem', color: 'var(--text-muted)', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{cat.description || '—'}</td>
                  <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{cat.displayOrder ?? cat.display_order ?? 0}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, background: cat.status === 'Active' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)', color: cat.status === 'Active' ? 'var(--primary)' : 'var(--danger)' }}>
                      {cat.status || 'Active'}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                      <button onClick={() => handleOpenEdit(cat)} className="btn btn-outline" style={{ padding: '0.4rem', color: 'var(--primary)' }} title="Edit">
                        <FiEdit2 />
                      </button>
                      <button onClick={() => handleDelete(cat.id)} className="btn btn-outline" style={{ padding: '0.4rem', color: 'var(--danger)' }} title="Delete">
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
          <div className="card" style={{ width: '100%', maxWidth: '500px', padding: '2rem', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', margin: 0 }}>
                {editingItem ? 'Edit Category' : 'Add New Category'}
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
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Category Name *</label>
                <input type="text" required className="input" value={formData.name} onChange={handleNameChange} placeholder="e.g. DC Fast Chargers" />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>URL Slug</label>
                <input type="text" className="input" value={formData.slug} onChange={e => setFormData({ ...formData, slug: e.target.value })} placeholder="dc-fast-chargers" />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Description</label>
                <textarea rows="3" className="input" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Display Order</label>
                  <input type="number" className="input" value={formData.displayOrder} onChange={e => setFormData({ ...formData, displayOrder: e.target.value })} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Status</label>
                  <select className="input" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                    <option value="Active">Active</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setShowModal(false)} disabled={saving} className="btn btn-outline">Cancel</button>
                <button type="submit" disabled={saving} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {saving ? 'Saving...' : editingItem ? <><FiSave /> Save Changes</> : <><FiPlus /> Add Category</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
