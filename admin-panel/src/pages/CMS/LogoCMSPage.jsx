// EcoMargin Admin Panel — Website Logo Manager CMS Page
// src/pages/CMS/LogoCMSPage.jsx

import React, { useState, useEffect } from 'react';
import { 
  FiImage, FiUploadCloud, FiTrash2, FiSave, 
  FiCheck, FiRefreshCw, FiAlertCircle, FiGlobe, FiLayers
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
      } else if (res && res.data && Array.isArray(res.data)) {
        res.data.forEach(item => {
          if (item.logoType) map[item.logoType] = item;
        });
      }
      setLogoMap(map);
    } catch (err) {
      console.error('❌ Error fetching logos:', err);
      setError(err.message || 'Failed to fetch logos from database.');
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

  // Upload or Replace Logo Image to Cloudinary
  const handleFileUpload = async (typeKey, e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate format (PNG, SVG, JPG, WEBP)
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml', 'image/webp'];
    if (!allowedTypes.includes(file.type) && !file.name.match(/\.(png|jpg|jpeg|svg|webp)$/i)) {
      setError('Please upload a valid image format (PNG, SVG, JPG, or WEBP).');
      return;
    }

    // Validate max size 5MB
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

      const res = await adminService.uploadLogo(formData);
      showToast(`${typeKey.toUpperCase().replace('_', ' ')} logo uploaded successfully!`);
      fetchLogos();
    } catch (err) {
      console.error(`❌ Error uploading ${typeKey} logo:`, err);
      setError(err.message || `Failed to upload ${typeKey} logo to Cloudinary.`);
    } finally {
      setUploadingState(prev => ({ ...prev, [typeKey]: false }));
    }
  };

  // Update Alt Text for Logo
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

  // Delete Logo (Removes from Cloudinary & Database)
  const handleDeleteLogo = async (typeKey, id) => {
    if (!id) return;
    if (!window.confirm(`Are you sure you want to delete the ${typeKey.toUpperCase()} logo? The website will automatically fall back to the default asset logo.`)) return;

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
            Manage official branding assets (Header, Footer, White Logo & Favicon) with instant Cloudinary synchronization.
          </p>
        </div>
        <button onClick={fetchLogos} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FiRefreshCw className={loading ? 'spin' : ''} /> Refresh Logos
        </button>
      </div>

      {/* Toast Notification */}
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
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
        {LOGO_TYPES.map((type) => {
          const item = logoMap[type.key] || {};
          const isUploading = Boolean(uploadingState[type.key]);
          const isSaving = Boolean(savingState[type.key]);
          const hasLogo = Boolean(item && item.imageUrl);

          return (
            <div key={type.key} className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                {/* Card Title */}
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
                  {hasLogo ? (
                    <img 
                      src={item.imageUrl} 
                      alt={item.altText || type.title} 
                      style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} 
                    />
                  ) : (
                    <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                      <FiLayers size={28} style={{ marginBottom: '0.35rem', opacity: 0.5 }} />
                      <div>No custom logo uploaded</div>
                      <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>Using built-in asset logo</div>
                    </div>
                  )}
                </div>

                {/* Specs recommendation */}
                <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  💡 {type.recommended}
                </div>

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

              {/* Bottom Actions */}
              <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                <div style={{ flex: 1 }}>
                  <input
                    type="file"
                    accept="image/png,image/svg+xml,image/jpeg,image/webp"
                    onChange={(e) => handleFileUpload(type.key, e)}
                    id={`logo-input-${type.key}`}
                    style={{ display: 'none' }}
                    disabled={isUploading}
                  />
                  <label 
                    htmlFor={`logo-input-${type.key}`}
                    className="btn btn-primary"
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', cursor: isUploading ? 'not-allowed' : 'pointer', padding: '0.5rem 0.75rem', fontSize: '0.8rem' }}
                  >
                    <FiUploadCloud /> {isUploading ? 'Uploading...' : hasLogo ? 'Replace Logo' : 'Upload Logo'}
                  </label>
                </div>

                {hasLogo && (
                  <button 
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
