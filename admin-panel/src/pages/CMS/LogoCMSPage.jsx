// EcoMargin Admin Panel — Website Logo Manager CMS Page (Two Tabs: File Upload & Cloudinary URL)
// src/pages/CMS/LogoCMSPage.jsx

import React, { useState, useEffect } from 'react';
import { 
  FiImage, FiUploadCloud, FiTrash2, FiSave, FiLink, 
  FiCheck, FiRefreshCw, FiAlertCircle, FiRotateCcw, FiEye, FiLayers
} from 'react-icons/fi';
import adminService from '../../services/adminService';

const LOGO_TYPES = [
  {
    key: 'header',
    title: 'Header Logo',
    description: 'Main corporate logo displayed on the top website navigation header bar.',
    recommended: 'PNG / SVG (Recommended height: 36px – 48px, transparent background)'
  },
  {
    key: 'footer',
    title: 'Footer Logo',
    description: 'Logo displayed in the website footer section against dark background.',
    recommended: 'PNG / SVG (Recommended height: 32px – 40px, high contrast)'
  },
  {
    key: 'white_logo',
    title: 'White Logo',
    description: 'Monochrome or all-white logo variant used for dark overlays and banners.',
    recommended: 'PNG / SVG (White / transparent vector logo)'
  },
  {
    key: 'favicon',
    title: 'Favicon Icon',
    description: 'Icon displayed on browser tabs, bookmarks, and mobile home screen shortcuts.',
    recommended: 'PNG / SVG / ICO (Square ratio 32x32px or 64x64px)'
  }
];

