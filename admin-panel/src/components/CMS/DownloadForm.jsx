// EcoMargin Admin Panel — Download & Certificate Form Modal
// src/components/CMS/DownloadForm.jsx

import React, { useState, useEffect } from 'react';
import { FiX, FiUploadCloud, FiSave, FiPlus, FiAlertCircle } from 'react-icons/fi';
import downloadsService from '../../services/downloadsService';

export default function DownloadForm({ initialData, onClose, onSuccess }) {
  const isEditing = Boolean(initialData && initialData.id);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Technical Datasheet',
    fileSize: '1.5 MB',
    fileUrl: '',
    displayOrder: 0,
    status: 'Active'
  });

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        category: initialData.category || 'Technical Datasheet',
        fileSize: initialData.fileSize || initialData.file_size || '1.5 MB',
        fileUrl: initialData.fileUrl || initialData.file_url || '',
        displayOrder: initialData.displayOrder ?? initialData.display_order ?? 0,
        status: initialData.status || 'Active'
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.includes('pdf') && !file.name.endsWith('.pdf')) {
      setError('Please select a valid PDF document.');
      return;
    }

    setUploading(true);
    setError(null);

    const sizeInMB = (file.size / (1024 * 1024)).toFixed(1) + ' MB';

    try {
      const data = new FormData();
      data.append('file', file);

      const res = await downloadsService.uploadPdf(data);
      const uploadedUrl = res?.data?.url || res?.url || res?.data?.secure_url;

      if (uploadedUrl) {
        setFormData(prev => ({
          ...prev,
          fileUrl: uploadedUrl,
          fileSize: sizeInMB
        }));
      } else {
        throw new Error('Upload succeeded but no URL was returned.');
      }
    } catch (err) {
      console.error('❌ Error uploading PDF to Cloudinary:', err);
      setError(err.message || 'Failed to upload PDF file to Cloudinary');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.name.trim()) {
      setError('Document Name is required.');
      return;
    }
    if (!formData.fileUrl.trim()) {
      setError('PDF URL or uploaded PDF file is required.');
      return;
    }

    setSaving(true);
    try {
      if (isEditing) {
        await downloadsService.updateDownload(initialData.id, formData);
      } else {
        await downloadsService.createDownload(formData);
      }
      onSuccess(isEditing ? 'Document updated successfully!' : 'Document added successfully!');
    } catch (err) {
      console.error('❌ Error saving document:', err);
      setError(err.message || err.data?.message || 'Failed to save document record');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div className="card" style={{ width: '100%', maxWidth: '550px', padding: '2rem', maxHeight: '90vh', overflowY: 'auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>
            {isEditing ? 'Edit Datasheet / Certificate' : 'Add Datasheet / Certificate'}
          </h3>
          <button type="button" onClick={onClose} className="btn btn-outline" style={{ border: 'none', padding: '0.4rem' }}>
            <FiX size={20} />
          </button>
        </div>

        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiAlertCircle /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Document Name *</label>
            <input
              type="text"
              name="name"
              required
              className="input"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. EcoCharge 120kW DC Charger Specification Sheet"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Category *</label>
              <select name="category" className="input" value={formData.category} onChange={handleChange}>
                <option value="Technical Datasheet">Technical Datasheet</option>
                <option value="Certificates">Certificates (ARAI / CE / ISO)</option>
                <option value="Installation Guides">Installation Guides</option>
                <option value="CAD & Wiring Diagrams">CAD & Wiring Diagrams</option>
                <option value="Brochures & Catalogs">Brochures & Catalogs</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>File Size</label>
              <input
                type="text"
                name="fileSize"
                className="input"
                value={formData.fileSize}
                onChange={handleChange}
                placeholder="e.g. 2.4 MB"
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Upload PDF to Cloudinary</label>
            <div style={{ border: '2px dashed var(--border)', borderRadius: 'var(--radius-md)', padding: '1rem', textAlign: 'center', background: 'rgba(255,255,255,0.02)' }}>
              <input
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
                id="pdf-upload-input"
                disabled={uploading}
              />
              <label htmlFor="pdf-upload-input" style={{ cursor: uploading ? 'not-allowed' : 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)' }}>
                <FiUploadCloud size={24} />
                <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>
                  {uploading ? 'Uploading PDF to Cloudinary...' : 'Click to select and upload PDF'}
                </span>
              </label>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>PDF File URL (Direct or Cloudinary) *</label>
            <input
              type="url"
              name="fileUrl"
              required
              className="input"
              value={formData.fileUrl}
              onChange={handleChange}
              placeholder="https://res.cloudinary.com/..."
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Display Order</label>
              <input
                type="number"
                name="displayOrder"
                className="input"
                value={formData.displayOrder}
                onChange={handleChange}
                placeholder="0"
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Status</label>
              <select name="status" className="input" value={formData.status} onChange={handleChange}>
                <option value="Active">Active</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
            <button type="button" onClick={onClose} disabled={saving} className="btn btn-outline">
              Cancel
            </button>
            <button type="submit" disabled={saving || uploading} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {saving ? 'Saving to Database...' : isEditing ? <><FiSave /> Save Changes</> : <><FiPlus /> Add Document</>}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
