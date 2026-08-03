// EcoMargin Frontend — Dynamic SEO Component
// src/seo/SEO.jsx
import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import publicApi from '../services/publicApi'
import { useFooterCMS, useLogos } from '../hooks/useCMS'

export default function SEO({ title, description, keywords, schemaType = 'Organization', schemaData = null }) {
  const [seoData, setSeoData] = useState(null)
  const { data: footerData } = useFooterCMS()
  const { logos } = useLogos()

  useEffect(() => {
    const loadSEO = async () => {
      try {
        const res = await publicApi.getSEOCMS()
        const payload = res?.data || (res?.metaTitle ? res : null)
        if (payload) {
          setSeoData(payload)
        }
      } catch (err) {
        console.warn('Live SEO fetch notice:', err.message)
      }
    }
    loadSEO()
  }, [])

  const siteName = 'EcoMargin'
  const defaultTitle = seoData?.metaTitle || "EcoMargin | EV Charger Manufacturer & Infrastructure Company"
  const defaultDesc = seoData?.metaDescription || 'EcoMargin is a leading OEM EV Charger Manufacturer (3.3kW to 240kW DC), Turnkey EPC Charging Station Installer, and OCPP Cloud Software Provider.'
  const defaultKeywords = seoData?.keywords || 'EV Charger Manufacturer, DC Fast Charger 60kW 120kW 240kW, AC Type 2 Charger, EV Charging Station EPC, OCPP 2.0.1 Software, ARAI Certified EV Charger India'
  const canonical = seoData?.canonicalUrl || 'https://ecomargin.vercel.app'
  const ogImg = seoData?.ogImage || logos?.header?.imageUrl || 'https://ecomargin.vercel.app/og-image.jpg'
  const faviconUrl = logos?.favicon?.imageUrl

  const fullTitle = title ? `${title} | ${siteName}` : defaultTitle
  const metaDesc = description || defaultDesc

  const phone = footerData?.phone || ''
  const email = footerData?.email || ''
  const companyName = footerData?.companyName || ''
  const address = footerData?.address || ''

  // JSON-LD Organization & Manufacturer Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': companyName,
    'url': canonical,
    'logo': logos?.header?.imageUrl || 'https://ecomargin.vercel.app/logo.png',
    'description': defaultDesc,
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': phone,
      'contactType': 'sales',
      'email': email,
      'areaServed': 'IN',
      'availableLanguage': ['en', 'hi']
    },
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': address,
      'addressCountry': 'IN'
    }
  }

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDesc} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      <link rel="canonical" href={canonical} />
      
      {/* Dynamic Favicon */}
      {faviconUrl && <link rel="icon" type="image/x-icon" href={faviconUrl} />}
      {faviconUrl && <link rel="shortcut icon" href={faviconUrl} />}

      {/* OpenGraph Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:image" content={ogImg} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:url" content={canonical} />
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content={ogImg} />

      {/* JSON-LD Structured Data Injection */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
    </Helmet>
  )
}
