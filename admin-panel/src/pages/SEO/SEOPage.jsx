// EcoMargin Admin Panel — Enterprise SEO Manager & Real-Time Auditor
// src/pages/SEO/SEOPage.jsx

import React, { useState, useEffect } from 'react';
import { 
  FiSave, FiCheck, FiSearch, FiCode, FiShare2, FiAlertCircle, 
  FiZap, FiPieChart, FiCheckCircle, FiXCircle, FiGlobe, FiLayers
} from 'react-icons/fi';
import { adminService } from '../../services/adminService';
import api from '../../services/api';

export default function SEOPage() {
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState('/');

  const [seo, setSeo] = useState({
    pageRoute: '/',
    metaTitle: "EcoMargin | EV Charger Manufacturer & EPC Infrastructure Company",
    metaDescription: "EcoMargin manufactures 3.3kW to 240kW commercial AC & DC chargers, OCPP CSMS software, and turnkey EPC charging station installation.",
    keywords: "EV Charger Manufacturer India, DC Fast Charger 60kW 120kW 240kW, ARAI Certified EV Charger, OCPP 2.0.1 Software",
    focusKeyword: "EV Charger Manufacturer",
    canonicalUrl: "https://www.ecomargin.in",
    robots: "index, follow, max-image-preview:large",
    ogTitle: "EcoMargin EV Charging Infrastructure & OEM Factory",
    ogDescription: "Powering India's EV Infrastructure with 3.3kW to 240kW AC & DC Chargers.",
    ogImage: "https://www.ecomargin.in/og-image.jpg",
    twitterCard: "summary_large_image",
    schemaType: "Organization",
    organizationSchema: `{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "EcoMargin LLP",
  "url": "https://www.ecomargin.in",
  "telephone": "+91-8302313065",
  "address": "Shiv Colony, Tijara Phatak, Alwar, Rajasthan 301001"
}`,
    gscVerification: "",
    bingVerification: "",
    gaMeasurementId: "",
    gtmContainerId: "",
    clarityId: ""
  });

  const availableRoutes = [
    { label: 'Home Page ( / )', value: '/' },
    { label: 'About Us ( /about )', value: '/about' },
    { label: 'Manufacturing Plant ( /manufacturing )', value: '/manufacturing' },
    { label: 'Products Catalog ( /products )', value: '/products' },
    { label: 'Services & EPC ( /services )', value: '/services' },
    { label: 'Projects Portfolio ( /projects )', value: '/projects' },
    { label: 'Dealer Partner ( /dealer-partner )', value: '/dealer-partner' },
    { label: 'Downloads & Specs ( /downloads )', value: '/downloads' },
    { label: 'Contact Us ( /contact )', value: '/contact' },
    { label: 'Blogs & Insights ( /blogs )', value: '/blogs' },
    { label: 'Privacy Policy ( /privacy-policy )', value: '/privacy-policy' },
    { label: 'Terms of Service ( /terms )', value: '/terms' },
  ];

  useEffect(() => {
    const fetchSEO = async () => {
      try {
        const res = await adminService.getSEOCMS();
        if (res && res.data) {
          setSeo(prev => ({ ...prev, ...res.data }));
        }
      } catch (err) {
        console.warn('Initial SEO CMS load notice:', err.message);
      }
    };
    fetchSEO();
  }, [selectedRoute]);

  // Real-Time SEO Audit Score /100 Calculation
  const calculateSEOScore = () => {
    let score = 0;
    const checks = {
      titlePresent: false,
      titleLength: false,
      descPresent: false,
      descLength: false,
      focusKeyword: false,
      canonical: false,
      ogImage: false,
      schema: false,
    };

    if (seo.metaTitle && seo.metaTitle.trim().length > 0) {
      checks.titlePresent = true;
      score += 10;
      if (seo.metaTitle.length >= 30 && seo.metaTitle.length <= 70) {
        checks.titleLength = true;
        score += 15;
      }
    }

    if (seo.metaDescription && seo.metaDescription.trim().length > 0) {
      checks.descPresent = true;
      score += 10;
      if (seo.metaDescription.length >= 100 && seo.metaDescription.length <= 170) {
        checks.descLength = true;
        score += 15;
      }
    }

    if (
      seo.focusKeyword &&
      seo.metaTitle.toLowerCase().includes(seo.focusKeyword.toLowerCase())
    ) {
      checks.focusKeyword = true;
      score += 15;
    }

    if (seo.canonicalUrl && seo.canonicalUrl.startsWith('http')) {
      checks.canonical = true;
      score += 15;
    }

    if (seo.ogImage && seo.ogImage.startsWith('http')) {
      checks.ogImage = true;
      score += 10;
    }

    if (seo.organizationSchema && seo.organizationSchema.includes('@schema.org') || seo.organizationSchema.includes('@context')) {
      checks.schema = true;
      score += 10;
    }

    return { score, checks };
  };

  const audit = calculateSEOScore();

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await adminService.updateSEOCMS({ ...seo, pageRoute: selectedRoute });
      if (res && (res.success === true || res.data)) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        throw new Error(res?.message || 'Failed to save SEO Metadata');
      }
    } catch (err) {
      console.error('❌ Error saving SEO Metadata:', err);
      setError(err.message || err.data?.message || 'Error saving changes to database');
    } finally {
      setLoading(false);
    }
  };

  const handleAIAutoGenerate = async () => {
    setGenerating(true);
    setError(null);
    try {
      const routeObj = availableRoutes.find(r => r.value === selectedRoute);
      const res = await api.post('/cms/seo/generate', {
        title: routeObj ? routeObj.label.split('(')[0].trim() : 'EcoMargin EV Charger',
        category: 'EV Charging Infrastructure',
        description: seo.metaDescription || 'EcoMargin OEM EV Charger Manufacturer',
        type: selectedRoute.includes('product') ? 'product' : 'page'
      });

      if (res && res.data) {
        setSeo(prev => ({
          ...prev,
          metaTitle: res.data.metaTitle,
          metaDescription: res.data.metaDescription,
          keywords: res.data.keywords,
          focusKeyword: res.data.focusKeyword,
          canonicalUrl: res.data.canonicalUrl,
          ogTitle: res.data.ogTitle,
          ogDescription: res.data.ogDescription,
          ogImage: res.data.ogImage,
          twitterCard: res.data.twitterCard
        }));
      }
    } catch (err) {
      console.error('Error generating AI SEO:', err);
      setError('Failed to generate AI SEO metadata');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div style={{ padding: '1.5rem' }}>
      
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiGlobe style={{ color: 'var(--primary)' }} /> Enterprise SEO Manager & Auditor
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Dynamic Meta Tags, JSON-LD Schemas, OpenGraph, Core Web Vitals Audit & Search Engine Verifications
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button 
            type="button" 
            onClick={handleAIAutoGenerate} 
            disabled={generating} 
            className="btn btn-secondary" 
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(99, 102, 241, 0.1)', color: '#6366f1', border: '1px solid rgba(99, 102, 241, 0.2)' }}
          >
            <FiZap /> {generating ? 'Generating with AI...' : 'Auto-Generate AI SEO'}
          </button>

          <button onClick={handleSave} disabled={loading} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {loading ? 'Saving to DB...' : saved ? <><FiCheck /> Saved</> : <><FiSave /> Save SEO Settings</>}
          </button>
        </div>
      </div>

      {error && (
        <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FiAlertCircle /> {error}
        </div>
      )}

      {/* SEO Score Banner */}
      <div className="card" style={{ padding: '1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(6, 182, 212, 0.05))', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', borderRadius: '50%', background: audit.score >= 90 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)', color: audit.score >= 90 ? '#10b981' : '#f59e0b', fontSize: '1.75rem', fontWeight: 800 }}>
            {audit.score}
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>SEO Health Score: {audit.score}/100</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '0.25rem 0 0 0' }}>
              Targeting Google Lighthouse SEO score &gt; 95. Real-time checklist evaluates Title, Description, Keyword, Schema, and Canonicals.
            </p>
          </div>
        </div>

        {/* Selected Route Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Target Route:</label>
          <select 
            className="input" 
            value={selectedRoute} 
            onChange={(e) => setSelectedRoute(e.target.value)}
            style={{ width: '240px', fontWeight: 600 }}
          >
            {availableRoutes.map(r => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
        </div>
      </div>

      <form onSubmit={handleSave} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        
        {/* Left Column: Search Metadata */}
        <div className="card" style={{ padding: '1.75rem' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiSearch /> Search Engine Metadata
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Meta Title</label>
                <span style={{ fontSize: '0.75rem', color: seo.metaTitle.length >= 30 && seo.metaTitle.length <= 70 ? '#10b981' : '#f59e0b' }}>
                  {seo.metaTitle.length} / 70 chars
                </span>
              </div>
              <input type="text" className="input" value={seo.metaTitle} onChange={(e) => setSeo({ ...seo, metaTitle: e.target.value })} />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Meta Description</label>
                <span style={{ fontSize: '0.75rem', color: seo.metaDescription.length >= 100 && seo.metaDescription.length <= 170 ? '#10b981' : '#f59e0b' }}>
                  {seo.metaDescription.length} / 160 chars
                </span>
              </div>
              <textarea rows="3" className="input" value={seo.metaDescription} onChange={(e) => setSeo({ ...seo, metaDescription: e.target.value })} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Focus Keyword</label>
                <input type="text" className="input" value={seo.focusKeyword} onChange={(e) => setSeo({ ...seo, focusKeyword: e.target.value })} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Robots Meta</label>
                <select className="input" value={seo.robots} onChange={(e) => setSeo({ ...seo, robots: e.target.value })}>
                  <option value="index, follow">index, follow (Default)</option>
                  <option value="noindex, follow">noindex, follow</option>
                  <option value="noindex, nofollow">noindex, nofollow</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Target Keywords (Comma Separated)</label>
              <textarea rows="2" className="input" value={seo.keywords} onChange={(e) => setSeo({ ...seo, keywords: e.target.value })} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Canonical URL</label>
              <input type="url" className="input" value={seo.canonicalUrl} onChange={(e) => setSeo({ ...seo, canonicalUrl: e.target.value })} />
            </div>
          </div>
        </div>

        {/* Right Column: Social, Schema & Verification */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Audit Checklist Card */}
          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.05rem', marginBottom: '1rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FiPieChart /> Real-Time Audit Checklist
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.825rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: audit.checks.titlePresent ? '#10b981' : 'var(--danger)' }}>
                {audit.checks.titlePresent ? <FiCheckCircle /> : <FiXCircle />} Meta Title Present
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: audit.checks.titleLength ? '#10b981' : 'var(--danger)' }}>
                {audit.checks.titleLength ? <FiCheckCircle /> : <FiXCircle />} Title Length (30-70)
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: audit.checks.descPresent ? '#10b981' : 'var(--danger)' }}>
                {audit.checks.descPresent ? <FiCheckCircle /> : <FiXCircle />} Description Present
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: audit.checks.descLength ? '#10b981' : 'var(--danger)' }}>
                {audit.checks.descLength ? <FiCheckCircle /> : <FiXCircle />} Desc Length (100-170)
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: audit.checks.focusKeyword ? '#10b981' : 'var(--danger)' }}>
                {audit.checks.focusKeyword ? <FiCheckCircle /> : <FiXCircle />} Focus Keyword in Title
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: audit.checks.canonical ? '#10b981' : 'var(--danger)' }}>
                {audit.checks.canonical ? <FiCheckCircle /> : <FiXCircle />} Canonical Link Valid
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: audit.checks.ogImage ? '#10b981' : 'var(--danger)' }}>
                {audit.checks.ogImage ? <FiCheckCircle /> : <FiXCircle />} OpenGraph Image Set
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: audit.checks.schema ? '#10b981' : 'var(--danger)' }}>
                {audit.checks.schema ? <FiCheckCircle /> : <FiXCircle />} JSON-LD Schema Ready
              </div>
            </div>
          </div>

          {/* Social Sharing & Search Verifications */}
          <div className="card" style={{ padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FiShare2 /> Open Graph & Webmaster Verifications
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>OG / Social Share Title</label>
                <input type="text" className="input" value={seo.ogTitle} onChange={(e) => setSeo({ ...seo, ogTitle: e.target.value })} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>OG Share Image URL</label>
                <input type="url" className="input" value={seo.ogImage} onChange={(e) => setSeo({ ...seo, ogImage: e.target.value })} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Google Search Console</label>
                  <input type="text" className="input" placeholder="meta verification code" value={seo.gscVerification} onChange={(e) => setSeo({ ...seo, gscVerification: e.target.value })} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Bing Webmaster</label>
                  <input type="text" className="input" placeholder="msvalidate code" value={seo.bingVerification} onChange={(e) => setSeo({ ...seo, bingVerification: e.target.value })} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.35rem' }}>GA4 Measurement ID</label>
                  <input type="text" className="input" placeholder="G-XXXXXXXXXX" value={seo.gaMeasurementId} onChange={(e) => setSeo({ ...seo, gaMeasurementId: e.target.value })} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.35rem' }}>GTM Container ID</label>
                  <input type="text" className="input" placeholder="GTM-XXXXXXX" value={seo.gtmContainerId} onChange={(e) => setSeo({ ...seo, gtmContainerId: e.target.value })} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.35rem' }}>Microsoft Clarity ID</label>
                  <input type="text" className="input" placeholder="Clarity Project ID" value={seo.clarityId} onChange={(e) => setSeo({ ...seo, clarityId: e.target.value })} />
                </div>
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FiCode /> JSON-LD Structured Data Schema
            </h3>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Custom JSON-LD Schema (JSON)</label>
              <textarea rows="5" className="input" style={{ fontFamily: 'monospace', fontSize: '0.8rem' }} value={seo.organizationSchema} onChange={(e) => setSeo({ ...seo, organizationSchema: e.target.value })} />
            </div>
          </div>

        </div>

      </form>
    </div>
  );
}
