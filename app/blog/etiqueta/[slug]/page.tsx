import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PostList from '@/components/blog/PostList';
import { getPosts, getTags, WordPressPost } from '@/lib/wordpress';
import { siteConfig } from '@/lib/config';
import BreadcrumbNavigation from '@/components/BreadcrumbNavigation';

interface TagPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generar metadata dinámico para etiquetas
export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tags = await getTags();
  const tag = tags.find(t => t.slug === slug);

  if (!tag) {
    return {
      title: 'Etiqueta no encontrada - Terapia de Pareja Medellín',
      description: 'La etiqueta que buscas no existe.',
    };
  }

  return {
    title: `#${tag.name} - Blog Terapia de Pareja Medellín`,
    description: tag.description || `Artículos etiquetados con ${tag.name} en terapia de pareja y relaciones.`,
    keywords: `${tag.name}, terapia de pareja, blog, artículos, Medellín`,
    openGraph: {
      title: `#${tag.name} - Blog Terapia de Pareja Medellín`,
      description: tag.description || `Artículos etiquetados con ${tag.name} en terapia de pareja y relaciones.`,
      url: `${siteConfig.url}/blog/etiqueta/${tag.slug}`,
      siteName: siteConfig.name,
      locale: 'es_ES',
      type: 'website',
    },
    alternates: {
      canonical: `${siteConfig.url}/blog/etiqueta/${tag.slug}`,
    },
  };
}

// Generar rutas estáticas para etiquetas más populares
export async function generateStaticParams() {
  try {
    const tags = await getTags({
      orderby: 'count',
      order: 'desc',
      per_page: 20 // Solo las 20 etiquetas más populares
    });
    
    return tags.map((tag) => ({
      slug: tag.slug,
    }));
  } catch (error) {
    console.error('Error generating static params for tags:', error);
    return [];
  }
}

export default async function TagPage({ params }: TagPageProps) {
  const { slug } = await params;
  const tags = await getTags();
  const tag = tags.find(t => t.slug === slug);

  if (!tag) {
    notFound();
  }

  // Cargar posts iniciales de la etiqueta
  let initialPosts: WordPressPost[] = [];
  let initialTotalPages = 0;
  let initialTotal = 0;

  try {
    const { posts, totalPages, total } = await getPosts({
      per_page: 6,
      page: 1,
      tags: tag.id.toString(),
      orderby: 'date',
      order: 'desc'
    });
    
    initialPosts = posts;
    initialTotalPages = totalPages;
    initialTotal = total;
  } catch (error) {
    console.error('Error loading tag posts:', error);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 pt-4">
        <BreadcrumbNavigation 
          className="mb-6" 
          customItems={[
            { label: "Blog", href: "/blog" },
            { label: tag.name, href: `/blog/etiqueta/${tag.slug}` }
          ]}
        />
      </div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              #{tag.name}
            </h1>
            
            {tag.description && (
              <p className="text-xl md:text-2xl mb-8 text-purple-100">
                {tag.description}
              </p>
            )}
            
            <p className="text-lg text-purple-200">
              {tag.count} artículo{tag.count !== 1 ? 's' : ''} con esta etiqueta
            </p>
          </div>
        </div>
      </section>

      {/* Contenido principal */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <PostList 
            initialPosts={initialPosts}
            initialTotalPages={initialTotalPages}
            initialTotal={initialTotal}
          />
        </div>
      </section>

      {/* Etiquetas relacionadas */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Etiquetas relacionadas
            </h2>
            
            <div className="flex flex-wrap gap-3 justify-center">
              {tags
                .filter(t => t.id !== tag.id && t.count > 0)
                .sort((a, b) => b.count - a.count)
                .slice(0, 20)
                .map((t) => {
                  // Calcular el tamaño de la etiqueta basado en la popularidad
                  const maxCount = Math.max(...tags.map(tag => tag.count));
                  const minSize = 0.8;
                  const maxSize = 1.4;
                  const scale = minSize + (t.count / maxCount) * (maxSize - minSize);
                  
                  return (
                    <a
                      key={t.id}
                      href={`/blog/etiqueta/${t.slug}`}
                      className="inline-block px-3 py-2 bg-gray-100 hover:bg-purple-100 text-gray-700 hover:text-purple-700 rounded-full transition-all duration-200 hover:scale-105"
                      style={{ fontSize: `${scale}rem` }}
                    >
                      #{t.name}
                      <span className="ml-1 text-xs opacity-60">({t.count})</span>
                    </a>
                  );
                })
              }
            </div>
            
            <div className="text-center mt-8">
              <a 
                href="/blog" 
                className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium"
              >
                Ver todos los artículos →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de búsqueda */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              ¿No encuentras lo que buscas?
            </h2>
            <p className="text-gray-600 mb-8">
              Utiliza nuestro buscador para encontrar artículos específicos sobre terapia de pareja.
            </p>
            
            <form action="/blog" method="get" className="flex gap-2 max-w-md mx-auto">
              <input
                type="text"
                name="search"
                placeholder="Buscar artículos..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                Buscar
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": `#${tag.name} - Blog Terapia de Pareja Medellín`,
            "description": tag.description || `Artículos etiquetados con ${tag.name} en terapia de pareja y relaciones.`,
            "url": `${siteConfig.url}/blog/etiqueta/${tag.slug}`,
            "isPartOf": {
              "@type": "Blog",
              "name": "Blog de Terapia de Pareja Medellín",
              "url": `${siteConfig.url}/blog`
            },
            "about": {
              "@type": "Thing",
              "name": tag.name,
              "description": tag.description
            },
            "publisher": {
              "@type": "Person",
              "name": siteConfig.author,
              "url": siteConfig.url
            },
            "inLanguage": "es-ES",
            "keywords": tag.name
          })
        }}
      />
    </div>
  );
}