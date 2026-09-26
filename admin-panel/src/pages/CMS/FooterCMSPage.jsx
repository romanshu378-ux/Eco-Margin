// EcoMargin Admin Panel — Footer & Contact CMS Management
// src/pages/CMS/FooterCMSPage.jsx
import React, { useState, useEffect } from 'react';
import { 
  FiSave, FiCheck, FiPhone, FiMail, FiMapPin, FiGlobe, 
  FiAlertCircle, FiExternalLink, FiShare2, FiClock
} from 'react-icons/fi';
import { 
  FaYoutube, FaInstagram, FaFacebook, FaLinkedin, FaTwitter 
} from 'react-icons/fa6';
import { adminService } from '../../services/adminService';

export default function FooterCMSPage() {
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [footer, setFooter] = useState({
    companyName: "EcoMargin LLP",
    address: "NH-11, iStart Nest, Govt Engineering College, Bharatpur, Rajasthan - 321001",
    phone: "+91-8302313065",
    altPhone: "+91-90791 39959",
    email: "sales@ecomargin.com",
    supportEmail: "support@ecomargin.in",
    whatsapp: "+918302313065",
    googleMapsEmbedUrl: "https://maps.google.com/?q=Government+Engineering+College+Bharatpur",
    businessHours: "Monday – Saturday: 09:00 AM – 07:00 PM IST",
    youtube: "https://youtube.com/@ecomargin",
    instagram: "https://instagram.com/ecomargin",
    facebook: "https://facebook.com/ecomargin",
    linkedin: "https://linkedin.com/company/ecomargin",
    twitter: "https://twitter.com/ecomargin",
    copyright: "© 2026 EcoMargin LLP. All Rights Reserved."
  });

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const res = await adminService.getFooterCMS();
        if (res && res.data) {
          setFooter(prev => ({ 
            ...prev, 
            ...res.data,
            youtube: res.data.youtube || prev.youtube || '',
            instagram: res.data.instagram || prev.instagram || '',
            facebook: res.data.facebook || prev.facebook || '',
            linkedin: res.data.linkedin || prev.linkedin || '',
            twitter: res.data.twitter || prev.twitter || '',
          }));
        }
      } catch (err) {
        console.warn('Initial Footer CMS load notice:', err.message);
      }
    };
    fetchFooter();
  }, []);

  const validateUrl = (urlStr, fieldName) => {
    if (!urlStr || urlStr.trim() === '') return true;
    try {
      const parsed = new URL(urlStr.trim());
      if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
        return false;
      }
      return true;
    } catch {
      return false;
    }
  };

  const validateEmail = (emailStr) => {
    if (!emailStr || emailStr.trim() === '') return true;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr.trim());
  };

  const handleSave = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setLoading(true);
    setError(null);

    // Client-side validations
    const urlValidations = [
      { key: 'youtube', label: 'YouTube URL' },
      { key: 'instagram', label: 'Instagram URL' },
      { key: 'facebook', label: 'Facebook URL' },
      { key: 'linkedin', label: 'LinkedIn URL' },
      { key: 'twitter', label: 'Twitter URL' },
      { key: 'googleMapsEmbedUrl', label: 'Google Maps Embed URL' }
    ];

    for (const item of urlValidations) {
      if (footer[item.key] && !validateUrl(footer[item.key], item.label)) {
        setError(`Please enter a valid URL (must start with http:// or https://) for ${item.label}`);
        setLoading(false);
        return;
      }
    }

    if (footer.email && !validateEmail(footer.email)) {
      setError('Please enter a valid Sales Email address.');
      setLoading(false);
      return;
    }

    if (footer.supportEmail && !validateEmail(footer.supportEmail)) {
      setError('Please enter a valid Support Email address.');
      setLoading(false);
      return;
    }

    try {
      const res = await adminService.updateFooterCMS(footer);
      if (res && (res.success === true || res.data)) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3500);
      } else {
        throw new Error(res?.message || 'Failed to save Footer & Contact CMS');
      }
    } catch (err) {
      console.error('❌ Error saving Footer CMS:', err);
      setError(err.message || err.data?.message || 'Error saving changes to database');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '1.5rem', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>Footer & Contact CMS Manager</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            Manage Support/Sales Email, Phone Numbers, Address, and Official Social Media Links across the Public Site
          </p>
        </div>
        <button 
          onClick={handleSave} 
          disabled={loading} 
          className="btn btn-primary" 
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: '170px', justifyContent: 'center' }}
        >
          {loading ? (
            <>Saving...</>
          ) : saved ? (
            <><FiCheck /> Saved Successfully</>
          ) : (
            <><FiSave /> Save Changes</>
          )}
        </button>
      </div>

      {error && (
        <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger, #ef4444)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
          <FiAlertCircle /> {error}
        </div>
      )}

      {saved && (
        <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
          <FiCheck /> Contact information &amp; social media links updated successfully! Public /enquiry and footer pages will reflect the new values immediately.
        </div>
      )}

      <form onSubmit={handleSave} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '2rem', alignItems: 'start' }}>
        
        {/* Column 1: Contact Information */}
        <div className="card" style={{ padding: '1.75rem', background: 'var(--bg-card, #ffffff)', borderRadius: 'var(--radius-lg, 12px)', border: '1px solid var(--border)' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiMapPin /> Corporate Address &amp; Contact Info
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Registered Company Name
              </label>
              <input 
                type="text" 
                className="input" 
                value={footer.companyName || ''} 
                onChange={(e) => setFooter({ ...footer, companyName: e.target.value })} 
                placeholder="e.g. EcoMargin LLP"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Factory &amp; Corporate Office Address
              </label>
              <textarea 
                rows="3" 
                className="input" 
                value={footer.address || ''} 
                onChange={(e) => setFooter({ ...footer, address: e.target.value })} 
                placeholder="Full address of headquarters / factory..."
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                  Primary Phone Number *
                </label>
                <input 
                  type="text" 
                  className="input" 
                  value={footer.phone || ''} 
                  onChange={(e) => setFooter({ ...footer, phone: e.target.value })} 
                  placeholder="+91-8302313065"
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                  Alt / Support Phone
                </label>
                <input 
                  type="text" 
                  className="input" 
                  value={footer.altPhone || ''} 
                  onChange={(e) => setFooter({ ...footer, altPhone: e.target.value })} 
                  placeholder="+91-90791 39959"
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                  Sales Email *
                </label>
                <input 
                  type="email" 
                  className="input" 
                  value={footer.email || ''} 
                  onChange={(e) => setFooter({ ...footer, email: e.target.value })} 
                  placeholder="sales@ecomargin.com"
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                  Support Email *
                </label>
                <input 
                  type="email" 
                  className="input" 
                  value={footer.supportEmail || ''} 
                  onChange={(e) => setFooter({ ...footer, supportEmail: e.target.value })} 
                  placeholder="support@ecomargin.in"
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                WhatsApp Desk Number (with country code)
              </label>
              <input 
                type="text" 
                className="input" 
                value={footer.whatsapp || ''} 
                onChange={(e) => setFooter({ ...footer, whatsapp: e.target.value })} 
                placeholder="+918302313065"
              />
            </div>
          </div>
        </div>

        {/* Column 2: Social Media & Hours */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Social Media Channels */}
          <div className="card" style={{ padding: '1.75rem', background: 'var(--bg-card, #ffffff)', borderRadius: 'var(--radius-lg, 12px)', border: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FiShare2 /> Official Social Media Links
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '1.25rem' }}>
              These URLs are fetched dynamically by the public /enquiry page and website footer.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
              
              {/* YouTube */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#dc2626' }}>
                    <FaYoutube style={{ fontSize: '1rem' }} /> YouTube Channel URL
                  </label>
                  {footer.youtube && (
                    <a href={footer.youtube} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.75rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.2rem', textDecoration: 'none' }}>
                      Test Link <FiExternalLink />
                    </a>
                  )}
                </div>
                <input 
                  type="url" 
                  className="input" 
                  value={footer.youtube || ''} 
                  onChange={(e) => setFooter({ ...footer, youtube: e.target.value })} 
                  placeholder="https://youtube.com/@ecomargin"
                />
              </div>

              {/* Instagram */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#e1306c' }}>
                    <FaInstagram style={{ fontSize: '1rem' }} /> Instagram Profile URL
                  </label>
                  {footer.instagram && (
                    <a href={footer.instagram} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.75rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.2rem', textDecoration: 'none' }}>
                      Test Link <FiExternalLink />
                    </a>
                  )}
                </div>
                <input 
                  type="url" 
                  className="input" 
                  value={footer.instagram || ''} 
                  onChange={(e) => setFooter({ ...footer, instagram: e.target.value })} 
                  placeholder="https://instagram.com/ecomargin"
                />
              </div>

              {/* Facebook */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#1877f2' }}>
                    <FaFacebook style={{ fontSize: '1rem' }} /> Facebook Page URL
                  </label>
                  {footer.facebook && (
                    <a href={footer.facebook} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.75rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.2rem', textDecoration: 'none' }}>
                      Test Link <FiExternalLink />
                    </a>
                  )}
                </div>
                <input 
                  type="url" 
                  className="input" 
                  value={footer.facebook || ''} 
                  onChange={(e) => setFooter({ ...footer, facebook: e.target.value })} 
                  placeholder="https://facebook.com/ecomargin"
                />
              </div>

              {/* LinkedIn */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#0a66c2' }}>
                    <FaLinkedin style={{ fontSize: '1rem' }} /> LinkedIn Company URL
                  </label>
                  {footer.linkedin && (
                    <a href={footer.linkedin} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.75rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.2rem', textDecoration: 'none' }}>
                      Test Link <FiExternalLink />
                    </a>
                  )}
                </div>
                <input 
                  type="url" 
                  className="input" 
                  value={footer.linkedin || ''} 
                  onChange={(e) => setFooter({ ...footer, linkedin: e.target.value })} 
                  placeholder="https://linkedin.com/company/ecomargin"
                />
              </div>

              {/* Twitter / X (Optional) */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <FaTwitter style={{ fontSize: '0.9rem' }} /> Twitter / X Profile URL
                  </label>
                  {footer.twitter && (
                    <a href={footer.twitter} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.75rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.2rem', textDecoration: 'none' }}>
                      Test Link <FiExternalLink />
                    </a>
                  )}
                </div>
                <input 
                  type="url" 
                  className="input" 
                  value={footer.twitter || ''} 
                  onChange={(e) => setFooter({ ...footer, twitter: e.target.value })} 
                  placeholder="https://twitter.com/ecomargin"
                />
              </div>

            </div>
          </div>

          {/* Maps, Hours & Legal */}
          <div className="card" style={{ padding: '1.75rem', background: 'var(--bg-card, #ffffff)', borderRadius: 'var(--radius-lg, 12px)', border: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FiGlobe /> Maps, Hours &amp; Legal Notice
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                  Business &amp; Support Hours
                </label>
                <input 
                  type="text" 
                  className="input" 
                  value={footer.businessHours || ''} 
                  onChange={(e) => setFooter({ ...footer, businessHours: e.target.value })} 
                  placeholder="Monday – Saturday: 09:00 AM – 07:00 PM IST"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                  Google Maps Embed / Location URL
                </label>
                <input 
                  type="text" 
                  className="input" 
                  value={footer.googleMapsEmbedUrl || ''} 
                  onChange={(e) => setFooter({ ...footer, googleMapsEmbedUrl: e.target.value })} 
                  placeholder="https://maps.google.com/..."
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                  Copyright Notice
                </label>
                <input 
                  type="text" 
                  className="input" 
                  value={footer.copyright || ''} 
                  onChange={(e) => setFooter({ ...footer, copyright: e.target.value })} 
                  placeholder="© 2026 EcoMargin LLP. All Rights Reserved."
                />
              </div>
            </div>
          </div>

        </div>

      </form>
    </div>
  );
}
