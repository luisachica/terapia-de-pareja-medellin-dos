import React from 'react';
import { Metadata } from 'next';
import PostList from '@/components/blog/PostList';
import { getPosts, getCategories, WordPressPost } from '@/lib/wordpress';
import { siteConfig } from '@/lib/config';
import BreadcrumbNavigation from '@/components/BreadcrumbNavigation';

export const metadata: Metadata = {
  title: 'Blog - Terapia de Pareja Medellín',
  description: 'Artículos y consejos sobre terapia de pareja, relaciones saludables y bienestar emocional. Encuentra recursos útiles para fortalecer tu relación.',
  keywords: 'blog terapia pareja, consejos relaciones, artículos psicología, terapia Medellín, relaciones saludables',
  openGraph: {
    title: 'Blog - Terapia de Pareja Medellín',
    description: 'Artículos y consejos sobre terapia de pareja, relaciones saludables y bienestar emocional.',
    url: `${siteConfig.url}/blog`,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/images/blog-og.jpg`,
        width: 1200,
        height: 630,
        alt: 'Blog de Terapia de Pareja Medellín',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Terapia de Pareja Medellín',
    description: 'Artículos y consejos sobre terapia de pareja, relaciones saludables y bienestar emocional.',
    images: [`${siteConfig.url}/images/blog-og.jpg`],
  },
  alternates: {
    canonical: `${siteConfig.url}/blog`,
  },
};

export const runtime = 'edge'

export default async function BlogPage() {
  // Intentar cargar posts iniciales del servidor
  let initialPosts: WordPressPost[] = [];
  let initialTotalPages = 0;
  let initialTotal = 0;

  try {
    const { posts, totalPages, total } = await getPosts({
      per_page: 6,
      page: 1,
      orderby: 'date',
      order: 'desc'
    });
    
    initialPosts = posts;
    initialTotalPages = totalPages;
    initialTotal = total;
  } catch (error) {
    console.error('Error loading initial posts:', error);
    // Los posts se cargarán del lado del cliente si falla la carga del servidor
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 pt-4">
        <BreadcrumbNavigation className="mb-6" />
      </div>
      
      {/* Hero Section */}
      <section className="pt-16 pb-16 md:pt-24 md:pb-28 bg-background text-foreground">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-secondary text-primary-foreground rounded-full font-medium text-sm mb-6">
              Recursos para tu relación
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-tight mb-6">
              <span className="bg-gradient-to-r from-primary-foreground to-accent text-transparent bg-clip-text">
                Blog de Terapia
              </span>
              <span className="block text-foreground">
                de Pareja
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-muted-foreground">
              Consejos, recursos y artículos para fortalecer tu relación
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Descubre estrategias efectivas, técnicas de comunicación y herramientas 
              prácticas para construir relaciones más saludables y duraderas.
            </p>
          </div>
        </div>
      </section>

      {/* Contenido principal */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <PostList 
            initialPosts={initialPosts}
            initialTotalPages={initialTotalPages}
            initialTotal={initialTotal}
          />
        </div>
      </section>

      {/* Sección de recursos adicionales */}
      <section className="py-24 bg-background text-foreground">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="max-w-4xl mx-auto bg-card rounded-3xl shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-2">
              {/* Lado izquierdo con fondo degradado */}
              <div className="py-8 px-6 sm:px-10 md:py-12 md:px-12 bg-primary text-foreground">
                <h2 className="text-2xl sm:text-3xl font-bold mb-6">¿Necesitas ayuda profesional?</h2>
                <p className="mb-8 text-foreground/90">
                  Si estás pasando por dificultades en tu relación, no dudes en buscar 
                  ayuda profesional. Estoy aquí para acompañarte en este proceso.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <span className="text-sm text-foreground/80">✓ Consultas presenciales y virtuales</span>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-sm text-foreground/80">✓ Enfoque personalizado para cada pareja</span>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-sm text-foreground/80">✓ Más de 10 años de experiencia</span>
                  </div>
                </div>
              </div>

              {/* Lado derecho con fondo claro */}
              <div className="p-8 md:p-12 bg-background">
                <h3 className="text-2xl font-bold text-foreground mb-6 text-center">Comienza hoy</h3>
                <div className="space-y-4">
                  <a 
                    href="/contacto" 
                    className="w-full bg-gradient-to-r from-primary-foreground to-accent text-white hover:opacity-90 rounded-full py-6 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 font-semibold"
                  >
                    Agendar Consulta
                  </a>
                  <a 
                    href="/sobre-mi" 
                    className="w-full border-secondary text-secondary-foreground hover:bg-secondary hover:text-secondary-foreground hover:border-border rounded-full py-6 transition-all flex items-center justify-center gap-2 font-semibold border"
                  >
                    Conoce más sobre mí
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Blog de Terapia de Pareja Medellín",
            "description": "Artículos y consejos sobre terapia de pareja, relaciones saludables y bienestar emocional",
            "url": `${siteConfig.url}/blog`,
            "publisher": {
              "@type": "Person",
              "name": siteConfig.author,
              "url": siteConfig.url
            },
            "inLanguage": "es-ES",
            "about": {
              "@type": "Thing",
              "name": "Terapia de Pareja",
              "description": "Servicios profesionales de terapia de pareja y consejería matrimonial"
            }
          })
        }}
      />
    </div>
  );
}
