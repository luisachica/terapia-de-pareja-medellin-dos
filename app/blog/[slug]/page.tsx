import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PostContent from '@/components/blog/PostContent';
import { getPost, getPosts } from '@/lib/wordpress';
import { siteConfig } from '@/lib/config';
import BreadcrumbNavigation from '@/components/BreadcrumbNavigation';
import { 
  getFeaturedImageUrl, 
  getExcerpt, 
  getPostCategories,
  stripHtmlTags 
} from '@/lib/wordpress';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generar metadata dinámico para SEO
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.slug);

  if (!post) {
    return {
      title: 'Post no encontrado - Terapia de Pareja Medellín',
      description: 'El artículo que buscas no existe o ha sido movido.',
    };
  }

  const excerpt = getExcerpt(post, 160);
  const featuredImage = getFeaturedImageUrl(post, 'large');
  const categories = getPostCategories(post);
  const categoryNames = categories.map(cat => cat.name).join(', ');
  
  // Priorizar metadatos de Rank Math, luego ACF, luego valores por defecto
  // Usar og_title de Rank Math (título SEO específico) en lugar de title (que incluye sufijo del sitio)
  const metaTitle = post.rankmath?.og_title || post.rankmath?.title || post.title.rendered;
  const metaDescription = post.rankmath?.description || post.acf?.meta_description || excerpt;
  const metaKeywords = post.rankmath?.keywords || post.acf?.meta_keywords || 
    `${categoryNames}, terapia de pareja, ${post.title.rendered}, Medellín`;
  const canonicalUrl = post.rankmath?.canonical || `${siteConfig.url}/blog/${post.slug}`;
  
  // Open Graph data de Rank Math o valores por defecto
  const ogTitle = post.rankmath?.og_title || metaTitle;
  const ogDescription = post.rankmath?.og_description || metaDescription;
  const ogImage = post.rankmath?.og_image || featuredImage;
  
  // Twitter data de Rank Math o valores por defecto
  const twitterTitle = post.rankmath?.twitter_title || metaTitle;
  const twitterDescription = post.rankmath?.twitter_description || metaDescription;
  const twitterImage = post.rankmath?.twitter_image || featuredImage;

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: metaKeywords,
    authors: [{ name: siteConfig.author }],
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: `${siteConfig.url}/blog/${post.slug}`,
      siteName: siteConfig.name,
      images: ogImage ? [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: ogTitle,
        },
      ] : [],
      locale: 'es_ES',
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.modified,
      section: categoryNames,
      tags: categories.map(cat => cat.name),
    },
    twitter: {
      card: 'summary_large_image',
      title: twitterTitle,
      description: twitterDescription,
      images: twitterImage ? [twitterImage] : [],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

// Generar rutas estáticas para los posts más recientes (opcional)
export async function generateStaticParams() {
  try {
    const { posts } = await getPosts({ 
      per_page: 20, // Generar estáticamente los 20 posts más recientes
      orderby: 'date',
      order: 'desc'
    });
    
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const featuredImage = getFeaturedImageUrl(post, 'large');
  const categories = getPostCategories(post);
  const excerpt = getExcerpt(post, 160);

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 pt-4">
        <BreadcrumbNavigation 
          className="mb-6" 
          customItems={[
            { label: "Blog", href: "/blog" },
            { label: post.title.rendered, href: `/blog/${post.slug}` }
          ]}
        />
      </div>
      <div className="container mx-auto px-4 py-8">
        <PostContent post={post} />
      </div>

      {/* Schema.org structured data para el artículo */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title.rendered,
            "description": excerpt,
            "image": featuredImage ? [
              featuredImage
            ] : [],
            "datePublished": post.date,
            "dateModified": post.modified,
            "author": {
              "@type": "Person",
              "name": siteConfig.author,
              "url": siteConfig.url
            },
            "publisher": {
              "@type": "Organization",
              "name": siteConfig.name,
              "url": siteConfig.url,
              "logo": {
                "@type": "ImageObject",
                "url": `${siteConfig.url}/images/logo.png`
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `${siteConfig.url}/blog/${post.slug}`
            },
            "articleSection": categories.map(cat => cat.name),
            "keywords": categories.map(cat => cat.name).join(', '),
            "wordCount": stripHtmlTags(post.content.rendered).split(/\s+/).length,
            "inLanguage": "es-ES",
            "url": `${siteConfig.url}/blog/${post.slug}`,
            "isPartOf": {
              "@type": "Blog",
              "name": "Blog de Terapia de Pareja Medellín",
              "url": `${siteConfig.url}/blog`
            },
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