export default function LogoCMSPage() {
  const [logoMap, setLogoMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Tab State per logoType: 'upload' (Tab 1) vs 'url' (Tab 2)
  const [activeTab, setActiveTab] = useState({
    header: 'upload',
    footer: 'upload',
    white_logo: 'upload',
    favicon: 'upload'
  });

  // Tab 2 Form Inputs per logoType
  const [urlForms, setUrlForms] = useState({
    header: { imageUrl: '', publicId: '', previewUrl: '' },
    footer: { imageUrl: '', publicId: '', previewUrl: '' },
    white_logo: { imageUrl: '', publicId: '', previewUrl: '' },
    favicon: { imageUrl: '', publicId: '', previewUrl: '' }
  });

  const [uploadingState, setUploadingState] = useState({});
  const [savingState, setSavingState] = useState({});

  const fetchLogos = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await adminService.getLogos();
      let map = {};
      if (res && res.map) {
        map = res.map;
      } else if (res && res.headerLogo !== undefined) {
        map = {
          header: res.headerLogo,
          footer: res.footerLogo,
          white_logo: res.whiteLogo,
          favicon: res.favicon
        };
      } else if (res && res.data && Array.isArray(res.data)) {
        res.data.forEach(item => {
          if (item.logoType) map[item.logoType] = item;
        });
      }
      setLogoMap(map);

      // Populate Tab 2 inputs with current saved values
      const initialUrlForms = {};
      LOGO_TYPES.forEach(t => {
        const current = map[t.key] || {};
        initialUrlForms[t.key] = {
          imageUrl: current.imageUrl || '',
          publicId: current.publicId || '',
          previewUrl: current.imageUrl || ''
        };
      });
      setUrlForms(initialUrlForms);
    } catch (err) {
      console.error('❌ Error fetching logos:', err);
      setError(err.message || 'Failed to fetch website logos from database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogos();
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleTabChange = (key, tabName) => {
    setActiveTab(prev => ({ ...prev, [key]: tabName }));
  };

  // Helper for URL Form Change with Instant Preview
  const handleUrlInputChange = (typeKey, field, val) => {
    setUrlForms(prev => {
      const updated = {
        ...prev[typeKey],
        [field]: val
      };

      // Auto update preview if Cloudinary URL is pasted
      if (field === 'imageUrl') {
        if (val.trim() && val.includes('cloudinary.com')) {
          updated.previewUrl = val.trim();
        }
      }
      return {
        ...prev,
        [typeKey]: updated
      };
    });
  };

  // Tab 1: Upload File to Cloudinary
  const handleFileUpload = async (typeKey, e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml', 'image/webp'];
    if (!allowedTypes.includes(file.type) && !file.name.match(/\.(png|jpg|jpeg|svg|webp)$/i)) {
      setError('Please upload a valid image format (PNG, SVG, JPG, or WEBP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('File size exceeds the 5MB maximum allowed limit.');
      return;
    }

    setUploadingState(prev => ({ ...prev, [typeKey]: true }));
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('logoType', typeKey);
      formData.append('altText', `EcoMargin ${typeKey.replace('_', ' ')} Logo`);

      await adminService.uploadLogo(formData);
      showToast(`${typeKey.toUpperCase().replace('_', ' ')} logo uploaded successfully to Cloudinary!`);
      fetchLogos();
    } catch (err) {
      console.error(`❌ Error uploading ${typeKey} logo:`, err);
      setError(err.message || err.data?.message || `Failed to upload ${typeKey} logo to Cloudinary.`);
    } finally {
      setUploadingState(prev => ({ ...prev, [typeKey]: false }));
    }
  };

  // Tab 2: Save Existing Cloudinary Image URL
  const handleSaveUrl = async (typeKey) => {
    const form = urlForms[typeKey] || {};
    const url = (form.imageUrl || '').trim();
    const pid = (form.publicId || '').trim();

    if (!url) {
      setError('Cloudinary Image URL is required.');
      return;
    }

    if (!url.includes('cloudinary.com')) {
      setError('Invalid URL. Only official Cloudinary Image URLs (https://res.cloudinary.com/...) are accepted.');
      return;
    }

    setSavingState(prev => ({ ...prev, [typeKey]: true }));
    setError(null);

    try {
      await adminService.saveLogoUrl({
        logoType: typeKey,
        imageUrl: url,
        publicId: pid,
        altText: `EcoMargin ${typeKey.replace('_', ' ')} Logo`
      });
      showToast(`${typeKey.toUpperCase().replace('_', ' ')} Cloudinary URL saved successfully!`);
      fetchLogos();
    } catch (err) {
      console.error(`❌ Error saving ${typeKey} logo URL:`, err);
      setError(err.message || err.data?.message || 'Failed to save Cloudinary logo URL.');
    } finally {
      setSavingState(prev => ({ ...prev, [typeKey]: false }));
    }
  };

  // Tab 2: Preview Trigger
  const handlePreview = (typeKey) => {
    const form = urlForms[typeKey] || {};
    if (form.imageUrl && form.imageUrl.includes('cloudinary.com')) {
      setUrlForms(prev => ({
        ...prev,
        [typeKey]: {
          ...prev[typeKey],
          previewUrl: form.imageUrl.trim()
        }
      }));
      showToast('Live preview updated!');
    } else {
      setError('Enter a valid Cloudinary URL to preview.');
    }
  };

  // Tab 2: Reset Form Inputs
  const handleResetForm = (typeKey) => {
    const current = logoMap[typeKey] || {};
    setUrlForms(prev => ({
      ...prev,
      [typeKey]: {
        imageUrl: current.imageUrl || '',
        publicId: current.publicId || '',
        previewUrl: current.imageUrl || ''
      }
    }));
    showToast('Reset input fields to currently active logo.');
  };

  // Update Alt Text
  const handleSaveAltText = async (typeKey, id, currentAlt) => {
    if (!id) return;
    setSavingState(prev => ({ ...prev, [typeKey]: true }));
    try {
      await adminService.updateLogo(id, { altText: currentAlt });
      showToast('Logo alt text updated successfully!');
      fetchLogos();
    } catch (err) {
      console.error(`❌ Error updating ${typeKey} alt text:`, err);
      setError(err.message || 'Failed to update logo details.');
    } finally {
      setSavingState(prev => ({ ...prev, [typeKey]: false }));
    }
  };

  // Delete Logo
  const handleDeleteLogo = async (typeKey, id) => {
    if (!id) return;
    if (!window.confirm(`Are you sure you want to delete the ${typeKey.toUpperCase().replace('_', ' ')} logo? The website will automatically fall back to the default asset logo.`)) return;

    try {
      await adminService.deleteLogo(id);
      showToast(`${typeKey.toUpperCase().replace('_', ' ')} logo deleted! Website reset to default asset logo.`);
      fetchLogos();
    } catch (err) {
      console.error(`❌ Error deleting ${typeKey} logo:`, err);
      setError(err.message || 'Failed to delete logo.');
    }
  };

  const handleAltTextChange = (typeKey, val) => {
    setLogoMap(prev => ({
      ...prev,
      [typeKey]: {
        ...prev[typeKey],
        altText: val
      }
    }));
  };

  return (
    <div style={{ padding: '1.5rem' }}>
      
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiImage style={{ color: 'var(--primary)' }} /> Logo Manager CMS
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Manage official branding assets via File Upload or Direct Cloudinary Image URL with 100% instant website synchronization.
          </p>
        </div>
        <button onClick={fetchLogos} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FiRefreshCw className={loading ? 'spin' : ''} /> Refresh Logos
        </button>
      </div>

      {/* Success Toast */}
      {toastMessage && (
        <div style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--primary)', border: '1px solid var(--primary)', padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
          <FiCheck /> {toastMessage}
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', border: '1px solid var(--danger)', padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
          <FiAlertCircle /> {error}
        </div>
      )}

      {/* 4 Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem' }}>
        {LOGO_TYPES.map((type) => {
          const item = logoMap[type.key] || {};
          const isUploading = Boolean(uploadingState[type.key]);
          const isSaving = Boolean(savingState[type.key]);
          const hasLogo = Boolean(item && item.imageUrl);
          const currentTab = activeTab[type.key] || 'upload';
          const urlForm = urlForms[type.key] || { imageUrl: '', publicId: '', previewUrl: '' };

          // Preview Source logic
          const activePreviewUrl = currentTab === 'url' && urlForm.previewUrl ? urlForm.previewUrl : item.imageUrl;

          return (
            <div key={type.key} className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                {/* Card Header Title */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>{type.title}</h3>
                  <span style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', borderRadius: '4px', background: hasLogo ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)', color: hasLogo ? 'var(--primary)' : 'var(--danger)', fontWeight: 600 }}>
                    {hasLogo ? 'Active Cloudinary' : 'Default Asset Fallback'}
                  </span>
                </div>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '1rem', lineHeight: 1.4 }}>
                  {type.description}
                </p>

                {/* Preview Box */}
                <div style={{ 
                  height: '130px', 
                  borderRadius: 'var(--radius-md)', 
                  border: '1px dashed var(--border)', 
                  background: type.key === 'footer' || type.key === 'white_logo' ? '#0f0f1a' : '#ffffff',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  padding: '1rem',
                  marginBottom: '1rem',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {activePreviewUrl ? (
                    <img 
                      src={activePreviewUrl} 
                      alt={item.altText || type.title} 
                      style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                      <FiLayers size={28} style={{ marginBottom: '0.35rem', opacity: 0.5 }} />
                      <div>No custom logo uploaded</div>
                      <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>Using built-in asset logo</div>
                    </div>
                  )}
                </div>

                {/* Specifications note */}
                <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  💡 {type.recommended}
                </div>

                {/* ── Two Tabs Selector Header ── */}
                <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', marginBottom: '1rem' }}>
                  <button
                    type="button"
                    onClick={() => handleTabChange(type.key, 'upload')}
                    style={{
                      flex: 1,
                      padding: '0.5rem 0.75rem',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      background: 'transparent',
                      border: 'none',
                      borderBottom: currentTab === 'upload' ? '2px solid var(--primary)' : '2px solid transparent',
                      color: currentTab === 'upload' ? 'var(--primary)' : 'var(--text-muted)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.35rem'
                    }}
                  >
                    <FiUploadCloud /> Upload File
                  </button>

                  <button
                    type="button"
                    onClick={() => handleTabChange(type.key, 'url')}
                    style={{
                      flex: 1,
                      padding: '0.5rem 0.75rem',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      background: 'transparent',
                      border: 'none',
                      borderBottom: currentTab === 'url' ? '2px solid var(--primary)' : '2px solid transparent',
                      color: currentTab === 'url' ? 'var(--primary)' : 'var(--text-muted)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.35rem'
                    }}
                  >
                    <FiLink /> Image URL
                  </button>
                </div>

                {/* Tab 1 Body: Upload File */}
                {currentTab === 'upload' && (
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ border: '2px dashed var(--border)', borderRadius: 'var(--radius-md)', padding: '1rem', textAlign: 'center', background: 'rgba(255,255,255,0.02)' }}>
                      <input
                        type="file"
                        accept="image/png,image/svg+xml,image/jpeg,image/webp"
                        onChange={(e) => handleFileUpload(type.key, e)}
                        id={`logo-file-input-${type.key}`}
                        style={{ display: 'none' }}
                        disabled={isUploading}
                      />
                      <label 
                        htmlFor={`logo-file-input-${type.key}`}
                        style={{ cursor: isUploading ? 'not-allowed' : 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 600 }}
                      >
                        <FiUploadCloud size={24} />
                        <span>{isUploading ? 'Uploading to Cloudinary...' : hasLogo ? 'Click to Select and Replace File' : 'Click to Select Image File (PNG, SVG, JPG, WEBP)'}</span>
                        <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)', fontWeight: 400 }}>Max size: 5MB</span>
                      </label>
                    </div>
                  </div>
                )}

                {/* Tab 2 Body: Use Existing Cloudinary Image URL */}
                {currentTab === 'url' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.25rem' }}>Cloudinary Image URL *</label>
                      <input
                        type="url"
                        className="input"
                        value={urlForm.imageUrl}
                        onChange={(e) => handleUrlInputChange(type.key, 'imageUrl', e.target.value)}
                        placeholder="https://res.cloudinary.com/demo/image/upload/v175425/logo.png"
                        style={{ fontSize: '0.8rem', padding: '0.45rem 0.65rem' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                        Public ID <span style={{ fontWeight: 400, color: 'var(--text-muted)' }}>(Optional - Auto-extracted if blank)</span>
                      </label>
                      <input
                        type="text"
                        className="input"
                        value={urlForm.publicId}
                        onChange={(e) => handleUrlInputChange(type.key, 'publicId', e.target.value)}
                        placeholder="e.g. ecomargin_logos/header_logo"
                        style={{ fontSize: '0.8rem', padding: '0.45rem 0.65rem' }}
                      />
                    </div>
                  </div>
                )}

                {/* Alt Text Input */}
                {hasLogo && (
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.25rem' }}>Alt Text (SEO & Accessibility)</label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <input
                        type="text"
                        className="input"
                        value={item.altText || ''}
                        onChange={(e) => handleAltTextChange(type.key, e.target.value)}
                        placeholder="e.g. EcoMargin Corporate Logo"
                        style={{ fontSize: '0.8rem', padding: '0.4rem 0.6rem' }}
                      />
                      <button 
                        type="button"
                        onClick={() => handleSaveAltText(type.key, item.id, item.altText)} 
                        disabled={isSaving}
                        className="btn btn-outline"
                        style={{ padding: '0.4rem 0.6rem', flexShrink: 0 }}
                        title="Save Alt Text"
                      >
                        <FiSave />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Action Buttons */}
              <div style={{ display: 'flex', gap: '0.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border)', flexWrap: 'wrap' }}>
                {currentTab === 'url' ? (
                  <>
                    <button 
                      type="button" 
                      onClick={() => handlePreview(type.key)} 
                      className="btn btn-outline" 
                      style={{ fontSize: '0.8rem', padding: '0.5rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                      title="Preview Image"
                    >
                      <FiEye /> Preview
                    </button>
                    <button 
                      type="button" 
                      onClick={() => handleSaveUrl(type.key)} 
                      disabled={isSaving} 
                      className="btn btn-primary" 
                      style={{ flex: 1, fontSize: '0.8rem', padding: '0.5rem 0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}
                    >
                      <FiSave /> {isSaving ? 'Saving...' : 'Save URL'}
                    </button>
                    <button 
                      type="button" 
                      onClick={() => handleResetForm(type.key)} 
                      className="btn btn-outline" 
                      style={{ fontSize: '0.8rem', padding: '0.5rem 0.65rem' }}
                      title="Reset Inputs"
                    >
                      <FiRotateCcw />
                    </button>
                  </>
                ) : (
                  <div style={{ flex: 1 }}>
                    <label 
                      htmlFor={`logo-file-input-${type.key}`}
                      className="btn btn-primary"
                      style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', cursor: isUploading ? 'not-allowed' : 'pointer', padding: '0.5rem 0.75rem', fontSize: '0.8rem' }}
                    >
                      <FiUploadCloud /> {isUploading ? 'Uploading...' : hasLogo ? 'Replace File' : 'Upload File'}
                    </label>
                  </div>
                )}

                {hasLogo && (
                  <button 
                    type="button"
                    onClick={() => handleDeleteLogo(type.key, item.id)}
                    className="btn btn-outline"
                    style={{ color: 'var(--danger)', borderColor: 'var(--danger)', padding: '0.5rem 0.75rem', fontSize: '0.8rem' }}
                    title="Delete Logo"
                  >
                    <FiTrash2 />
                  </button>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
