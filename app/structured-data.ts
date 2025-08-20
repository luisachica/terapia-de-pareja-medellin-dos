import { siteConfig } from '@/lib/config'

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Terapia de Pareja Medellín - Yolanda Carmona",
  "url": siteConfig.url,
  "logo": `${siteConfig.url}/images/logo.png`,
  "description": "Servicios profesionales de terapia de pareja en Medellín. Consultas, asesorías y talleres especializados para fortalecer relaciones.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Medellín",
    "addressRegion": "Antioquia",
    "addressCountry": "CO"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+57-300-123-4567",
    "contactType": "customer service",
    "availableLanguage": "Spanish"
  },
  "sameAs": [
    "https://wa.me/573001234567"
  ]
}

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Terapia de Pareja Medellín",
  "url": siteConfig.url,
  "description": "Servicios profesionales de terapia de pareja en Medellín",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${siteConfig.url}/search?q={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  }
}

export const breadcrumbSchema = (items: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
})

export const serviceSchema = (service: {
  name: string
  description: string
  url: string
  price?: string
}) => {
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.description,
    "url": service.url,
    "provider": {
      "@type": "Organization",
      "name": "Terapia de Pareja Medellín - Yolanda Carmona",
      "url": siteConfig.url
    },
    "areaServed": {
      "@type": "City",
      "name": "Medellín",
      "addressRegion": "Antioquia",
      "addressCountry": "CO"
    }
  }

  if (service.price) {
    return {
      ...baseSchema,
      "offers": {
        "@type": "Offer",
        "price": service.price,
        "priceCurrency": "COP"
      }
    }
  }

  return baseSchema
}