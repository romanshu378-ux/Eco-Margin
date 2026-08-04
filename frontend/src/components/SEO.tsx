// EcoMargin LLP — Production-Ready Reusable TypeScript SEO Component
// src/components/SEO.tsx

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import publicApi from '../services/publicApi';
import { useFooterCMS, useLogos } from '../hooks/useCMS';
import { DEFAULT_SEO, getCanonicalUrl, getSiteUrl } from '../utils/seo';
import {
  getLocalBusinessSchema,
  getWebsiteSchema,
  getBreadcrumbSchema,
  getProductSchema,
  getFAQSchema,
  getOrganizationSchema,
  getWebPageSchema,
  ProductDetails,
  FAQItem
} from '../utils/schema';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  canonical?: string;
  pageRoute?: string;
  schemaType?: 'Organization' | 'LocalBusiness' | 'WebSite' | 'Product' | 'Service' | 'FAQPage';
  schemaData?: any;
  product?: ProductDetails | null;
  faqs?: FAQItem[] | null;
  breadcrumbs?: { name: string; url: string }[] | null;
}

export default function SEO({
  title,
  description,
  keywords,
  image,
  url,
  canonical,
  pageRoute = '/',
  schemaType = 'Organization',
  schemaData = null,
  product = null,
  faqs = null,
  breadcrumbs = null,
}: SEOProps) {
  const [seoData, setSeoData] = useState<any>(null);
  const { data: footerData } = useFooterCMS();
  const { logos } = useLogos();

  useEffect(() => {
    let isMounted = true;
    const loadSEO = async () => {
      try {
        const res = await publicApi.getSEO({ route: pageRoute });
        const payload = res?.data || (res?.metaTitle ? res : null);
        if (isMounted && payload) {
          setSeoData(payload);
        }
      } catch (err: any) {
        console.warn('Live SEO fetch notice:', err?.message);
      }
    };
    loadSEO();
    return () => {
      isMounted = false;
    };
  }, [pageRoute]);

  const siteName = 'EcoMargin';
  const siteUrl = getSiteUrl();

  const companyName = footerData?.companyName || 'EcoMargin LLP';
  const phone = footerData?.phone || '+91-8302313065';
  const altPhone = footerData?.altPhone || '+91-9079139959';
  const email = footerData?.email || 'support@ecomargin.in';

  // Dynamic Head Metadata Resolution
  const metaTitle = title
    ? `${title} | EcoMargin | Eco Margin`
    : seoData?.metaTitle || DEFAULT_SEO.title;

  const metaDesc =
    description || seoData?.metaDescription || DEFAULT_SEO.description;

  const metaKeywords =
    keywords || seoData?.keywords || DEFAULT_SEO.keywords;

  const canonicalLink =
    canonical || seoData?.canonicalUrl || getCanonicalUrl(pageRoute);

  const ogImg =
    image ||
    seoData?.ogImage ||
    logos?.header?.imageUrl ||
    DEFAULT_SEO.image;

  const robotsSetting = seoData?.robots || DEFAULT_SEO.robots;

  // Search Console & Webmaster verification tags
  const gsc = seoData?.gscVerification || '';
  const bing = seoData?.bingVerification || '';
  const gaId = seoData?.gaMeasurementId || '';
  const gtmId = seoData?.gtmContainerId || '';
  const clarityId = seoData?.clarityId || '';

  // Generate Schemas
  const organizationSchema = getOrganizationSchema(companyName);
  const webSiteSchema = getWebsiteSchema(siteName);
  const webPageSchema = getWebPageSchema(metaTitle, metaDesc, canonicalLink);
  const localBusinessSchema = getLocalBusinessSchema(companyName, metaDesc, phone, email, ogImg);
  
  const breadcrumbItems = breadcrumbs || [
    { name: 'Home', url: siteUrl },
    ...(pageRoute !== '/'
      ? [{ name: pageRoute.split('/')[1]?.toUpperCase() || 'PAGE', url: `${siteUrl}/${pageRoute.split('/')[1]}` }]
      : [])
  ];
  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbItems);

  const productSchema = product ? getProductSchema(product, siteUrl, ogImg, companyName) : null;
  const faqSchema = faqs ? getFAQSchema(faqs) : null;

  return (
    <Helmet htmlAttributes={{ lang: 'en-IN' }}>
      {/* ── 1. CORE HEAD TAGS ── */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDesc} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="robots" content={robotsSetting} />
      <meta name="author" content="EcoMargin LLP" />
      <meta name="theme-color" content="#0F9D58" />
      <link rel="canonical" href={canonicalLink} />

      {/* ── 2. PRELOAD LOGO & BRAND ASSETS ── */}
      <link
        rel="preload"
        as="image"
        href="https://res.cloudinary.com/dcumpbswm/image/upload/v1785843387/dark_mfegwj.png"
      />

      {/* ── 3. FAVICON SYSTEM SUPPORT ── */}
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="192x192" href="/favicon.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />

      {/* Webmaster Verifications */}
      {gsc && <meta name="google-site-verification" content={gsc} />}
      {bing && <meta name="msvalidate.01" content={bing} />}

      {/* ── 4. OPEN GRAPH TAGS ── */}
      <meta property="og:title" content={seoData?.ogTitle || metaTitle} />
      <meta property="og:description" content={seoData?.ogDescription || metaDesc} />
      <meta property="og:image" content={ogImg} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:url" content={url || canonicalLink} />

      {/* ── 5. TWITTER CARD TAGS ── */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content={ogImg} />

      {/* ── 6. DYNAMIC STRUCTURED DATA SCHEMAS ── */}
      <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(webSiteSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(webPageSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>

      {productSchema && (
        <script type="application/ld+json">{JSON.stringify(productSchema)}</script>
      )}

      {faqSchema && (
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      )}

      {schemaData && (
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      )}
    </Helmet>
  );
}
