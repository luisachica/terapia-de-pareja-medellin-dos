import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/config'
import { getPosts, getCategories, getTags } from '@/lib/wordpress'

// Required for static export
export const dynamic = 'force-static'
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url
  const currentDate = new Date()
  
  // Páginas estáticas
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/consultas-de-pareja/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/asesorias-de-pareja/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/talleres-de-pareja/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sobre-mi/`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/preguntas-frecuentes/`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/contacto/`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
  ]

  // Intentar obtener posts dinámicamente
  let dynamicPages: MetadataRoute.Sitemap = []
  
  try {
    // Obtener todos los posts con paginación
    const allPosts: any[] = []
    let page = 1
    let hasMore = true

    while (hasMore) {
      const response = await getPosts({
        per_page: 100,
        page: page,
        orderby: 'date',
        order: 'desc'
      })
      
      if (response.posts.length === 0) {
        hasMore = false
      } else {
        allPosts.push(...response.posts)
        page++
        hasMore = page <= response.totalPages
      }
    }

    // Agregar posts individuales al sitemap
    dynamicPages = allPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}/`,
      lastModified: new Date(post.modified),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

    // Obtener categorías
    const categories = await getCategories()
    const categoryPages: MetadataRoute.Sitemap = categories
      .filter(cat => cat.count > 0) // Solo categorías con posts
      .map((category) => ({
        url: `${baseUrl}/blog/categoria/${category.slug}/`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.75,
      }))

    // Obtener etiquetas
    const tags = await getTags()
    const tagPages: MetadataRoute.Sitemap = tags
      .filter(tag => tag.count > 0) // Solo etiquetas con posts
      .map((tag) => ({
        url: `${baseUrl}/blog/etiqueta/${tag.slug}/`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }))

    dynamicPages = [...dynamicPages, ...categoryPages, ...tagPages]
  } catch (error) {
    console.error('Error fetching dynamic content for sitemap:', error)
    // Si hay error, solo mostrar páginas estáticas
  }

  return [...staticPages, ...dynamicPages]
}
