// EcoMargin LLP — JSON-LD Structured Data Schema Generators
// src/utils/schema.ts

import { getSiteUrl } from './seo';

export interface LocalBusinessAddress {
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
}

export const getOrganizationSchema = (companyName: string = 'EcoMargin LLP') => {
  const siteUrl = getSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    'name': companyName,
    'alternateName': ['EcoMargin', 'Eco Margin'],
    'url': siteUrl,
    'logo': 'https://res.cloudinary.com/dcumpbswm/image/upload/v1785843387/dark_mfegwj.png',
    'email': 'support@ecomargin.in',
    'telephone': '+91-8302313065',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'NH-11, iStart Nest, Government Engineering College',
      'addressLocality': 'Bharatpur',
      'addressRegion': 'Rajasthan',
      'postalCode': '321001',
      'addressCountry': 'IN'
    },
    'sameAs': [
      'https://www.linkedin.com/company/ecomargin',
      'https://www.instagram.com/ecomargin',
      'https://www.facebook.com/ecomargin',
      'https://www.youtube.com/@ecomargin',
      'https://twitter.com/ecomargin'
    ]
  };
};

export const getWebsiteSchema = (siteName: string = 'EcoMargin') => {
  const siteUrl = getSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    'name': siteName,
    'url': siteUrl,
    'potentialAction': {
      '@type': 'SearchAction',
      'target': `${siteUrl}/products?search={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };
};

export const getWebPageSchema = (title: string, description: string, canonicalUrl: string) => {
  const siteUrl = getSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${canonicalUrl}#webpage`,
    'url': canonicalUrl,
    'name': title,
    'description': description,
    'isPartOf': {
      '@id': `${siteUrl}/#website`
    },
    'about': {
      '@id': `${siteUrl}/#organization`
    }
  };
};

export const getBreadcrumbSchema = (items: { name: string; url: string }[]) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': item.url
    }))
  };
};

export const getLocalBusinessSchema = (
  companyName: string = 'EcoMargin LLP',
  description: string = '',
  phone: string = '+91-8302313065',
  email: string = 'support@ecomargin.in',
  ogImg: string = ''
) => {
  const siteUrl = getSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteUrl}/#localbusiness`,
    'name': companyName,
    'legalName': 'EcoMargin LLP',
    'url': siteUrl,
    'logo': 'https://res.cloudinary.com/dcumpbswm/image/upload/v1785843387/dark_mfegwj.png',
    'image': ogImg || 'https://res.cloudinary.com/dcumpbswm/image/upload/v1785843387/dark_mfegwj.png',
    'description': description,
    'telephone': phone || '+91-8302313065',
    'email': email || 'support@ecomargin.in',
    'priceRange': '₹₹₹',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'NH-11, iStart Nest, Government Engineering College',
      'addressLocality': 'Bharatpur',
      'addressRegion': 'Rajasthan',
      'postalCode': '321001',
      'addressCountry': 'IN'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 27.2023,
      'longitude': 77.4912
    },
    'openingHoursSpecification': {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      'opens': '09:00',
      'closes': '19:00'
    },
    'areaServed': [
      {
        '@type': 'Country',
        'name': 'India',
        'identifier': 'IN'
      }
    ]
  };
};

export interface ProductDetails {
  id?: string | number;
  name: string;
  description: string;
  image?: string;
  sku?: string;
  mpn?: string;
  power?: string;
  price?: string | number;
}

export const getProductSchema = (
  product: ProductDetails,
  siteUrl: string,
  ogImg: string,
  companyName: string
) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': product.name,
    'image': [product.image || ogImg],
    'description': product.description,
    'sku': product.sku || `EM-${product.id || 'CHG'}`,
    'mpn': product.mpn || `EM-EV-${product.power || 'AC'}`,
    'brand': {
      '@type': 'Brand',
      'name': 'EcoMargin'
    },
    'manufacturer': {
      '@type': 'Organization',
      'name': companyName
    },
    'offers': {
      '@type': 'Offer',
      'url': `${siteUrl}/products`,
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
  };
};

export interface FAQItem {
  question: string;
  answer: string;
}

export const getFAQSchema = (faqs: FAQItem[]) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  };
};
