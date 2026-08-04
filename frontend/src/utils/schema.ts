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

export const getLocalBusinessSchema = (
  companyName: string,
  description: string,
  phone: string,
  email: string,
  ogImg: string
) => {
  const siteUrl = getSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteUrl}/#organization`,
    'name': companyName,
    'legalName': 'EcoMargin LLP',
    'url': siteUrl,
    'logo': 'https://res.cloudinary.com/dcumpbswm/image/upload/v1785843387/dark_mfegwj.png',
    'image': ogImg,
    'description': description,
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
      'latitude': 27.553,
      'longitude': 76.6346
    },
    'openingHoursSpecification': {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      'opens': '09:00',
      'closes': '19:00'
    }
  };
};

export const getWebsiteSchema = (siteName: string) => {
  const siteUrl = getSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': siteName,
    'url': siteUrl,
    'potentialAction': {
      '@type': 'SearchAction',
      'target': `${siteUrl}/products?search={search_term_string}`,
      'query-input': 'required name=search_term_string'
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
