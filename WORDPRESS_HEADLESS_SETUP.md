# Configuración de WordPress Headless para Blog

Esta guía te ayudará a configurar WordPress como CMS headless para manejar el blog de tu sitio Next.js.

## 1. Configuración de WordPress Local

### 1.1 Habilitar API REST de WordPress

WordPress incluye la API REST por defecto desde la versión 4.7. Verifica que esté habilitada:

1. Ve a tu WordPress admin: `http://localhost/tu-sitio/wp-admin`
2. Verifica que la API funcione visitando: `http://localhost/tu-sitio/wp-json/wp/v2/posts`

### 1.2 Instalar Plugins Necesarios

**Plugins recomendados:**

1. **Advanced Custom Fields (ACF)** - Para campos personalizados
2. **ACF to REST API** - Expone campos ACF en la API
3. **JWT Authentication for WP-API** - Para autenticación segura
4. **WP REST API Cache** - Para mejorar rendimiento
5. **Rank Math SEO** - Para metadatos SEO (mejor alternativa a Yoast)

### 1.3 Configurar CORS (Cross-Origin Resource Sharing)

Agrega esto al archivo `functions.php` de tu tema:

```php
// Habilitar CORS para la API REST
function add_cors_http_header(){
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
}
add_action('init','add_cors_http_header');

// Permitir acceso a la API REST sin autenticación para lectura
function allow_any_rest_request( $access ) {
    return true;
}
add_filter( 'rest_authentication_errors', 'allow_any_rest_request' );
```

### 1.4 Configurar Campos Personalizados (ACF)

Crea grupos de campos para posts del blog:

1. **Información del Post:**
   - `featured_image_alt`: Texto alternativo para imagen destacada
   - `excerpt_custom`: Extracto personalizado
   - `reading_time`: Tiempo de lectura estimado

2. **SEO Personalizado:**
   - `meta_description`: Meta descripción personalizada
   - `meta_keywords`: Palabras clave

## 2. Configuración en Next.js

### 2.1 Instalar Dependencias

```bash
npm install axios
# o
pnpm add axios
```

### 2.2 Variables de Entorno

Crea/actualiza el archivo `.env.local`:

```env
# WordPress API Configuration
WORDPRESS_API_URL=http://localhost/tu-sitio/wp-json/wp/v2
WORDPRESS_SITE_URL=http://localhost/tu-sitio
```

### 2.3 Configuración de la API

Crea `lib/wordpress.ts`:

```typescript
import axios from 'axios';

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || 'http://localhost/tu-sitio/wp-json/wp/v2';

const api = axios.create({
  baseURL: WORDPRESS_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Tipos de datos
export interface WordPressPost {
  id: number;
  date: string;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  featured_media: number;
  categories: number[];
  tags: number[];
  acf?: {
    featured_image_alt?: string;
    excerpt_custom?: string;
    reading_time?: string;
    meta_description?: string;
    meta_keywords?: string;
  };
}

export interface WordPressCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
}

export interface WordPressMedia {
  id: number;
  source_url: string;
  alt_text: string;
  media_details: {
    width: number;
    height: number;
    sizes: {
      [key: string]: {
        source_url: string;
        width: number;
        height: number;
      };
    };
  };
}

// Funciones de la API
export async function getPosts(params?: {
  per_page?: number;
  page?: number;
  categories?: string;
  search?: string;
}): Promise<WordPressPost[]> {
  try {
    const response = await api.get('/posts', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function getPost(slug: string): Promise<WordPressPost | null> {
  try {
    const response = await api.get('/posts', {
      params: { slug, _embed: true }
    });
    return response.data[0] || null;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export async function getCategories(): Promise<WordPressCategory[]> {
  try {
    const response = await api.get('/categories');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function getMedia(id: number): Promise<WordPressMedia | null> {
  try {
    const response = await api.get(`/media/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching media:', error);
    return null;
  }
}

export async function getFeaturedImage(post: WordPressPost): Promise<string | null> {
  if (!post.featured_media) return null;
  
  const media = await getMedia(post.featured_media);
  return media?.source_url || null;
}
```

## 3. Crear Componentes de Blog

### 3.1 Componente de Lista de Posts

Crea `components/blog/PostList.tsx`:

```typescript
import { WordPressPost } from '@/lib/wordpress';
import Link from 'next/link';
import Image from 'next/image';

interface PostListProps {
  posts: WordPressPost[];
}

