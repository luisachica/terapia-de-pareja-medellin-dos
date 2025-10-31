'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  CalendarDays, 
  Clock, 
  User, 
  ArrowLeft, 
  Share2, 
  Facebook, 
  Twitter, 
  Linkedin,
  Copy,
  Check,
  List
} from 'lucide-react';
import { 
  WordPressPost,
  getFeaturedImageUrl,
  getFeaturedImageAlt,
  getPostCategories,
  getPostTags,
  getPostAuthor,
  formatDate,
  getReadingTime
} from '@/lib/wordpress';
import Comments from './Comments';

interface PostContentProps {
  post: WordPressPost;
}

interface TableOfContentsItem {
  id: string;
  text: string;
  level: number;
}

export default function PostContent({ post }: PostContentProps) {
  const [copied, setCopied] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [tableOfContents, setTableOfContents] = useState<TableOfContentsItem[]>([]);

  const featuredImage = getFeaturedImageUrl(post, 'large');
  const categories = getPostCategories(post);
  const tags = getPostTags(post);
  const author = getPostAuthor(post);
  const readingTime = getReadingTime(post);
  const postUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(post.title.rendered)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`
  };

  // Función para extraer encabezados y generar tabla de contenido
  const extractTableOfContents = (content: string): TableOfContentsItem[] => {
    // Verificar si estamos en el cliente
    if (typeof window === 'undefined') {
      return [];
    }
    
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const headings = doc.querySelectorAll('h2, h3');
    
    return Array.from(headings).map((heading, index) => {
      const text = heading.textContent || '';
      const level = parseInt(heading.tagName.charAt(1));
      const id = `heading-${index}-${text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;
      
      // Agregar ID al encabezado para navegación
      heading.id = id;
      
      return { id, text, level };
    });
  };

  // Función para transformar enlaces internos del CMS a URLs del sitio headless
  const transformInternalLinks = (content: string): string => {
    if (typeof window === 'undefined') return content;
    
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const links = doc.querySelectorAll('a[href]');
    
    // Lista de páginas del sitio (no posts del blog)
    const sitePages = [
      'consultas-de-pareja',
      'asesorias-de-pareja',
      'talleres-de-pareja',
      'sobre-mi',
      'contacto',
      'preguntas-frecuentes'
    ];
    
    links.forEach((link) => {
      const href = link.getAttribute('href');
      if (href) {
        // Transformar enlaces del CMS de WordPress a URLs del sitio headless
        if (href.includes('cms.terapiadeparejamedellin.com')) {
          // Extraer el slug del artículo de la URL del CMS
          const slugMatch = href.match(/\/([^/]+)\/?$/);
          if (slugMatch && slugMatch[1]) {
            const slug = slugMatch[1];
            
            // Verificar si es una página del sitio o un post del blog
            if (sitePages.includes(slug)) {
              // Es una página del sitio, mantener la estructura original
              link.setAttribute('href', `/${slug}`);
            } else {
              // Es un post del blog, agregar /blog/
              link.setAttribute('href', `/blog/${slug}`);
            }
          }
        }
        // También manejar enlaces relativos
        else if (href.match(/^\/?[^/]+\/?$/) && !href.startsWith('#') && !href.includes('.')) {
          // Si es un slug simple, verificar si es página del sitio o post del blog
          const cleanSlug = href.replace(/^\/?/, '').replace(/\/?$/, '');
          if (cleanSlug && cleanSlug !== 'blog') {
            if (sitePages.includes(cleanSlug)) {
              // Es una página del sitio
              link.setAttribute('href', `/${cleanSlug}`);
            } else {
              // Es un post del blog
              link.setAttribute('href', `/blog/${cleanSlug}`);
            }
          }
        }
        // Manejar enlaces que ya tienen /blog/ pero apuntan a páginas del sitio
        else if (href.startsWith('/blog/')) {
          const slug = href.replace('/blog/', '').replace(/\/?$/, '');
          if (sitePages.includes(slug)) {
            // Corregir: es una página del sitio, no un post del blog
            link.setAttribute('href', `/${slug}`);
          }
        }
      }
    });
    
    return doc.body.innerHTML;
  };

  // Procesar contenido y generar tabla de contenido
  const processedContent = React.useMemo(() => {
    const toc = extractTableOfContents(post.content.rendered);
    setTableOfContents(toc);
    
    // Agregar IDs a los encabezados en el contenido (solo en el cliente)
    if (typeof window !== 'undefined') {
      const parser = new DOMParser();
      const doc = parser.parseFromString(post.content.rendered, 'text/html');
      const headings = doc.querySelectorAll('h2, h3');
      
      headings.forEach((heading, index) => {
        const text = heading.textContent || '';
        const id = `heading-${index}-${text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;
        heading.id = id;
      });
      
      // Transformar enlaces internos después de procesar encabezados
      let contentWithTransformedLinks = transformInternalLinks(doc.body.innerHTML);
      
      // Envolver tablas en contenedor responsive
      contentWithTransformedLinks = contentWithTransformedLinks.replace(
        /<table([^>]*)>/gi,
        '<div class="table-container"><table$1>'
      );
      contentWithTransformedLinks = contentWithTransformedLinks.replace(
        /<\/table>/gi,
        '</table></div>'
      );
      
      return contentWithTransformedLinks;
    }
    
    // En el servidor, devolver el contenido sin procesar
    return post.content.rendered;
  }, [post.content.rendered]);

  return (
    <article className="max-w-4xl mx-auto">
      {/* Navegación de regreso */}
      <div className="mb-6">
        <Link href="/blog">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Volver al blog
          </Button>
        </Link>
      </div>

      {/* Imagen destacada */}
      {featuredImage && (
        <div className="relative h-64 md:h-96 mb-8 rounded-3xl overflow-hidden">
          <Image
            src={featuredImage}
            alt={getFeaturedImageAlt(post)}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Categorías */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((category) => (
            <Link key={category.id} href={`/blog/categoria/${category.slug}`}>
              <Badge variant="secondary" className="hover:bg-secondary/80 transition-colors rounded-full">
                {category.name}
              </Badge>
            </Link>
          ))}
        </div>
      )}

      {/* Título */}
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
        {post.title.rendered}
      </h1>

      {/* Metadatos */}
      <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4" />
          <span>{formatDate(post.date)}</span>
        </div>
        
        {readingTime && (
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{readingTime} de lectura</span>
          </div>
        )}
        
        {author && (
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Por {author.name}</span>
          </div>
        )}
      </div>

      {/* Botones de compartir */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-8 p-4 bg-secondary rounded-3xl">
        <span className="text-sm font-medium text-secondary-foreground">Compartir:</span>
        
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3 sm:gap-3 w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(shareLinks.facebook, '_blank')}
            className="gap-2 rounded-full border-secondary-foreground/20 text-secondary-foreground hover:bg-secondary-foreground/10 flex-shrink-0 justify-center sm:justify-start"
          >
            <Facebook className="h-4 w-4" />
            <span className="hidden sm:inline">Facebook</span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(shareLinks.twitter, '_blank')}
            className="gap-2 rounded-full border-secondary-foreground/20 text-secondary-foreground hover:bg-secondary-foreground/10 flex-shrink-0 justify-center sm:justify-start"
          >
            <Twitter className="h-4 w-4" />
            <span className="hidden sm:inline">Twitter</span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(shareLinks.linkedin, '_blank')}
            className="gap-2 rounded-full border-secondary-foreground/20 text-secondary-foreground hover:bg-secondary-foreground/10 flex-shrink-0 justify-center sm:justify-start"
          >
            <Linkedin className="h-4 w-4" />
            <span className="hidden sm:inline">LinkedIn</span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyLink}
            className="gap-2 rounded-full border-secondary-foreground/20 text-secondary-foreground hover:bg-secondary-foreground/10 flex-shrink-0 justify-center sm:justify-start"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            <span className="hidden sm:inline">{copied ? 'Copiado' : 'Copiar enlace'}</span>
          </Button>
        </div>
      </div>

      {/* Tabla de contenido */}
      {tableOfContents.length > 0 && (
        <div className="mb-8 p-6 bg-muted/30 rounded-lg border border-border/50">
          <div className="flex items-center gap-2 mb-4">
            <List className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Tabla de contenido</h3>
          </div>
          <nav className="space-y-2">
            {tableOfContents.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`block text-sm hover:text-primary transition-colors ${
                  item.level === 2 
                    ? 'font-medium text-foreground' 
                    : 'ml-4 text-muted-foreground'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.id)?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                  });
                }}
              >
                {item.text}
              </a>
            ))}
          </nav>
        </div>
      )}

      {/* Contenido del post */}
      <div className="max-w-none">
        <div 
          className="post-content [&>h2]:text-4xl [&>h2]:font-bold [&>h2]:text-foreground [&>h2]:mt-16 [&>h2]:mb-8 [&>h2]:px-6 [&>h2]:py-4 [&>h2]:bg-gradient-to-r [&>h2]:from-primary/5 [&>h2]:to-transparent [&>h2]:rounded-lg [&>h2]:shadow-sm [&>h2]:border-l-4 [&>h2]:border-primary/20 [&>h3]:text-3xl [&>h3]:font-semibold [&>h3]:text-foreground [&>h3]:mt-12 [&>h3]:mb-6 [&>h3]:px-4 [&>h3]:py-3 [&>h3]:bg-muted/30 [&>h3]:rounded-md [&>h3]:shadow-sm [&>h4]:text-xl [&>h4]:font-medium [&>h4]:text-primary [&>h4]:mt-8 [&>h4]:mb-4 [&>p]:mb-6 [&>p]:text-foreground [&>p]:leading-relaxed [&>p]:text-lg [&_a]:text-primary [&_a]:font-medium [&_a]:underline [&_a]:decoration-primary/30 [&_a]:underline-offset-4 [&_a]:transition-all [&_a]:duration-200 hover:[&_a]:decoration-primary [&_a]:hover:text-primary/80 [&_a]:hover:bg-primary/5 [&_a]:px-1 [&_a]:py-0.5 [&_a]:rounded-md [&_a]:mx-0.5"
          dangerouslySetInnerHTML={{ 
            __html: processedContent 
          }}
        />
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="mt-12 pt-8 border-t border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Etiquetas:</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link key={tag.id} href={`/blog/etiqueta/${tag.slug}`}>
                <Badge variant="outline" className="hover:bg-secondary transition-colors rounded-full">
                  #{tag.name}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Información del autor */}
      {author && (
        <div className="mt-12 pt-8 border-t border-border">
          <div className="bg-secondary rounded-3xl p-6">
            <h3 className="text-lg font-semibold text-secondary-foreground mb-3">Sobre el autor</h3>
            <div className="flex items-start gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src="/images/sobre-mi.webp"
                  alt={author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-semibold text-secondary-foreground mb-2">{author.name}</h4>
                {/* Descripción personalizada para Yolanda Osorio */}
                {author.name === 'Yolanda Osorio' ? (
                  <p className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed">
                    Soy psicóloga profesional y terapeuta. Cuento con un Máster en Sexología y Terapia de Pareja, y mi especialidad es ayudar a parejas a sanar heridas del pasado, gestionar conflictos y reconectar desde un lugar más auténtico. Mi enfoque se basa en la evidencia y en métodos como Gottman y TFE, diseñados para ayudarles a que "vuelvan a mirarse con amor".
                  </p>
                ) : (
                  author.description && (
                    <p className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed">
                      {author.description}
                    </p>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navegación a otros posts */}
      <div className="mt-12 pt-8 border-t border-border">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <Link href="/blog">
            <Button variant="outline" className="gap-2 rounded-full border-secondary text-secondary-foreground hover:bg-secondary hover:text-secondary-foreground">
              <ArrowLeft className="h-4 w-4" />
              Ver todos los artículos
            </Button>
          </Link>
          
          {categories.length > 0 && (
            <Link href={`/blog/categoria/${categories[0].slug}`}>
              <Button variant="outline" className="rounded-full border-secondary text-secondary-foreground hover:bg-secondary hover:text-secondary-foreground">
                Más en {categories[0].name}
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Estilos adicionales para el contenido */}
      <style jsx global>{`
        .post-content img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 1.5rem 0;
        }
        
        .post-content pre {
          background-color: #f8f9fa;
          padding: 1rem;
          border-radius: 6px;
          overflow-x: auto;
          margin: 1.5rem 0;
        }
        
        .post-content code {
          background-color: #f1f3f4;
          padding: 0.2rem 0.4rem;
          border-radius: 3px;
          font-size: 0.9em;
        }
        
        /* Estilos mejorados para tablas */
        .post-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 2rem 0;
          background: hsl(var(--card));
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          border: 1px solid hsl(var(--border));
        }
        
        .post-content th,
        .post-content td {
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid hsl(var(--border));
          vertical-align: top;
        }
        
        .post-content th {
          background: linear-gradient(135deg, hsl(var(--primary)/0.1) 0%, hsl(var(--primary)/0.05) 100%);
          color: hsl(var(--primary-foreground));
          font-weight: 600;
          font-size: 0.95rem;
          letter-spacing: 0.025em;
          text-transform: uppercase;
          border-bottom: 2px solid hsl(var(--primary)/0.2);
        }
        
        .post-content td {
          color: hsl(var(--foreground));
          font-size: 0.95rem;
          line-height: 1.6;
        }
        
        .post-content tr:last-child td {
          border-bottom: none;
        }
        
        .post-content tr:hover {
          background: hsl(var(--muted)/0.3);
          transition: background-color 0.2s ease;
        }
        
        /* Estilos para caption/leyenda de tabla */
         .post-content table caption {
           caption-side: bottom;
           margin-top: 0.75rem;
           font-size: 0.875rem;
           color: hsl(var(--muted-foreground));
           font-style: italic;
           text-align: center;
           padding: 0.5rem 1rem;
           background: hsl(var(--muted)/0.3);
           border-radius: 0 0 8px 8px;
           border-top: 1px solid hsl(var(--border));
           display: block;
           width: 100%;
         }
         
         /* Contenedor de tabla responsive */
         .post-content .table-container {
           overflow-x: auto;
           margin: 2rem 0;
           border-radius: 12px;
           border: 1px solid hsl(var(--border));
           background: hsl(var(--card));
           box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
         }
         
         .post-content .table-container table {
           margin: 0;
           border: none;
           box-shadow: none;
           border-radius: 0;
           background: transparent;
         }
         
         /* Responsive para tablas */
         @media (max-width: 768px) {
           .post-content .table-container {
             margin: 1.5rem -1rem;
             border-radius: 0;
             border-left: none;
             border-right: none;
           }
           
           .post-content table {
             font-size: 0.8rem;
             min-width: 100%;
           }
           
           .post-content th,
           .post-content td {
             padding: 0.5rem 0.4rem;
             font-size: 0.8rem;
           }
           
           .post-content th {
             font-size: 0.75rem;
           }
           
           .post-content table caption {
             font-size: 0.75rem;
             margin-top: 0.5rem;
             padding: 0.4rem 0.5rem;
             line-height: 1.4;
           }
         }
         
         /* Mejoras adicionales para móviles muy pequeños */
         @media (max-width: 480px) {
           .post-content .table-container {
             margin: 1rem -0.5rem;
           }
           
           .post-content table {
             font-size: 0.75rem;
           }
           
           .post-content th,
           .post-content td {
             padding: 0.4rem 0.3rem;
             font-size: 0.75rem;
           }
           
           .post-content th {
             font-size: 0.7rem;
             letter-spacing: 0.01em;
           }
           
           .post-content table caption {
             font-size: 0.7rem;
             padding: 0.3rem 0.4rem;
           }
         }
        
        /* Estilos mejorados para enlaces internos y externos */
        .post-content a {
          position: relative;
          display: inline-block;
          text-decoration: none;
          border-bottom: 2px solid transparent;
          transition: all 0.3s ease;
        }
        
        .post-content a:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        
        /* Enlaces internos (que apuntan al mismo dominio) */
        .post-content a[href*="terapiadeparejamedellin.com"],
        .post-content a[href^="/"],
        .post-content a[href^="#"] {
          background: linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary)/0.8) 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          border-bottom-color: hsl(var(--primary)/0.3);
        }
        
        .post-content a[href*="terapiadeparejamedellin.com"]:hover,
        .post-content a[href^="/"]:hover,
        .post-content a[href^="#"]:hover {
          border-bottom-color: hsl(var(--primary));
          background: hsl(var(--primary)/0.05);
          -webkit-text-fill-color: hsl(var(--primary));
        }
        
        /* Enlaces externos */
        .post-content a[href^="http"]:not([href*="terapiadeparejamedellin.com"]) {
          color: hsl(var(--secondary-foreground));
          border-bottom-color: hsl(var(--secondary-foreground)/0.3);
        }
        
        .post-content a[href^="http"]:not([href*="terapiadeparejamedellin.com"]):hover {
          color: hsl(var(--secondary-foreground)/0.8);
          border-bottom-color: hsl(var(--secondary-foreground));
          background: hsl(var(--secondary)/0.5);
        }
        
        /* Indicador visual para enlaces externos */
        .post-content a[href^="http"]:not([href*="terapiadeparejamedellin.com"]):after {
          content: "↗";
          font-size: 0.8em;
          margin-left: 0.2em;
          opacity: 0.6;
        }
        
        /* Estilos para listas con enlaces */
        .post-content ul li a,
        .post-content ol li a {
          margin: 0 0.2em;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
          .post-content a {
            padding: 0.3rem 0.5rem;
            margin: 0.1rem;
          }
        }
      `}</style>
      
      {/* Sección de comentarios */}
      <Comments postId={post.id.toString()} postTitle={post.title.rendered} />
    </article>
  );
}