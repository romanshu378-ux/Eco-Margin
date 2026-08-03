// EcoMargin Admin Panel — Blogs & Insights CMS
// src/pages/Blogs/BlogsPage.jsx

import React, { useState, useEffect, useMemo } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiCheck, FiRefreshCw, FiAlertCircle, FiUploadCloud, FiX, FiSave } from 'react-icons/fi';
import adminService from '../../services/adminService';

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    author: 'EcoMargin Team',
    summary: '',
    content: '',
    coverImage: '',
    displayOrder: 0,
    status: 'Published'
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formError, setFormError] = useState(null);

  const fetchBlogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await adminService.getBlogs();
      if (res && res.data) {
        setBlogs(res.data);
      } else if (Array.isArray(res)) {
        setBlogs(res);
      } else {
        setBlogs([]);
      }
    } catch (err) {
      console.error('❌ Error fetching blogs:', err);
      setError(err.message || err.data?.message || 'Failed to load blog articles from database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      slug: '',
      author: 'EcoMargin Team',
      summary: '',
      content: '',
      coverImage: '',
      displayOrder: 0,
      status: 'Published'
    });
    setFormError(null);
    setShowModal(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title || '',
      slug: item.slug || '',
      author: item.author || 'EcoMargin Team',
      summary: item.summary || '',
      content: item.content || '',
      coverImage: item.coverImage || item.cover_image || '',
      displayOrder: item.displayOrder ?? item.display_order ?? 0,
      status: item.status || 'Published'
    });
    setFormError(null);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog article?')) return;
    try {
      await adminService.deleteBlog(id);
      showToast('Blog article deleted successfully!');
      fetchBlogs();
    } catch (err) {
      console.error('❌ Error deleting blog:', err);
      setError(err.message || 'Failed to delete blog article.');
    }
  };

  const handleTitleChange = (e) => {
    const val = e.target.value;
    const autoSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    setFormData(prev => ({
      ...prev,
      title: val,
      slug: editingItem ? prev.slug : autoSlug
    }));
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
        setFormData(prev => ({ ...prev, coverImage: url }));
      } else {
        throw new Error('Upload succeeded but no image URL was returned.');
      }
    } catch (err) {
      console.error('❌ Error uploading cover image:', err);
      setFormError(err.message || 'Failed to upload cover image to Cloudinary');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    if (!formData.title.trim()) {
      setFormError('Blog Title is required.');
      return;
    }

    setSaving(true);
    try {
      if (editingItem) {
        await adminService.updateBlog(editingItem.id, formData);
        showToast('Blog article updated successfully!');
      } else {
        await adminService.createBlog(formData);
        showToast('Blog article created successfully!');
      }
      setShowModal(false);
      fetchBlogs();
    } catch (err) {
      console.error('❌ Error saving blog:', err);
      setFormError(err.message || err.data?.message || 'Failed to save blog article');
    } finally {
      setSaving(false);
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredBlogs = useMemo(() => {
    if (!searchQuery.trim()) return blogs;
    const q = searchQuery.toLowerCase();
    return blogs.filter(b => 
      (b.title && b.title.toLowerCase().includes(q)) || 
      (b.author && b.author.toLowerCase().includes(q)) ||
      (b.summary && b.summary.toLowerCase().includes(q))
    );
  }, [blogs, searchQuery]);

  return (
    <div style={{ padding: '1.5rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>Blogs & Technical Insights CMS</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Manage ARAI Standards, EV Industry Technical Articles & Whitepapers</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={fetchBlogs} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiRefreshCw className={loading ? 'spin' : ''} /> Refresh
          </button>
          <button onClick={handleOpenAdd} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiPlus /> Create Article
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
          placeholder="Search blog articles by title, author, or summary..."
          style={{ background: 'transparent', border: 'none', color: 'inherit', width: '100%', outline: 'none', fontSize: '0.875rem' }}
        />
      </div>

      {/* Table */}
      <div className="card" style={{ padding: '1rem', overflowX: 'auto' }}>
        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading blog articles from database...</div>
        ) : filteredBlogs.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>No blog articles found in database.</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '0.75rem 1rem' }}>Article Title</th>
                <th style={{ padding: '0.75rem 1rem' }}>Author</th>
                <th style={{ padding: '0.75rem 1rem' }}>Slug</th>
                <th style={{ padding: '0.75rem 1rem' }}>Status</th>
                <th style={{ padding: '0.75rem 1rem' }}>Cover Image</th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBlogs.map(b => {
                const img = b.coverImage || b.cover_image;
                return (
                  <tr key={b.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '1rem', fontWeight: 600, maxWidth: '300px' }}>{b.title}</td>
                    <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{b.author || 'EcoMargin Team'}</td>
                    <td style={{ padding: '1rem', color: 'var(--primary)', fontFamily: 'monospace', fontSize: '0.75rem' }}>{b.slug}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, background: b.status === 'Published' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)', color: b.status === 'Published' ? 'var(--primary)' : 'var(--warning)' }}>
                        {b.status || 'Published'}
                      </span>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      {img ? (
                        <img src={img} alt={b.title} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                      ) : (
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>No image</span>
                      )}
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                        <button onClick={() => handleOpenEdit(b)} className="btn btn-outline" style={{ padding: '0.4rem', color: 'var(--primary)' }} title="Edit">
                          <FiEdit2 />
                        </button>
                        <button onClick={() => handleDelete(b.id)} className="btn btn-outline" style={{ padding: '0.4rem', color: 'var(--danger)' }} title="Delete">
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
          <div className="card" style={{ width: '100%', maxWidth: '650px', padding: '2rem', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', margin: 0 }}>
                {editingItem ? 'Edit Blog Article' : 'Create Blog Article'}
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
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Article Title *</label>
                <input type="text" required className="input" value={formData.title} onChange={handleTitleChange} placeholder="e.g. Understanding ARAI AIS-138 Certification" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>URL Slug</label>
                  <input type="text" className="input" value={formData.slug} onChange={e => setFormData({ ...formData, slug: e.target.value })} placeholder="arai-ais-138-certification" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Author</label>
                  <input type="text" className="input" value={formData.author} onChange={e => setFormData({ ...formData, author: e.target.value })} placeholder="EcoMargin R&D Team" />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Summary / Excerpt</label>
                <textarea rows="2" className="input" value={formData.summary} onChange={e => setFormData({ ...formData, summary: e.target.value })} placeholder="Brief summary displayed on blog cards..." />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Full Article Content (HTML / Text)</label>
                <textarea rows="6" className="input" value={formData.content} onChange={e => setFormData({ ...formData, content: e.target.value })} placeholder="<p>Detailed technical content...</p>" />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Cover Image (Cloudinary Upload)</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input type="url" className="input" value={formData.coverImage} onChange={e => setFormData({ ...formData, coverImage: e.target.value })} placeholder="https://images.unsplash.com/..." />
                  <label htmlFor="blog-img-file" className="btn btn-outline" style={{ cursor: 'pointer', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <FiUploadCloud /> {uploading ? '...' : 'Upload'}
                  </label>
                  <input id="blog-img-file" type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
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
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setShowModal(false)} disabled={saving} className="btn btn-outline">Cancel</button>
                <button type="submit" disabled={saving || uploading} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {saving ? 'Saving...' : editingItem ? <><FiSave /> Save Changes</> : <><FiPlus /> Save Article</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
