// EcoMargin Admin Panel — Homepage CMS Management
// src/pages/CMS/HomepageCMSPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { FiSave, FiEye, FiSliders, FiImage, FiLayers, FiCheck, FiAlertCircle } from 'react-icons/fi';
import { adminService } from '../../services/adminService';

export default function HomepageCMSPage() {
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imgPreviewError, setImgPreviewError] = useState(false);
  
  const abortControllerRef = useRef(null);
  const isFetchedRef = useRef(false);

  const [cms, setCms] = useState({
    heroTitle: "Smarter Charging.\nGreener Tomorrow.",
    heroSubtitle: "EcoMargin delivers reliable, intelligent, and scalable EV charging solutions with integrated hardware and software — powering a cleaner and connected future.",
    hero_background_image_url: "",
    heroBackgroundImageUrl: "",
    heroVideoUrl: "",
    primaryButtonText: "Explore Solutions",
    secondaryButtonText: "View Products",
    brochureButtonText: "Brochures",
    stats: [
      { label: "Charging Points", value: "500+" },
      { label: "Locations", value: "100+" },
      { label: "Uptime", value: "99.9%" },
      { label: "Support", value: "24/7" }
    ],
    sectionVisibility: {
      hero: true, intro: true, products: true, manufacturing: true,
      services: true, whyChooseUs: true, counter: true, industries: true,
      gallery: true, blogs: true, faq: true, contactCta: true
    }
  });

  useEffect(() => {
    if (abortControllerRef.current) {
      console.log('[Homepage CMS] duplicate request prevented');
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    const fetchCMS = async () => {
      console.log('[Homepage CMS] API request started');
      try {
        const res = await adminService.getHomepageCMS({ signal: controller.signal });
        
        if (res && (res.success === true || res.data)) {
          const payload = res.data || res;
          const heroImg = payload.hero_background_image_url || payload.heroBackgroundImageUrl || '';
          
          setCms(prev => ({ 
            ...prev, 
            ...payload,
            hero_background_image_url: heroImg,
            heroBackgroundImageUrl: heroImg
          }));

          setError(null);
          isFetchedRef.current = true;
          console.log('[Homepage CMS] API request completed');
        }
      } catch (err) {
        if (err?.isCanceled || err?.name === 'CanceledError' || err?.name === 'AbortError' || err?.code === 'ERR_CANCELED') {
          console.log('[Homepage CMS] API request cancelled');
          return;
        }

        console.warn('❌ Initial CMS load notice:', err.message);
        if (!isFetchedRef.current) {
          setError(err.message || 'Failed to load Homepage CMS');
        }
      } finally {
        if (abortControllerRef.current === controller) {
          abortControllerRef.current = null;
        }
      }
    };

    fetchCMS();

    return () => {
      if (abortControllerRef.current === controller) {
        console.log('[Homepage CMS] API request cancelled');
        controller.abort();
        abortControllerRef.current = null;
      }
    };
  }, []);

  const currentImageUrl = cms.hero_background_image_url || cms.heroBackgroundImageUrl || '';

  const handleSave = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        ...cms,
        hero_background_image_url: currentImageUrl,
        heroBackgroundImageUrl: currentImageUrl
      };

      const res = await adminService.updateHomepageCMS(payload);
      if (res && (res.success === true || res.data)) {
        if (res.data) {
          const updatedImg = res.data.hero_background_image_url || res.data.heroBackgroundImageUrl || currentImageUrl;
          setCms(prev => ({
            ...prev,
            ...res.data,
            hero_background_image_url: updatedImg,
            heroBackgroundImageUrl: updatedImg
          }));
        }
        setSaved(true);
        setTimeout(() => setSaved(false), 3500);
      } else {
        throw new Error(res?.message || 'Failed to save Homepage CMS');
      }
    } catch (err) {
      console.error('❌ Error saving Homepage CMS:', err);
      setError(err.message || err.data?.message || 'Error saving changes to database');
    } finally {
      setLoading(false);
    }
  };

  const toggleSection = (key) => {
    setCms({
      ...cms,
      sectionVisibility: {
        ...cms.sectionVisibility,
        [key]: !cms.sectionVisibility[key]
      }
    });
  };

  return (
    <div style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>Homepage CMS Manager</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Manage Hero Banners, Background Images, CTA Buttons, Stats Counters &amp; Section Visibility</p>
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
          
          {/* Hero Banner Section */}
          <div className="card" style={{ padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)' }}>
              <FiSliders /> Hero Banner Configuration
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Hero Heading Title</label>
                <input 
                  type="text" className="input" 
                  value={cms.heroTitle} 
                  onChange={(e) => setCms({ ...cms, heroTitle: e.target.value })} 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Hero Subtitle / Tagline</label>
                <input 
                  type="text" className="input" 
                  value={cms.heroSubtitle} 
                  onChange={(e) => setCms({ ...cms, heroSubtitle: e.target.value })} 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Hero Background Image URL</label>
                <input 
                  type="text" className="input" 
                  placeholder="https://res.cloudinary.com/.../hero-image.webp"
                  value={currentImageUrl} 
                  onChange={(e) => {
                    const val = e.target.value;
                    setImgPreviewError(false);
                    setCms({ 
                      ...cms, 
                      hero_background_image_url: val,
                      heroBackgroundImageUrl: val 
                    });
                  }} 
                />
                
                {/* Image Preview Box */}
                <div style={{ marginTop: '0.85rem' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                    Image Preview
                  </label>
                  
                  {currentImageUrl ? (
                    <div style={{ position: 'relative', width: '100%', maxHeight: '200px', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--bg-main)' }}>
                      {imgPreviewError ? (
                        <div style={{ padding: '1.25rem', textAlign: 'center', color: 'var(--danger)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                          <FiAlertCircle /> Unable to load image. Please check the URL.
                        </div>
                      ) : (
                        <img 
                          src={currentImageUrl} 
                          alt="Hero Background Preview" 
                          onLoad={() => setImgPreviewError(false)}
                          onError={() => setImgPreviewError(true)}
                          style={{ width: '100%', height: '180px', objectFit: 'cover', display: 'block' }}
                        />
                      )}
                    </div>
                  ) : (
                    <div style={{ padding: '1.25rem', textAlign: 'center', border: '1px dashed var(--border)', borderRadius: 'var(--radius-md)', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                      No image URL provided. Default fallback Hero image will be displayed.
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>

          {/* CTA Buttons Section */}
          <div className="card" style={{ padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', color: 'var(--primary)' }}>Call to Action (CTA) Button Labels</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Primary CTA Label</label>
                <input type="text" className="input" value={cms.primaryButtonText} onChange={(e) => setCms({ ...cms, primaryButtonText: e.target.value })} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Secondary CTA Label</label>
                <input type="text" className="input" value={cms.secondaryButtonText} onChange={(e) => setCms({ ...cms, secondaryButtonText: e.target.value })} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Brochure CTA Label</label>
                <input type="text" className="input" value={cms.brochureButtonText} onChange={(e) => setCms({ ...cms, brochureButtonText: e.target.value })} />
              </div>
            </div>
          </div>

          {/* Hero Statistics Counters */}
          <div className="card" style={{ padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', color: 'var(--primary)' }}>Hero Statistics Badges</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {cms.stats.map((stat, idx) => (
                <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', background: 'var(--bg-main)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
                  <input 
                    type="text" className="input" 
                    value={stat.value} 
                    onChange={(e) => {
                      const updatedStats = [...cms.stats];
                      updatedStats[idx].value = e.target.value;
                      setCms({ ...cms, stats: updatedStats });
                    }} 
                  />
                  <input 
                    type="text" className="input" 
                    value={stat.label} 
                    onChange={(e) => {
                      const updatedStats = [...cms.stats];
                      updatedStats[idx].label = e.target.value;
                      setCms({ ...cms, stats: updatedStats });
                    }} 
                  />
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Section Visibility & Toggles */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="card" style={{ padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)' }}>
              <FiLayers /> Homepage Section Visibility
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {Object.keys(cms.sectionVisibility).map((secKey) => (
                <label key={secKey} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0.75rem', background: 'var(--bg-main)', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: '0.875rem' }}>
                  <span style={{ textTransform: 'capitalize' }}>{secKey.replace(/([A-Z])/g, ' $1')} Section</span>
                  <input 
                    type="checkbox" 
                    checked={cms.sectionVisibility[secKey]} 
                    onChange={() => toggleSection(secKey)} 
                    style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
                  />
                </label>
              ))}
            </div>
          </div>
        </div>

      </form>
    </div>
  );
}
