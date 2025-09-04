import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PostList from '@/components/blog/PostList';
import { getPosts, getCategories, WordPressPost } from '@/lib/wordpress';
import { siteConfig } from '@/lib/config';
import BreadcrumbNavigation from '@/components/BreadcrumbNavigation';

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generar metadata dinámico para categorías
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find(cat => cat.slug === slug);

  if (!category) {
    return {
      title: 'Categoría no encontrada - Terapia de Pareja Medellín',
      description: 'La categoría que buscas no existe.',
    };
  }

  return {
    title: `${category.name} - Blog Terapia de Pareja Medellín`,
    description: category.description || `Artículos sobre ${category.name.toLowerCase()} en terapia de pareja y relaciones.`,
    keywords: `${category.name}, terapia de pareja, blog, artículos, Medellín`,
    openGraph: {
      title: `${category.name} - Blog Terapia de Pareja Medellín`,
      description: category.description || `Artículos sobre ${category.name.toLowerCase()} en terapia de pareja y relaciones.`,
      url: `${siteConfig.url}/blog/categoria/${category.slug}`,
      siteName: siteConfig.name,
      locale: 'es_ES',
      type: 'website',
    },
    alternates: {
      canonical: `${siteConfig.url}/blog/categoria/${category.slug}`,
    },
  };
}

// Generar rutas estáticas para categorías
export async function generateStaticParams() {
  try {
    const categories = await getCategories();
    
    return categories.map((category) => ({
      slug: category.slug,
    }));
  } catch (error) {
    console.error('Error generating static params for categories:', error);
    return [];
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find(cat => cat.slug === slug);

  if (!category) {
    notFound();
  }

  // Cargar posts iniciales de la categoría
  let initialPosts: WordPressPost[] = [];
  let initialTotalPages = 0;
  let initialTotal = 0;

  try {
    const { posts, totalPages, total } = await getPosts({
      per_page: 6,
      page: 1,
      categories: category.id.toString(),
      orderby: 'date',
      order: 'desc'
    });
    
    initialPosts = posts;
    initialTotalPages = totalPages;
    initialTotal = total;
  } catch (error) {
    console.error('Error loading category posts:', error);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 pt-4">
        <BreadcrumbNavigation 
          className="mb-6" 
          customItems={[
            { label: "Blog", href: "/blog" },
            { label: category.name, href: `/blog/categoria/${category.slug}` }
          ]}
        />
      </div>
      {/* Hero Section */}
      <section className="bg-primary text-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {category.name}
            </h1>
            
            {category.description && (
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                {category.description}
              </p>
            )}
            
            <p className="text-lg text-blue-200">
              {category.count} artículo{category.count !== 1 ? 's' : ''} en esta categoría
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
            categorySlug={category.id.toString()}
          />
        </div>
      </section>

      {/* Otras categorías */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Otras categorías
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories
                .filter(cat => cat.id !== category.id && cat.count > 0)
                .slice(0, 8)
                .map((cat) => (
                  <a
                    key={cat.id}
                    href={`/blog/categoria/${cat.slug}`}
                    className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all text-center group"
                  >
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {cat.count} artículo{cat.count !== 1 ? 's' : ''}
                    </p>
                  </a>
                ))
              }
            </div>
            
            <div className="text-center mt-8">
              <a 
                href="/blog" 
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
              >
                Ver todos los artículos →
              </a>
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
            "@type": "CollectionPage",
            "name": `${category.name} - Blog Terapia de Pareja Medellín`,
            "description": category.description || `Artículos sobre ${category.name.toLowerCase()} en terapia de pareja y relaciones.`,
            "url": `${siteConfig.url}/blog/categoria/${category.slug}`,
            "isPartOf": {
              "@type": "Blog",
              "name": "Blog de Terapia de Pareja Medellín",
              "url": `${siteConfig.url}/blog`
            },
            "about": {
              "@type": "Thing",
              "name": category.name,
              "description": category.description
            },
            "publisher": {
              "@type": "Person",
              "name": siteConfig.author,
              "url": siteConfig.url
            },
            "inLanguage": "es-ES"
          })
        }}
      />
    </div>
  );
}