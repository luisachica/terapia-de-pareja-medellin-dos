// Configuración del sitio web
export const siteConfig = {
  name: "Terapia de Pareja Medellín",
  url: "https://terapiadeparejamedellin.com",
  description: "Terapia de pareja en Medellín. Te proporcionamos las herramientas y el apoyo necesarios para que tu relación florezca.",
  author: "Yolanda Osorio",
  keywords: [
    "terapia de pareja",
    "terapia de pareja Medellín",
    "psicóloga de pareja",
    "consultas de pareja",
    "asesorías de pareja",
    "talleres de pareja",
    "Yolanda Osorio",
    "sexología",
    "trauma"
  ]
}

// Función para generar URLs canónicas
export function getCanonicalUrl(path: string = ''): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${siteConfig.url}${cleanPath}`
}

// Función para generar metadatos base
export function generateMetadata({
  title,
  description,
  path = '',
  image,
  noIndex = false
}: {
  title: string
  description: string
  path?: string
  image?: string
  noIndex?: boolean
}) {
  const canonicalUrl = getCanonicalUrl(path)
  
  return {
    title,
    description,
    keywords: siteConfig.keywords.join(', '),
    authors: [{ name: siteConfig.author }],
    creator: siteConfig.author,
    publisher: siteConfig.name,
    robots: noIndex ? 'noindex,nofollow' : 'index,follow',
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      type: 'website',
      locale: 'es_CO',
      url: canonicalUrl,
      title,
      description,
      siteName: siteConfig.name,
      images: image ? [{
        url: image,
        width: 1200,
        height: 630,
        alt: title
      }] : undefined
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : undefined
    }
  }
}