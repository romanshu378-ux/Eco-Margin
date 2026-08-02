import React from 'react'
import { Helmet } from 'react-helmet-async'

export default function SEO({ title, description, keywords, schemaType = 'Organization', schemaData = null }) {
  const siteName = 'EcoMargin'
  const defaultTitle = "EcoMargin | EV Charger Manufacturer & Infrastructure Company"
  const defaultDesc = 'EcoMargin is a leading OEM EV Charger Manufacturer (3.3kW to 240kW DC), Turnkey EPC Charging Station Installer, and OCPP Cloud Software Provider.'
  const defaultKeywords = 'EV Charger Manufacturer, DC Fast Charger 60kW 120kW 240kW, AC Type 2 Charger, EV Charging Station EPC, OCPP 2.0.1 Software, ARAI Certified EV Charger India'

  const fullTitle = title ? `${title} | ${siteName}` : defaultTitle
  const metaDesc = description || defaultDesc

  // JSON-LD Organization & Manufacturer Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'EcoMargin Infrastructure Pvt. Ltd.',
    'url': 'https://ecomargin.vercel.app',
    'logo': 'https://ecomargin.vercel.app/logo.png',
    'description': defaultDesc,
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': '+91-99999-99999',
      'contactType': 'sales',
      'email': 'sales@ecomargin.com',
      'areaServed': 'IN',
      'availableLanguage': ['en', 'hi']
    },
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Plot 42, Sector 62',
      'addressLocality': 'Noida',
      'addressRegion': 'UP',
      'postalCode': '201301',
      'addressCountry': 'IN'
    }
  }

  // JSON-LD LocalBusiness Schema
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': 'EcoMargin EV Charger Factory & Headquarters',
    'image': 'https://ecomargin.vercel.app/og-image.jpg',
    'telephone': '+91-99999-99999',
    'email': 'sales@ecomargin.com',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Plot 42, Sector 62',
      'addressLocality': 'Noida',
      'addressRegion': 'UP',
      'postalCode': '201301',
      'addressCountry': 'IN'
    },
    'priceRange': '$$$$',
    'openingHours': 'Mo-Sa 09:00-19:00'
  }

  // JSON-LD Product Manufacturer Schema
  const productSchema = schemaData || {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': 'EcoMargin Ultra-Fast DC Charger 120kW',
    'image': 'https://ecomargin.vercel.app/og-image.jpg',
    'description': 'Dual Gun CCS2 Heavy Duty DC Fast Charger for Highways and Bus Depots.',
    'brand': {
      '@type': 'Brand',
      'name': 'EcoMargin'
    },
    'offers': {
      '@type': 'AggregateOffer',
      'priceCurrency': 'INR',
      'offerCount': '100',
      'availability': 'https://schema.org/InStock'
    }
  }

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDesc} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      
      {/* OpenGraph Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:url" content="https://ecomargin.vercel.app" />
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDesc} />

      {/* JSON-LD Structured Data Injection */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(productSchema)}
      </script>
    </Helmet>
  )
}
