import axios from 'axios';

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || 'https://cms.terapiadeparejamedellin.com/wp-json/wp/v2';
const WORDPRESS_SITE_URL = process.env.WORDPRESS_SITE_URL || 'https://cms.terapiadeparejamedellin.com';

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
  date_gmt: string;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  author: number;
  featured_media: number;
  comment_status: string;
  ping_status: string;
  sticky: boolean;
  template: string;
  format: string;
  meta: any[];
  categories: number[];
  tags: number[];
  acf?: {
    featured_image_alt?: string;
    excerpt_custom?: string;
    reading_time?: string;
    meta_description?: string;
    meta_keywords?: string;
  };
  rankmath?: {
    title?: string;
    description?: string;
    keywords?: string;
    canonical?: string;
    og_title?: string;
    og_description?: string;
    og_image?: string;
    twitter_title?: string;
    twitter_description?: string;
    twitter_image?: string;
    schema?: any;
  };
  _embedded?: {
    author?: WordPressAuthor[];
    'wp:featuredmedia'?: WordPressMedia[];
    'wp:term'?: WordPressCategory[][];
  };
}

export interface WordPressCategory {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  parent: number;
  meta: any[];
}

export interface WordPressTag {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  meta: any[];
}

export interface WordPressAuthor {
  id: number;
  name: string;
  url: string;
  description: string;
  link: string;
  slug: string;
  avatar_urls: {
    [key: string]: string;
  };
  meta: any[];
}

export interface WordPressMedia {
  id: number;
  date: string;
  slug: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  author: number;
  comment_status: string;
  ping_status: string;
  template: string;
  meta: any[];
  description: {
    rendered: string;
  };
  caption: {
    rendered: string;
  };
  alt_text: string;
  media_type: string;
  mime_type: string;
  media_details: {
    width: number;
    height: number;
    file: string;
    sizes: {
      [key: string]: {
        file: string;
        width: number;
        height: number;
        mime_type: string;
        source_url: string;
      };
    };
    image_meta: {
      aperture: string;
      credit: string;
      camera: string;
      caption: string;
      created_timestamp: string;
      copyright: string;
      focal_length: string;
      iso: string;
      shutter_speed: string;
      title: string;
      orientation: string;
      keywords: string[];
    };
  };
  post: number;
  source_url: string;
}

export interface WordPressApiResponse<T> {
  data: T;
  headers: {
    'x-wp-total': string;
    'x-wp-totalpages': string;
  };
}

