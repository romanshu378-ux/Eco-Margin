// EcoMargin Admin Panel — Download & Certificate Form Modal
// src/components/CMS/DownloadForm.jsx

import React, { useState, useEffect } from 'react';
import { FiX, FiUploadCloud, FiSave, FiPlus, FiAlertCircle, FiImage, FiFileText } from 'react-icons/fi';
import downloadsService from '../../services/downloadsService';
import adminService from '../../services/adminService';

export default function DownloadForm({ initialData, onClose, onSuccess }) {
  const isEditing = Boolean(initialData && initialData.id);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Technical Datasheet',
    description: '',
    fileSize: '1.5 MB',
    fileUrl: '',
    iconUrl: '',
    displayOrder: 0,
    status: 'Active'
  });

  const [pdfUploading, setPdfUploading] = useState(false);
  const [iconUploading, setIconUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || initialData.title || '',
        category: initialData.category || 'Technical Datasheet',
        description: initialData.description || '',
        fileSize: initialData.fileSize || initialData.file_size || '1.5 MB',
        fileUrl: initialData.fileUrl || initialData.file_url || initialData.pdfUrl || '',
        iconUrl: initialData.iconUrl || initialData.icon_url || '',
        displayOrder: initialData.displayOrder ?? initialData.display_order ?? 0,
        status: initialData.status || 'Active'
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Upload PDF File to Cloudinary
  const handlePdfUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.includes('pdf') && !file.name.endsWith('.pdf')) {
      setError('Please select a valid PDF document.');
      return;
    }

    setPdfUploading(true);
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
      setPdfUploading(false);
    }
  };

  // Upload Logo/Icon (Image) to Cloudinary
  const handleIconUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/png', 'image/svg+xml', 'image/webp'];
    if (!allowedTypes.includes(file.type) && !file.name.match(/\.(jpg|jpeg|png|svg|webp)$/i)) {
      setError('Please select a valid image file (JPG, PNG, SVG, or WEBP).');
      return;
    }

    setIconUploading(true);
    setError(null);

    try {
      const data = new FormData();
      data.append('image', file);

      const res = await adminService.uploadMedia(data);
      const uploadedUrl = res?.data?.url || res?.url || res?.data?.secure_url;

      if (uploadedUrl) {
        setFormData(prev => ({
          ...prev,
          iconUrl: uploadedUrl
        }));
      } else {
        throw new Error('Upload succeeded but no image URL was returned.');
      }
    } catch (err) {
      console.error('❌ Error uploading icon image to Cloudinary:', err);
      setError(err.message || 'Failed to upload icon image to Cloudinary');
    } finally {
      setIconUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.name.trim()) {
      setError('Document Title / Name is required.');
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
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.75)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div className="card" style={{ width: '100%', maxWidth: '600px', padding: '2rem', maxHeight: '90vh', overflowY: 'auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>
            {isEditing ? 'Edit Technical Datasheet / Certificate' : 'Add Technical Datasheet / Certificate'}
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
          
          {/* Title */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Document Title / Name *</label>
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

          {/* Category & File Size */}
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

          {/* Description */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Short Description</label>
            <input
              type="text"
              name="description"
              className="input"
              value={formData.description}
              onChange={handleChange}
              placeholder="e.g. Detailed wiring specs and CAD dimensions for 120kW CCS2"
            />
          </div>

          {/* Logo / Icon Upload (Cloudinary) */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>
              Document Logo / Icon (JPG, PNG, SVG, WEBP)
            </label>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ flex: 1, border: '2px dashed var(--border)', borderRadius: 'var(--radius-md)', padding: '0.85rem', textAlign: 'center', background: 'rgba(255,255,255,0.02)' }}>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/svg+xml,image/webp"
                  onChange={handleIconUpload}
                  style={{ display: 'none' }}
                  id="icon-upload-input"
                  disabled={iconUploading}
                />
                <label htmlFor="icon-upload-input" style={{ cursor: iconUploading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 600 }}>
                  <FiImage size={18} />
                  {iconUploading ? 'Uploading Logo...' : 'Upload Logo / Icon Image'}
                </label>
              </div>

              {formData.iconUrl && (
                <div style={{ width: '48px', height: '48px', borderRadius: '8px', border: '1px solid var(--border)', padding: '4px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <img src={formData.iconUrl} alt="Icon Preview" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                </div>
              )}
            </div>
            {formData.iconUrl && (
              <input
                type="text"
                name="iconUrl"
                className="input"
                value={formData.iconUrl}
                onChange={handleChange}
                placeholder="Logo URL"
                style={{ marginTop: '0.5rem', fontSize: '0.75rem' }}
              />
            )}
          </div>

          {/* PDF File Upload (Cloudinary) */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Upload PDF Document to Cloudinary *</label>
            <div style={{ border: '2px dashed var(--border)', borderRadius: 'var(--radius-md)', padding: '1rem', textAlign: 'center', background: 'rgba(255,255,255,0.02)' }}>
              <input
                type="file"
                accept=".pdf,application/pdf"
                onChange={handlePdfUpload}
                style={{ display: 'none' }}
                id="pdf-upload-input"
                disabled={pdfUploading}
              />
              <label htmlFor="pdf-upload-input" style={{ cursor: pdfUploading ? 'not-allowed' : 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)' }}>
                <FiUploadCloud size={24} />
                <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>
                  {pdfUploading ? 'Uploading PDF to Cloudinary...' : 'Click to select and upload PDF file'}
                </span>
              </label>
            </div>
          </div>

          {/* PDF URL Input */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>PDF Document URL *</label>
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

          {/* Display Order & Status */}
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
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Status *</label>
              <select name="status" className="input" value={formData.status} onChange={handleChange}>
                <option value="Active">Active (Visible on Frontend)</option>
                <option value="Draft">Draft (Hidden)</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
            <button type="button" onClick={onClose} disabled={saving} className="btn btn-outline">
              Cancel
            </button>
            <button type="submit" disabled={saving || pdfUploading || iconUploading} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {saving ? 'Saving to MySQL Database...' : isEditing ? <><FiSave /> Save Changes</> : <><FiPlus /> Add Document</>}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