export default function PostList({ posts }: PostListProps) {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          {post.featured_media && (
            <div className="aspect-video relative">
              <Image
                src={`${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-content/uploads/...`}
                alt={post.acf?.featured_image_alt || post.title.rendered}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">
              <Link 
                href={`/blog/${post.slug}`}
                className="hover:text-blue-600 transition-colors"
              >
                {post.title.rendered}
              </Link>
            </h2>
            <div 
              className="text-gray-600 mb-4 line-clamp-3"
              dangerouslySetInnerHTML={{ 
                __html: post.acf?.excerpt_custom || post.excerpt.rendered 
              }}
            />
            <div className="flex justify-between items-center text-sm text-gray-500">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('es-ES')}
              </time>
              {post.acf?.reading_time && (
                <span>{post.acf.reading_time} min de lectura</span>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
```

### 3.2 Componente de Post Individual

Crea `components/blog/PostContent.tsx`:

```typescript
import { WordPressPost } from '@/lib/wordpress';
import Image from 'next/image';

interface PostContentProps {
  post: WordPressPost;
  featuredImage?: string;
}

export default function PostContent({ post, featuredImage }: PostContentProps) {
  return (
    <article className="max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title.rendered}</h1>
        <div className="flex items-center gap-4 text-gray-600 mb-6">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
          {post.acf?.reading_time && (
            <span>{post.acf.reading_time} minutos de lectura</span>
          )}
        </div>
        {featuredImage && (
          <div className="aspect-video relative mb-8">
            <Image
              src={featuredImage}
              alt={post.acf?.featured_image_alt || post.title.rendered}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        )}
      </header>
      
      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />
    </article>
  );
}
```

## 4. Crear Páginas de Blog

### 4.1 Página Principal del Blog

Crea `app/blog/page.tsx`:

```typescript
import { getPosts, getCategories } from '@/lib/wordpress';
import PostList from '@/components/blog/PostList';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - Terapia de Pareja Medellín',
  description: 'Artículos y consejos sobre terapia de pareja, relaciones y bienestar emocional.',
};

export default async function BlogPage() {
  const posts = await getPosts({ per_page: 12 });
  const categories = await getCategories();

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Artículos y consejos sobre terapia de pareja, relaciones y bienestar emocional
        </p>
      </header>
      
      <PostList posts={posts} />
    </div>
  );
}
```

### 4.2 Página de Post Individual

Crea `app/blog/[slug]/page.tsx`:

```typescript
import { getPost, getFeaturedImage, getPosts } from '@/lib/wordpress';
import PostContent from '@/components/blog/PostContent';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getPost(params.slug);
  
  if (!post) {
    return {
      title: 'Post no encontrado',
    };
  }

  return {
    title: `${post.title.rendered} - Blog`,
    description: post.acf?.meta_description || post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 160),
    keywords: post.acf?.meta_keywords,
    openGraph: {
      title: post.title.rendered,
      description: post.acf?.meta_description || post.excerpt.rendered.replace(/<[^>]*>/g, ''),
      type: 'article',
      publishedTime: post.date,
    },
  };
}

export async function generateStaticParams() {
  const posts = await getPosts({ per_page: 100 });
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPost(params.slug);
  
  if (!post) {
    notFound();
  }

  const featuredImage = await getFeaturedImage(post);

  return (
    <div className="container mx-auto px-4 py-8">
      <PostContent post={post} featuredImage={featuredImage} />
    </div>
  );
}
```

## 5. Actualizar Navegación

### 5.1 Agregar Blog al Header

Actualiza `components/header.tsx` para incluir el enlace al blog:

```typescript
// Agregar "Blog" a la navegación
const navigation = [
  { name: 'Inicio', href: '/' },
  { name: 'Sobre mí', href: '/sobre-mi' },
  { name: 'Servicios', href: '/asesorias-de-pareja' },
  { name: 'Blog', href: '/blog' }, // Nuevo
  { name: 'Contacto', href: '/contacto' },
];
```

## 6. Configurar Sitemap para Blog

### 6.1 Actualizar sitemap.ts

Actualiza `app/sitemap.ts`:

```typescript
import { getPosts } from '@/lib/wordpress';

export default async function sitemap() {
  const posts = await getPosts({ per_page: 100 });
  
  const blogUrls = posts.map((post) => ({
    url: `https://terapiadeparejamedellin.com/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    // URLs existentes...
    {
      url: 'https://terapiadeparejamedellin.com/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...blogUrls,
  ];
}
```

## 7. Próximos Pasos

1. **Configurar autenticación JWT** para operaciones de escritura
2. **Implementar caché** para mejorar rendimiento
3. **Agregar paginación** en la lista de posts
4. **Crear filtros por categorías**
5. **Implementar búsqueda** en el blog
6. **Optimizar imágenes** con Next.js Image
7. **Configurar ISR** (Incremental Static Regeneration)

## 8. Comandos Útiles

```bash
# Verificar API de WordPress
curl http://localhost/tu-sitio/wp-json/wp/v2/posts

# Instalar dependencias
pnpm add axios

# Ejecutar en desarrollo
pnpm dev
```

## 9. Troubleshooting

### Problema: CORS Error
**Solución:** Verificar configuración CORS en `functions.php`

### Problema: API no responde
**Solución:** Verificar que WordPress esté ejecutándose y la URL sea correcta

### Problema: Imágenes no cargan
**Solución:** Configurar dominio de imágenes en `next.config.mjs`

---

¡Tu configuración de WordPress Headless está lista! 🚀