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
  getServiceSchema,
  getFAQSchema,
  getOrganizationSchema,
  getWebPageSchema,
  getImageObjectSchema,
  getArticleSchema,
  ProductDetails,
  ServiceDetails,
  FAQItem,
  ArticleDetails
} from '../utils/schema';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  canonical?: string;
  pageRoute?: string;
  robots?: string;
  schemaType?: 'Organization' | 'LocalBusiness' | 'WebSite' | 'Product' | 'Service' | 'FAQPage';
  schemaData?: any;
  product?: ProductDetails | null;
  products?: ProductDetails[] | null;
  service?: ServiceDetails | null;
  article?: ArticleDetails | null;
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
  robots,
  schemaType = 'Organization',
  schemaData = null,
  product = null,
  products = null,
  service = null,
  article = null,
  faqs = null,
  breadcrumbs = null,
}: SEOProps) {
  const [seoData, setSeoData] = useState<any>(null);
  const { data: footerData } = useFooterCMS();
  const { logos } = useLogos();

  const resolvedRoute = pageRoute || (typeof window !== 'undefined' ? window.location.pathname : '/');

  useEffect(() => {
    let isMounted = true;
    const loadSEO = async () => {
      try {
        const res = await publicApi.getSEO({ route: resolvedRoute });
        const payload = res?.data || (res?.metaTitle ? res : null);
        if (isMounted && payload) {
          setSeoData(payload);
        }
      } catch (err: any) {
        // Silently fallback to component props and defaults
      }
    };
    loadSEO();
    return () => {
      isMounted = false;
    };
  }, [resolvedRoute]);

  const siteName = 'EcoMargin';
  const siteUrl = getSiteUrl();

  const companyName = footerData?.companyName || 'EcoMargin LLP';
  const phone = footerData?.phone || '+91-8302313065';
  const email = footerData?.email || 'support@ecomargin.in';

  // Dynamic Head Metadata Resolution
  const metaTitle = title
    ? (title.includes('EcoMargin') || title.includes('Eco Margin') ? title : `${title} | EcoMargin LLP`)
    : (seoData?.metaTitle || DEFAULT_SEO.title);

  const metaDesc =
    description || seoData?.metaDescription || DEFAULT_SEO.description;

  const metaKeywords =
    keywords || seoData?.keywords || DEFAULT_SEO.keywords;

  const canonicalLink =
    canonical || seoData?.canonicalUrl || getCanonicalUrl(resolvedRoute);

  const ogImg =
    image ||
    seoData?.ogImage ||
    logos?.header?.imageUrl ||
    DEFAULT_SEO.image;

  const robotsSetting = robots || seoData?.robots || DEFAULT_SEO.robots;

  // Search Console & Webmaster verification tags (only if actual values exist)
  const gsc = seoData?.gscVerification || '';
  const bing = seoData?.bingVerification || '';

  // Schemas Resolution
  const isHomePage = resolvedRoute === '/' || resolvedRoute === '';
  const organizationSchema = isHomePage ? getOrganizationSchema(companyName, ogImg) : null;
  const webSiteSchema = isHomePage ? getWebsiteSchema(siteName) : null;
  const webPageSchema = getWebPageSchema(metaTitle, metaDesc, canonicalLink);
  const localBusinessSchema = schemaType === 'LocalBusiness' 
    ? getLocalBusinessSchema(companyName, metaDesc, phone, email, ogImg) 
    : null;

  // Breadcrumbs for subpages
  const breadcrumbItems = !isHomePage
    ? (breadcrumbs || [
        { name: 'Home', url: `${siteUrl}/` },
        { 
          name: resolvedRoute.split('/')[1]?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Page', 
          url: canonicalLink 
        }
      ])
    : null;
  const breadcrumbSchema = breadcrumbItems ? getBreadcrumbSchema(breadcrumbItems) : null;

  const productSchema = product ? getProductSchema(product, siteUrl, ogImg, companyName) : null;
  const productSchemasList = products && Array.isArray(products)
    ? products.map(p => getProductSchema(p, siteUrl, ogImg, companyName))
    : [];
  const serviceSchema = service ? getServiceSchema(service, companyName) : null;
  const faqSchema = faqs && Array.isArray(faqs) && faqs.length > 0 ? getFAQSchema(faqs) : null;
  const articleSchema = article ? getArticleSchema({ ...article, url: canonicalLink }) : null;
  const imageObjectSchema = ogImg ? getImageObjectSchema(ogImg, metaTitle) : null;

  const ogType = article ? 'article' : (product || schemaType === 'Product' ? 'product' : 'website');

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
      <link rel="alternate" href={canonicalLink} hrefLang="en-IN" />
      <link rel="alternate" href={canonicalLink} hrefLang="x-default" />

      {/* ── 2. PRELOAD LOGO & BRAND ASSETS ── */}
      <link rel="preload" as="image" href="/logo.png" />

      {/* ── 3. FAVICON SYSTEM SUPPORT ── */}
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
      <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
      <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />

      {/* Webmaster Verifications (only when genuine tokens exist) */}
      {gsc && <meta name="google-site-verification" content={gsc} />}
      {bing && <meta name="msvalidate.01" content={bing} />}

      {/* ── 4. OPEN GRAPH TAGS ── */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={seoData?.ogTitle || metaTitle} />
      <meta property="og:description" content={seoData?.ogDescription || metaDesc} />
      <meta property="og:image" content={ogImg} />
      <meta property="og:url" content={url || canonicalLink} />

      {/* Article Open Graph Metadata */}
      {article && article.datePublished && (
        <meta property="article:published_time" content={article.datePublished} />
      )}
      {article && article.dateModified && (
        <meta property="article:modified_time" content={article.dateModified} />
      )}
      {article && article.author && (
        <meta property="article:author" content={article.author} />
      )}

      {/* ── 5. TWITTER/X CARD TAGS ── */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content={ogImg} />

      {/* ── 6. STRUCTURED DATA SCHEMAS (JSON-LD) ── */}
      {organizationSchema && (
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      )}
      {webSiteSchema && (
        <script type="application/ld+json">{JSON.stringify(webSiteSchema)}</script>
      )}
      {webPageSchema && (
        <script type="application/ld+json">{JSON.stringify(webPageSchema)}</script>
      )}
      {breadcrumbSchema && (
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      )}
      {localBusinessSchema && (
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      )}

      {productSchema && (
        <script type="application/ld+json">{JSON.stringify(productSchema)}</script>
      )}

      {productSchemasList.map((pSchema, idx) => (
        <script key={`prod-${idx}`} type="application/ld+json">{JSON.stringify(pSchema)}</script>
      ))}

      {serviceSchema && (
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      )}

      {faqSchema && (
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      )}

      {articleSchema && (
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      )}

      {imageObjectSchema && (
        <script type="application/ld+json">{JSON.stringify(imageObjectSchema)}</script>
      )}

      {schemaData && (
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      )}
    </Helmet>
  );
}