// Funciones de la API
export async function getPosts(params?: {
  per_page?: number;
  page?: number;
  categories?: string;
  tags?: string;
  search?: string;
  orderby?: 'date' | 'title' | 'menu_order';
  order?: 'asc' | 'desc';
  _embed?: boolean;
}): Promise<{ posts: WordPressPost[]; totalPages: number; total: number }> {
  try {
    const defaultParams = {
      per_page: 10,
      _embed: true,
      ...params
    };
    
    const response = await api.get('/posts', { params: defaultParams });
    
    return {
      posts: response.data,
      totalPages: parseInt(response.headers['x-wp-totalpages'] || '1'),
      total: parseInt(response.headers['x-wp-total'] || '0')
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return { posts: [], totalPages: 0, total: 0 };
  }
}

// Función para limpiar referencias al dominio del CMS y manejar %sitename%
function cleanCMSDomain(text: string): string {
  if (!text) return text;
  
  // Primero reemplazar referencias al dominio del CMS por el dominio final
  let cleanedText = text.replace(/cms\.terapiadeparejamedellin\.com/g, 'terapiadeparejamedellin.com');
  
  // Si el texto no contiene %sitename%, eliminar cualquier referencia al dominio del sitio
  if (!cleanedText.includes('%sitename%')) {
    // Eliminar el dominio del sitio si aparece al final del título
    cleanedText = cleanedText.replace(/\s+terapiadeparejamedellin\.com$/i, '');
    // Eliminar variaciones comunes del nombre del sitio
    cleanedText = cleanedText.replace(/\s+-\s+Terapia de Pareja Medellín$/i, '');
    cleanedText = cleanedText.replace(/\s+Terapia de Pareja Medellín$/i, '');
  }
  
  return cleanedText.trim();
}

// Función para extraer metadatos de Rank Math del HTML head
function parseRankMathMeta(headHtml: string) {
  const meta: any = {};
  
  // Extraer title SEO específico de Rank Math (priorizar og:title sobre <title>)
  const ogTitleMatch = headHtml.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["']/);
  const titleMatch = headHtml.match(/<title[^>]*>([^<]+)<\/title>/);
  
  // Usar og:title si está disponible (título SEO específico), sino usar <title>
  if (ogTitleMatch) {
    meta.title = cleanCMSDomain(ogTitleMatch[1].trim());
  } else if (titleMatch) {
    meta.title = cleanCMSDomain(titleMatch[1].trim());
  }
  
  // Extraer meta description
  const descMatch = headHtml.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/);
  if (descMatch) meta.description = cleanCMSDomain(descMatch[1].trim());
  
  // Extraer keywords
  const keywordsMatch = headHtml.match(/<meta[^>]*name=["']keywords["'][^>]*content=["']([^"']+)["']/);
  if (keywordsMatch) meta.keywords = cleanCMSDomain(keywordsMatch[1].trim());
  
  // Extraer canonical
  const canonicalMatch = headHtml.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/);
  if (canonicalMatch) meta.canonical = cleanCMSDomain(canonicalMatch[1].trim());
  
  // Extraer Open Graph
  const ogTitleForOgMatch = headHtml.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["']/);
  if (ogTitleForOgMatch) meta.og_title = cleanCMSDomain(ogTitleForOgMatch[1].trim());
  
  const ogDescMatch = headHtml.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/);
  if (ogDescMatch) meta.og_description = cleanCMSDomain(ogDescMatch[1].trim());
  
  const ogImageMatch = headHtml.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/);
  if (ogImageMatch) meta.og_image = cleanCMSDomain(ogImageMatch[1].trim());
  
  // Extraer Twitter
  const twitterTitleMatch = headHtml.match(/<meta[^>]*name=["']twitter:title["'][^>]*content=["']([^"']+)["']/);
  if (twitterTitleMatch) meta.twitter_title = cleanCMSDomain(twitterTitleMatch[1].trim());
  
  const twitterDescMatch = headHtml.match(/<meta[^>]*name=["']twitter:description["'][^>]*content=["']([^"']+)["']/);
  if (twitterDescMatch) meta.twitter_description = cleanCMSDomain(twitterDescMatch[1].trim());
  
  const twitterImageMatch = headHtml.match(/<meta[^>]*name=["']twitter:image["'][^>]*content=["']([^"']+)["']/);
  if (twitterImageMatch) meta.twitter_image = cleanCMSDomain(twitterImageMatch[1].trim());
  
  return Object.keys(meta).length > 0 ? meta : null;
}

// Variable para controlar si ya se mostró la advertencia de Rank Math
let rankMathWarningShown = false;

// Función para obtener metadatos de Rank Math
export async function getRankMathMeta(url: string): Promise<any> {
  try {
    const response = await fetch(`${WORDPRESS_SITE_URL}/wp-json/rankmath/v1/getHead?url=${encodeURIComponent(url)}`);
    if (!response.ok) {
      // Solo mostrar la advertencia una vez para evitar spam en los logs
      if (!rankMathWarningShown) {
        console.warn('Rank Math API not available or not configured. Please install and configure Rank Math plugin in WordPress.');
        rankMathWarningShown = true;
      }
      return null;
    }
    
    const data = await response.json();
    
    // La respuesta puede ser un string HTML o un objeto
    if (typeof data === 'string') {
      return parseRankMathMeta(data);
    } else if (data.head) {
      return parseRankMathMeta(data.head);
    } else {
      return data;
    }
  } catch (error) {
    // Solo mostrar la advertencia una vez para evitar spam en los logs
    if (!rankMathWarningShown) {
      console.warn('Error fetching Rank Math metadata. Please ensure Rank Math plugin is installed and REST API is enabled.');
      rankMathWarningShown = true;
    }
    return null;
  }
}

export async function getPost(slug: string): Promise<WordPressPost | null> {
  try {
    const response = await api.get('/posts', {
      params: { 
        slug, 
        _embed: true 
      }
    });
    const post = response.data[0] || null;
    
    // Si encontramos el post, intentamos obtener metadatos de Rank Math
    if (post) {
      // Usar la URL real del post desde WordPress
      const postUrl = post.link;
      const rankMathMeta = await getRankMathMeta(postUrl);
      
      // Agregamos los metadatos de Rank Math al post
      if (rankMathMeta) {
        post.rankmath = rankMathMeta;
      }
    }
    
    return post;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export async function getPostById(id: number): Promise<WordPressPost | null> {
  try {
    const response = await api.get(`/posts/${id}`, {
      params: { _embed: true }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching post by ID:', error);
    return null;
  }
}

export async function getCategories(params?: {
  per_page?: number;
  hide_empty?: boolean;
  orderby?: 'name' | 'slug' | 'count';
  order?: 'asc' | 'desc';
}): Promise<WordPressCategory[]> {
  try {
    const defaultParams = {
      per_page: 100,
      hide_empty: true,
      ...params
    };
    
    const response = await api.get('/categories', { params: defaultParams });
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function getTags(params?: {
  per_page?: number;
  hide_empty?: boolean;
  orderby?: 'name' | 'slug' | 'count';
  order?: 'asc' | 'desc';
}): Promise<WordPressTag[]> {
  try {
    const defaultParams = {
      per_page: 100,
      hide_empty: true,
      ...params
    };
    
    const response = await api.get('/tags', { params: defaultParams });
    return response.data;
  } catch (error) {
    console.error('Error fetching tags:', error);
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

export async function getAuthor(id: number): Promise<WordPressAuthor | null> {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching author:', error);
    return null;
  }
}

// Funciones de utilidad
export function getFeaturedImageUrl(post: WordPressPost, size: string = 'large'): string | null {
  if (!post._embedded?.['wp:featuredmedia']?.[0]) {
    return null;
  }
  
  const media = post._embedded['wp:featuredmedia'][0];
  
  // Intentar obtener el tamaño específico
  if (media.media_details?.sizes?.[size]) {
    return media.media_details.sizes[size].source_url;
  }
  
  // Fallback a la imagen original
  return media.source_url;
}

export function getFeaturedImageAlt(post: WordPressPost): string {
  // Prioridad 1: Alt text personalizado desde ACF
  if (post.acf?.featured_image_alt) {
    return post.acf.featured_image_alt;
  }
  
  // Prioridad 2: Alt text desde WordPress media
  if (post._embedded?.['wp:featuredmedia']?.[0]?.alt_text) {
    return post._embedded['wp:featuredmedia'][0].alt_text;
  }
  
  // Prioridad 3: Generar alt text descriptivo basado en el título
  const title = post.title.rendered;
  return `Imagen destacada del artículo: ${title} - Terapia de pareja Medellín`;
}

export function getPostCategories(post: WordPressPost): WordPressCategory[] {
  if (!post._embedded?.['wp:term']?.[0]) {
    return [];
  }
  
  return post._embedded['wp:term'][0].filter(term => term.taxonomy === 'category');
}

export function getPostTags(post: WordPressPost): WordPressTag[] {
  if (!post._embedded?.['wp:term']?.[1]) {
    return [];
  }
  
  return post._embedded['wp:term'][1].filter(term => term.taxonomy === 'post_tag');
}

export function getPostAuthor(post: WordPressPost): WordPressAuthor | null {
  return post._embedded?.author?.[0] || null;
}

export function stripHtmlTags(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

export function getExcerpt(post: WordPressPost, maxLength: number = 160): string {
  // Usar excerpt personalizado de ACF si existe
  if (post.acf?.excerpt_custom) {
    return post.acf.excerpt_custom;
  }
  
  // Usar excerpt de WordPress
  if (post.excerpt.rendered) {
    const excerpt = stripHtmlTags(post.excerpt.rendered);
    return excerpt.length > maxLength ? excerpt.substring(0, maxLength) + '...' : excerpt;
  }
  
  // Fallback al contenido
  const content = stripHtmlTags(post.content.rendered);
  return content.length > maxLength ? content.substring(0, maxLength) + '...' : content;
}

export function formatDate(dateString: string, locale: string = 'es-ES'): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function getReadingTime(post: WordPressPost): string | null {
  // Usar tiempo de lectura de ACF si existe
  if (post.acf?.reading_time) {
    return post.acf.reading_time;
  }
  
  // Calcular tiempo de lectura basado en el contenido
  const content = stripHtmlTags(post.content.rendered);
  const wordsPerMinute = 200; // Promedio de palabras por minuto
  const wordCount = content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  
  return `${readingTime} min`;
}

// Función para verificar la conectividad con WordPress
export async function checkWordPressConnection(): Promise<boolean> {
  try {
    const response = await api.get('/');
    return response.status === 200;
  } catch (error) {
    console.error('WordPress connection failed:', error);
    return false;
  }
}

// Configuración de caché (opcional)
// Interfaz para comentarios de WordPress
export interface WordPressComment {
  id: number;
  post: number;
  parent: number;
  author: number;
  author_name: string;
  author_email: string;
  author_url: string;
  author_ip: string;
  author_user_agent: string;
  date: string;
  date_gmt: string;
  content: {
    rendered: string;
  };
  link: string;
  status: 'approved' | 'hold' | 'spam' | 'trash';
  type: string;
  author_avatar_urls: {
    [key: string]: string;
  };
  meta: any[];
}

// Función para obtener comentarios de un post
export async function getComments(postId: number, params?: {
  per_page?: number;
  page?: number;
  status?: 'approved' | 'hold' | 'spam' | 'trash';
  order?: 'asc' | 'desc';
  orderby?: 'date' | 'date_gmt';
}): Promise<{ comments: WordPressComment[]; totalPages: number; total: number }> {
  try {
    const queryParams = {
      post: postId,
      per_page: params?.per_page || 10,
      page: params?.page || 1,
      status: params?.status || 'approved',
      order: params?.order || 'asc',
      orderby: params?.orderby || 'date',
    };

    const response = await api.get('/comments', { params: queryParams });
    
    return {
      comments: response.data,
      totalPages: parseInt(response.headers['x-wp-totalpages'] || '1'),
      total: parseInt(response.headers['x-wp-total'] || '0'),
    };
  } catch (error) {
    console.error('Error fetching comments:', error);
    return { comments: [], totalPages: 0, total: 0 };
  }
}

// Función para crear un nuevo comentario
export async function createComment(commentData: {
  post: number;
  author_name: string;
  author_email: string;
  content: string;
  parent?: number;
}): Promise<WordPressComment | null> {
  try {
    console.log('Enviando comentario:', commentData);
    
    // Primero intentar con el endpoint personalizado
    const customEndpoint = `${WORDPRESS_SITE_URL}/wp-json/custom/v1/comments`;
    console.log('Intentando endpoint personalizado:', customEndpoint);
    
    try {
      const customResponse = await fetch(customEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData)
      });
      
      if (customResponse.ok) {
        const result = await customResponse.json();
        console.log('Respuesta exitosa del endpoint personalizado:', result);
        
        return {
          id: result.comment.id,
          post: commentData.post,
          parent: commentData.parent || 0,
          author: 0,
          author_name: result.comment.author_name,
          author_email: commentData.author_email,
          author_url: '',
          author_ip: '',
          author_user_agent: '',
          date: result.comment.date,
          date_gmt: result.comment.date,
          content: { rendered: result.comment.content },
          link: '',
          status: result.comment.status as 'approved' | 'hold' | 'spam' | 'trash',
          type: 'comment',
          author_avatar_urls: { '96': '' },
          meta: []
        };
      }
    } catch (customError) {
      console.log('Endpoint personalizado no disponible, usando endpoint estándar');
    }
    
    // Fallback al endpoint estándar de WordPress
    console.log('Usando endpoint estándar:', `${WORDPRESS_API_URL}/comments`);
    const response = await api.post('/comments', commentData);
    console.log('Respuesta exitosa del endpoint estándar:', response.data);
    return response.data;
    
  } catch (error: any) {
    console.error('Error creating comment:', error);
    
    if (error.response) {
      console.error('Error response status:', error.response.status);
      console.error('Error response data:', error.response.data);
      
      // Proporcionar mensaje de error más específico
      if (error.response.status === 401) {
        throw new Error('Para enviar comentarios, necesitas instalar el plugin de comentarios anónimos en WordPress. Consulta el archivo wordpress-comment-endpoint.php en el proyecto.');
      }
    }
    
    throw error;
  }
}

// Función para obtener un comentario específico
export async function getComment(id: number): Promise<WordPressComment | null> {
  try {
    const response = await api.get(`/comments/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching comment:', error);
    return null;
  }
}

export const CACHE_DURATION = {
  POSTS: 5 * 60, // 5 minutos
  CATEGORIES: 30 * 60, // 30 minutos
  TAGS: 30 * 60, // 30 minutos
  MEDIA: 60 * 60, // 1 hora
  COMMENTS: 2 * 60, // 2 minutos
};

export default api;