// EcoMargin Frontend — Production Analytics & Event Tracking Utility
// src/utils/analytics.js

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || ''
const GTM_ID = import.meta.env.VITE_GTM_ID || ''
const CLARITY_ID = import.meta.env.VITE_CLARITY_ID || ''
const IS_PROD = import.meta.env.PROD || import.meta.env.MODE === 'production'

/**
 * Initialize Google Analytics 4, GTM, and Microsoft Clarity
 */
export const initAnalytics = () => {
  if (typeof window === 'undefined') return

  // 1. Initialize GA4
  if (GA_MEASUREMENT_ID && !window.gtag) {
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
    document.head.appendChild(script)

    window.dataLayer = window.dataLayer || []
    window.gtag = function () {
      window.dataLayer.push(arguments)
    }
    window.gtag('js', new Date())
    window.gtag('config', GA_MEASUREMENT_ID, {
      send_page_view: false, // We handle page views via React Router hook
    })
  }

  // 2. Initialize GTM
  if (GTM_ID && (!window.dataLayer || !window.dataLayer.some((e) => e['gtm.start']))) {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js',
    })
    const gtmScript = document.createElement('script')
    gtmScript.async = true
    gtmScript.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`
    document.head.appendChild(gtmScript)
  }

  // 3. Initialize Microsoft Clarity
  if (CLARITY_ID && !window.clarity) {
    ;(function (c, l, a, r, i, t, y) {
      c[a] =
        c[a] ||
        function () {
          ;(c[a].q = c[a].q || []).push(arguments)
        }
      t = l.createElement(r)
      t.async = 1
      t.src = 'https://www.clarity.ms/tag/' + i
      y = l.getElementsByTagName(r)[0]
      y.parentNode.insertBefore(t, y)
    })(window, document, 'clarity', 'script', CLARITY_ID)
  }
}

/**
 * Track Page Views dynamically across React Router navigation
 */
export const trackPageView = (path, title = '') => {
  if (typeof window === 'undefined') return

  const pageTitle = title || document.title

  // Push to GA4
  if (window.gtag && GA_MEASUREMENT_ID) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: pageTitle,
      page_location: window.location.href,
    })
  }

  // Push to GTM DataLayer
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'pageview',
      page: {
        path,
        title: pageTitle,
        url: window.location.href,
      },
    })
  }
}

/**
 * Custom Event Dispatcher for GA4 & GTM
 */
export const trackEvent = (eventName, params = {}) => {
  if (typeof window === 'undefined') return

  // GA4 Event
  if (window.gtag) {
    window.gtag('event', eventName, params)
  }

  // GTM DataLayer Push
  if (window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...params,
    })
  }
}

// ── SPECIFIC TRACKING HELPERS ─────────────────────────────────────

export const trackProductView = (product) => {
  trackEvent('view_item', {
    currency: 'INR',
    value: product?.price || 0,
    items: [
      {
        item_id: product?.id || product?.slug,
        item_name: product?.name || 'EV Charger',
        item_category: product?.category || 'EV Charger',
        price: product?.price || 0,
      },
    ],
  })
}

export const trackQuoteButtonClick = (productName) => {
  trackEvent('quote_button_click', {
    product_name: productName,
    category: 'Lead Capture',
  })
}

export const trackContactFormSubmit = (formData) => {
  trackEvent('contact_form_submit', {
    form_name: 'Contact Page Inquiry',
    user_type: formData?.requirement || 'General Enquiry',
  })
}

export const trackRFQSubmit = (rfqData) => {
  trackEvent('rfq_submit', {
    form_name: 'B2B Quotation Request',
    product: rfqData?.product || 'Custom EV Charger',
  })
}

export const trackDealerAppSubmit = (dealerData) => {
  trackEvent('dealer_application_submit', {
    form_name: 'CPO & Franchise Application',
    city: dealerData?.city || 'India',
  })
}

export const trackDownloadClick = (fileName) => {
  trackEvent('file_download', {
    file_name: fileName,
    category: 'Technical Downloads',
  })
}

export const trackCTAClick = (ctaText, targetUrl) => {
  trackEvent('cta_click', {
    cta_text: ctaText,
    target_url: targetUrl,
  })
}
