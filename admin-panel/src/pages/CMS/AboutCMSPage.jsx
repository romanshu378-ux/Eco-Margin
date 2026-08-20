// EcoMargin Admin Panel — About Page CMS Management
// src/pages/CMS/AboutCMSPage.jsx
import React, { useState, useEffect } from 'react';
import { FiSave, FiCheck, FiLayers, FiAlertCircle, FiImage, FiLink, FiTarget, FiCompass, FiShield } from 'react-icons/fi';
import { adminService } from '../../services/adminService';

export default function AboutCMSPage() {
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imgPreviewError, setImgPreviewError] = useState(false);

  const [about, setAbout] = useState({
    sectionEyebrow: "ABOUT ECOMARGIN",
    title: "Powering the Future of Electric Mobility",
    description: "EcoMargin LLP is a leading Indian EV charging infrastructure and charger manufacturing company committed to reliable hardware, smart OCPP software, and green mobility.",
    secondaryDescription: "From commercial AC chargers to ultra-fast DC charging hubs, EcoMargin provides end-to-end EPC installation, OCPP software management, and 24/7 AMC maintenance across India.",
    imageUrl: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80",
    imageAlt: "EcoMargin EV Charging Station Infrastructure",
    primaryButtonText: "Explore Our Solutions",
    primaryButtonUrl: "/solutions",
    secondaryButtonText: "Contact Us",
    secondaryButtonUrl: "/contact",
    missionTitle: "Our Mission",
    missionDescription: "Engineering indigenous, high-uptime commercial EV chargers tailored for harsh grid conditions and heavy fleet demands.",
    visionTitle: "Our Vision",
    visionDescription: "To accelerate clean electric mobility adoption across highways, workplaces, and commercial hubs in India.",
    valuesTitle: "Our Core Values",
    valuesDescription: "Engineering excellence, safety compliance, 99.8% network uptime, and customer-centric technical support.",
    vision: "To accelerate global e-mobility adoption by manufacturing reliable, high-uptime EV charging hardware.",
    mission: "Engineering 100% indigenous Indian-manufactured commercial chargers tailored for harsh grid conditions.",
    story: "Founded in 2020, EcoMargin has grown into a leading OEM charger manufacturer and EPC contractor operating a certified facility in India.",
    directorMessage: "India's EV revolution requires ultra-fast, robust charging stations backed by 24/7 NOC monitoring."
  });

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await adminService.getAboutCMS();
        const payload = res?.data || (res?.title || res?.vision ? res : null);
        if (payload) {
          setAbout(prev => ({ ...prev, ...payload }));
        }
      } catch (err) {
        console.warn('Initial About CMS load notice:', err.message);
      }
    };
    fetchAbout();
  }, []);

  const handleSave = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await adminService.updateAboutCMS(about);
      if (res && (res.success === true || res.data)) {
        if (res.data) {
          setAbout(prev => ({ ...prev, ...res.data }));
        }
        setSaved(true);
        setTimeout(() => setSaved(false), 3500);
      } else {
        throw new Error(res?.message || 'Failed to save About CMS');
      }
    } catch (err) {
      console.error('❌ Error saving About CMS:', err);
      setError(err.message || err.data?.message || 'Error saving changes to database');
    } finally {
      setLoading(false);
    }
  };

  const currentImageUrl = about.imageUrl || about.image_url || '';

  return (
    <div style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiLayers style={{ color: 'var(--primary)' }} /> About Section &amp; Corporate CMS Manager
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Manage Public Website About Hero Banner, Main Heading, Descriptions, CTA Buttons, Image, and Mission/Vision/Values
          </p>
        </div>
        <button onClick={handleSave} disabled={loading} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {loading ? 'Saving to Database...' : saved ? <><FiCheck /> Saved Successfully</> : <><FiSave /> Save Changes</>}
        </button>
      </div>

      {error && (
        <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FiAlertCircle /> {error}
        </div>
      )}

      <form onSubmit={handleSave} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        
        {/* Main Content Editors */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Main About Section Banner */}
          <div className="card" style={{ padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FiLayers /> Main About Section Content
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Section Eyebrow Badge</label>
                <input 
                  type="text" className="input" 
                  value={about.sectionEyebrow || ''} 
                  onChange={(e) => setAbout({ ...about, sectionEyebrow: e.target.value })} 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Main Title Heading</label>
                <input 
                  type="text" className="input" 
                  value={about.title || ''} 
                  onChange={(e) => setAbout({ ...about, title: e.target.value })} 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Primary Introduction Description</label>
                <textarea 
                  rows="3" className="input" 
                  value={about.description || ''} 
                  onChange={(e) => setAbout({ ...about, description: e.target.value })} 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Secondary Introduction Description</label>
                <textarea 
                  rows="3" className="input" 
                  value={about.secondaryDescription || ''} 
                  onChange={(e) => setAbout({ ...about, secondaryDescription: e.target.value })} 
                />
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="card" style={{ padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FiLink /> Call to Action (CTA) Buttons
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Primary Button Text</label>
                <input type="text" className="input" value={about.primaryButtonText || ''} onChange={(e) => setAbout({ ...about, primaryButtonText: e.target.value })} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Primary Button URL</label>
                <input type="text" className="input" value={about.primaryButtonUrl || ''} onChange={(e) => setAbout({ ...about, primaryButtonUrl: e.target.value })} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Secondary Button Text</label>
                <input type="text" className="input" value={about.secondaryButtonText || ''} onChange={(e) => setAbout({ ...about, secondaryButtonText: e.target.value })} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Secondary Button URL</label>
                <input type="text" className="input" value={about.secondaryButtonUrl || ''} onChange={(e) => setAbout({ ...about, secondaryButtonUrl: e.target.value })} />
              </div>
            </div>
          </div>

          {/* Mission, Vision & Core Values */}
          <div className="card" style={{ padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FiTarget /> Mission, Vision &amp; Core Values
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Mission Title</label>
                  <input type="text" className="input" value={about.missionTitle || ''} onChange={(e) => setAbout({ ...about, missionTitle: e.target.value })} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Mission Description</label>
                  <textarea rows="2" className="input" value={about.missionDescription || ''} onChange={(e) => setAbout({ ...about, missionDescription: e.target.value })} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Vision Title</label>
                  <input type="text" className="input" value={about.visionTitle || ''} onChange={(e) => setAbout({ ...about, visionTitle: e.target.value })} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Vision Description</label>
                  <textarea rows="2" className="input" value={about.visionDescription || ''} onChange={(e) => setAbout({ ...about, visionDescription: e.target.value })} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Values Title</label>
                  <input type="text" className="input" value={about.valuesTitle || ''} onChange={(e) => setAbout({ ...about, valuesTitle: e.target.value })} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Values Description</label>
                  <textarea rows="2" className="input" value={about.valuesDescription || ''} onChange={(e) => setAbout({ ...about, valuesDescription: e.target.value })} />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Sidebar: Image & Legacy Editors */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* About Image Configuration */}
          <div className="card" style={{ padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FiImage /> About Feature Image
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Image URL</label>
                <input 
                  type="text" className="input" 
                  placeholder="https://res.cloudinary.com/.../about-image.webp"
                  value={currentImageUrl} 
                  onChange={(e) => {
                    const val = e.target.value;
                    setImgPreviewError(false);
                    setAbout({ ...about, imageUrl: val, image_url: val });
                  }} 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Image Alt Text</label>
                <input 
                  type="text" className="input" 
                  value={about.imageAlt || ''} 
                  onChange={(e) => setAbout({ ...about, imageAlt: e.target.value })} 
                />
              </div>

              {/* Image Preview Box */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                  Live Image Preview
                </label>
                
                {currentImageUrl ? (
                  <div style={{ position: 'relative', width: '100%', maxHeight: '180px', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--bg-main)' }}>
                    {imgPreviewError ? (
                      <div style={{ padding: '1.25rem', textAlign: 'center', color: 'var(--danger)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                        <FiAlertCircle /> Unable to load image. Please check the URL.
                      </div>
                    ) : (
                      <img 
                        src={currentImageUrl} 
                        alt={about.imageAlt || "About Preview"} 
                        onLoad={() => setImgPreviewError(false)}
                        onError={() => setImgPreviewError(true)}
                        style={{ width: '100%', height: '160px', objectFit: 'cover', display: 'block' }}
                      />
                    )}
                  </div>
                ) : (
                  <div style={{ padding: '1.25rem', textAlign: 'center', border: '1px dashed var(--border)', borderRadius: 'var(--radius-md)', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    No image URL provided.
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Legacy Narrative Fields */}
          <div className="card" style={{ padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', color: 'var(--primary)' }}>Company History &amp; Director Message</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>History / Story</label>
                <textarea rows="3" className="input" value={about.story || ''} onChange={(e) => setAbout({ ...about, story: e.target.value })} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Director / MD's Message</label>
                <textarea rows="3" className="input" value={about.directorMessage || ''} onChange={(e) => setAbout({ ...about, directorMessage: e.target.value })} />
              </div>
            </div>
          </div>

        </div>

      </form>
    </div>
  );
}
