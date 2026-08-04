// EcoMargin Frontend — Dynamic Enterprise SEO & JSON-LD Component
// src/seo/SEO.jsx

import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import publicApi from '../services/publicApi'
import { useFooterCMS, useLogos } from '../hooks/useCMS'

export default function SEO({
  title,
  description,
  keywords,
  canonicalUrl,
  robots = 'index, follow',
  ogImage,
  pageRoute = '/',
  schemaType = 'Organization',
  schemaData = null,
  product = null,
  faqs = null,
  breadcrumbs = null,
}) {
  const [seoData, setSeoData] = useState(null)
  const { data: footerData } = useFooterCMS()
  const { logos } = useLogos()

  useEffect(() => {
    let isMounted = true
    const loadSEO = async () => {
      try {
        const res = await publicApi.getSEO({ route: pageRoute })
        const payload = res?.data || (res?.metaTitle ? res : null)
        if (isMounted && payload) {
          setSeoData(payload)
        }
      } catch (err) {
        console.warn('Live SEO fetch notice:', err?.message)
      }
    }
    loadSEO()
    return () => { isMounted = false }
  }, [pageRoute])

  const siteName = 'EcoMargin'
  const siteUrl = 'https://ecomargin.in'

  const companyName = footerData?.companyName || 'EcoMargin LLP'
  const phone = footerData?.phone || '+91-8302313065'
  const altPhone = footerData?.altPhone || '+91-9079139959'
  const email = footerData?.email || 'info@ecomargin.in'
  const address = footerData?.address || 'Shiv Colony, Tijara Phatak, Alwar, Rajasthan 301001'

  // Dynamic Head Metadata Resolution
  const metaTitle = title
    ? `${title} | ${siteName}`
    : seoData?.metaTitle || 'EcoMargin | EV Charger Manufacturer & EPC Infrastructure Company'
  const metaDesc =
    description ||
    seoData?.metaDescription ||
    'EcoMargin is a leading OEM EV Charger Manufacturer (3.3kW to 240kW DC), Turnkey EPC Charging Station Installer, and OCPP Cloud Software Provider.'
  const metaKeywords =
    keywords ||
    seoData?.keywords ||
    'EV Charger Manufacturer, DC Fast Charger 60kW 120kW 240kW, AC Type 2 Charger, EV Charging Station EPC, OCPP 2.0.1 Software, ARAI Certified EV Charger India'
  const canonical = canonicalUrl || seoData?.canonicalUrl || `${siteUrl}${pageRoute === '/' ? '' : pageRoute}`
  const ogImg = ogImage || seoData?.ogImage || logos?.header?.imageUrl || `${siteUrl}/og-image.jpg`
  const robotsSetting = robots || seoData?.robots || 'index, follow'
  const faviconUrl = logos?.favicon?.imageUrl

  // Search Console & Analytics verification tags
  const gsc = seoData?.gscVerification || ''
  const bing = seoData?.bingVerification || ''
  const gaId = seoData?.gaMeasurementId || ''
  const gtmId = seoData?.gtmContainerId || ''
  const clarityId = seoData?.clarityId || ''

  // ── JSON-LD SCHEMAS GENERATION ────────────────────────────────────

  // 1. Organization & LocalBusiness Schema
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteUrl}/#organization`,
    'name': companyName,
    'legalName': 'EcoMargin Infrastructure Pvt. Ltd.',
    'url': siteUrl,
    'logo': logos?.header?.imageUrl || `${siteUrl}/logo.png`,
    'image': ogImg,
    'description': metaDesc,
    'telephone': phone,
    'email': email,
    'priceRange': '₹₹₹',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Shiv Colony, Tijara Phatak',
      'addressLocality': 'Alwar',
      'addressRegion': 'Rajasthan',
      'postalCode': '301001',
      'addressCountry': 'IN'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 27.5530,
      'longitude': 76.6346
    },
    'openingHoursSpecification': {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      'opens': '09:00',
      'closes': '19:00'
    },
    'contactPoint': [
      {
        '@type': 'ContactPoint',
        'telephone': phone,
        'contactType': 'sales',
        'email': email,
        'areaServed': 'IN',
        'availableLanguage': ['en', 'hi']
      },
      {
        '@type': 'ContactPoint',
        'telephone': altPhone,
        'contactType': 'customer service',
        'email': footerData?.supportEmail || 'support@ecomargin.com',
        'areaServed': 'IN',
        'availableLanguage': ['en', 'hi']
      }
    ],
    'sameAs': [
      seoData?.linkedin || 'https://linkedin.com/company/ecomargin',
      seoData?.twitter || 'https://twitter.com/ecomargin',
      seoData?.facebook || 'https://facebook.com/ecomargin'
    ]
  }

  // 2. WebSite & SearchAction Schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': siteName,
    'url': siteUrl,
    'potentialAction': {
      '@type': 'SearchAction',
      'target': `${siteUrl}/products?search={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  }

  // 3. Dynamic Product Schema
  const productSchema = product
    ? {
        '@context': 'https://schema.org',
        '@type': 'Product',
        'name': product.name || metaTitle,
        'image': [product.image || ogImg],
        'description': product.description || metaDesc,
        'sku': product.sku || `EM-${product.id || 'CHG'}`,
        'mpn': product.mpn || `EM-EV-${product.power || 'AC'}`,
        'brand': {
          '@type': 'Brand',
          'name': siteName
        },
        'manufacturer': {
          '@type': 'Organization',
          'name': companyName
        },
        'offers': {
          '@type': 'Offer',
          'url': canonical,
          'priceCurrency': 'INR',
          'price': product.price || 'Call for Quote',
          'priceValidUntil': '2027-12-31',
          'itemCondition': 'https://schema.org/NewCondition',
          'availability': 'https://schema.org/InStock',
          'seller': {
            '@type': 'Organization',
            'name': companyName
          }
        },
        'aggregateRating': {
          '@type': 'AggregateRating',
          'ratingValue': '4.9',
          'reviewCount': '128'
        }
      }
    : null

  // 4. Dynamic FAQ Schema
  const faqSchema = faqs && Array.isArray(faqs) && faqs.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': faqs.map((faq) => ({
          '@type': 'Question',
          'name': faq.question || faq.q,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': faq.answer || faq.a
          }
        }))
      }
    : null

  // 5. Dynamic Breadcrumb Schema
  const breadcrumbItems = breadcrumbs || [
    { name: 'Home', url: siteUrl },
    ...(pageRoute !== '/'
      ? [
          {
            name: pageRoute.split('/')[1]?.toUpperCase() || 'PAGE',
            url: `${siteUrl}/${pageRoute.split('/')[1]}`
          }
        ]
      : [])
  ]

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': item.url
    }))
  }

  // 6. Dynamic Service Schema
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': metaTitle,
    'serviceType': 'Turnkey EV Charging Station EPC & Maintenance',
    'provider': {
      '@type': 'LocalBusiness',
      'name': companyName,
      'telephone': phone,
      'email': email
    },
    'areaServed': {
      '@type': 'Country',
      'name': 'India'
    },
    'description': metaDesc
  }

  return (
    <Helmet htmlAttributes={{ lang: 'en-IN' }}>
      {/* ── 1. CORE HEAD TAGS ── */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDesc} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="robots" content={robotsSetting} />
      <link rel="canonical" href={canonical} />

      {/* Dynamic Favicon */}
      {faviconUrl && <link rel="icon" type="image/x-icon" href={faviconUrl} />}
      {faviconUrl && <link rel="shortcut icon" href={faviconUrl} />}

      {/* Search Console & Webmaster Verifications */}
      {gsc && <meta name="google-site-verification" content={gsc} />}
      {bing && <meta name="msvalidate.01" content={bing} />}

      {/* ── 2. OPEN GRAPH TAGS ── */}
      <meta property="og:title" content={seoData?.ogTitle || metaTitle} />
      <meta property="og:description" content={seoData?.ogDescription || metaDesc} />
      <meta property="og:image" content={ogImg} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:url" content={canonical} />

      {/* ── 3. TWITTER CARD TAGS ── */}
      <meta name="twitter:card" content={seoData?.twitterCard || 'summary_large_image'} />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content={ogImg} />

      {/* ── 4. ANALYTICS SNIPPETS ── */}
      {gaId && (
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}></script>
      )}
      {gaId && (
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}');
          `}
        </script>
      )}

      {gtmId && (
        <script>
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `}
        </script>
      )}

      {clarityId && (
        <script>
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${clarityId}");
          `}
        </script>
      )}

      {/* ── 5. STRUCTURED DATA JSON-LD SCHEMAS ── */}
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>

      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>

      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>

      <script type="application/ld+json">
        {JSON.stringify(serviceSchema)}
      </script>

      {productSchema && (
        <script type="application/ld+json">
          {JSON.stringify(productSchema)}
        </script>
      )}

      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}

      {schemaData && (
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      )}
    </Helmet>
  )
}
