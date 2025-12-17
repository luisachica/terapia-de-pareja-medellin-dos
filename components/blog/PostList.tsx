'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, Clock, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { 
  WordPressPost, 
  WordPressCategory,
  getPosts, 
  getCategories,
  getFeaturedImageUrl,
  getFeaturedImageAlt,
  getPostCategories,
  getPostAuthor,
  getExcerpt,
  formatDate,
  getReadingTime
} from '@/lib/wordpress';

interface PostListProps {
  initialPosts?: WordPressPost[];
  initialTotalPages?: number;
  initialTotal?: number;
  categorySlug?: string;
  searchQuery?: string;
}

export default function PostList({ 
  initialPosts = [], 
  initialTotalPages = 0, 
  initialTotal = 0,
  categorySlug,
  searchQuery
}: PostListProps) {
  const [posts, setPosts] = useState<WordPressPost[]>(initialPosts);
  const [categories, setCategories] = useState<WordPressCategory[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [total, setTotal] = useState(initialTotal);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categorySlug || '');
  const [search, setSearch] = useState(searchQuery || '');
  const [searchInput, setSearchInput] = useState(searchQuery || '');

  // Cargar categorías al montar el componente
  useEffect(() => {
    const loadCategories = async () => {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
    };
    loadCategories();
  }, []);

  // Cargar posts cuando cambian los filtros o la página
  useEffect(() => {
    // Evitar la carga inicial si ya tenemos posts del servidor
    if (initialPosts.length > 0 && currentPage === 1 && !selectedCategory && !search) {
      return;
    }
    loadPosts();
  }, [selectedCategory, search, currentPage]);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const params: any = {
        per_page: 6,
        page: currentPage,
        orderby: 'date',
        order: 'desc'
      };

      if (selectedCategory) {
        params.categories = selectedCategory;
      }

      if (search) {
        params.search = search;
      }

      const { posts: fetchedPosts, totalPages: fetchedTotalPages, total: fetchedTotal } = await getPosts(params);
      setPosts(fetchedPosts);
      setTotalPages(fetchedTotalPages);
      setTotal(fetchedTotal);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-8">
      {/* Filtros y búsqueda */}
      <div className="bg-background rounded-3xl shadow-lg border border-border p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Búsqueda */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              placeholder="Buscar artículos..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="flex-1 px-4 py-2 border border-border rounded-full focus:ring-2 focus:ring-primary-foreground focus:border-transparent bg-background text-foreground"
            />
            <Button type="submit" variant="outline" className="rounded-full">
              Buscar
            </Button>
          </form>

          {/* Filtro por categoría */}
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="px-4 py-2 border border-border rounded-full focus:ring-2 focus:ring-primary-foreground focus:border-transparent bg-background text-foreground"
          >
            <option value="">Todas las categorías</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id.toString()}>
                {category.name} ({category.count})
              </option>
            ))}
          </select>
        </div>

        {/* Resultados */}
        {(search || selectedCategory) && (
          <div className="mt-4 flex flex-wrap gap-2 items-center text-sm text-muted-foreground">
            <span>Mostrando {total} resultado{total !== 1 ? 's' : ''}</span>
            {search && (
              <Badge variant="secondary">
                Búsqueda: "{search}"
                <button
                  onClick={() => {
                    setSearch('');
                    setSearchInput('');
                  }}
                  className="ml-1 hover:text-destructive"
                >
                  ×
                </button>
              </Badge>
            )}
            {selectedCategory && (
              <Badge variant="secondary">
                Categoría: {categories.find(c => c.id.toString() === selectedCategory)?.name}
                <button
                  onClick={() => setSelectedCategory('')}
                  className="ml-1 hover:text-destructive"
                >
                  ×
                </button>
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Lista de posts */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-48 bg-gray-200 rounded-t-lg"></div>
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => {
            const featuredImage = getFeaturedImageUrl(post, 'medium');
            const categories = getPostCategories(post);
            const author = getPostAuthor(post);
            const excerpt = getExcerpt(post, 120);
            const readingTime = getReadingTime(post);

            return (
              <Card key={post.id} className="bg-background rounded-3xl shadow-lg hover:shadow-xl transition-all group border-border">
                {featuredImage && (
                  <div className="relative h-48 overflow-hidden rounded-t-3xl">
                    <Image
                      src={featuredImage}
                      alt={getFeaturedImageAlt(post)}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                
                <CardHeader className="pb-3">
                  {categories.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {categories.slice(0, 2).map((category) => (
                        <Badge key={category.id} variant="secondary" className="text-xs rounded-full">
                          {category.name}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  <CardTitle className="line-clamp-2 group-hover:text-primary-foreground transition-colors text-foreground">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title.rendered}
                    </Link>
                  </CardTitle>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <CalendarDays className="h-4 w-4" />
                      <span>{formatDate(post.date)}</span>
                    </div>
                    {readingTime && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{readingTime}</span>
                      </div>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-muted-foreground line-clamp-3 mb-4">
                    {excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    {author && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="h-4 w-4" />
                        <span>{author.name}</span>
                      </div>
                    )}
                    
                    <Link href={`/blog/${post.slug}`}>
                      <Button variant="outline" size="sm" className="rounded-full border-secondary text-secondary-foreground hover:bg-secondary hover:text-secondary-foreground">
                        Leer más
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No se encontraron artículos
          </h3>
          <p className="text-gray-600 mb-4">
            {search || selectedCategory 
              ? 'Intenta ajustar los filtros de búsqueda.'
              : 'Aún no hay artículos publicados.'}
          </p>
          {(search || selectedCategory) && (
            <Button 
              variant="outline" 
              onClick={() => {
                setSearch('');
                setSearchInput('');
                setSelectedCategory('');
              }}
            >
              Limpiar filtros
            </Button>
          )}
        </div>
      )}

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || loading}
            className="rounded-full border-secondary text-secondary-foreground hover:bg-secondary hover:text-secondary-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
            Anterior
          </Button>
          
          <div className="flex gap-1">
            {[...Array(totalPages)].map((_, i) => {
              const page = i + 1;
              const isCurrentPage = page === currentPage;
              
              // Mostrar solo algunas páginas alrededor de la actual
              if (
                page === 1 || 
                page === totalPages || 
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <Button
                    key={page}
                    variant={isCurrentPage ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(page)}
                    disabled={loading}
                    className={`w-10 rounded-full ${
                      isCurrentPage 
                        ? "bg-primary text-primary-foreground" 
                        : "border-secondary text-secondary-foreground hover:bg-secondary hover:text-secondary-foreground"
                    }`}
                  >
                    {page}
                  </Button>
                );
              } else if (
                page === currentPage - 2 || 
                page === currentPage + 2
              ) {
                return <span key={page} className="px-2">...</span>;
              }
              
              return null;
            })}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || loading}
            className="rounded-full border-secondary text-secondary-foreground hover:bg-secondary hover:text-secondary-foreground"
          >
            Siguiente
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}