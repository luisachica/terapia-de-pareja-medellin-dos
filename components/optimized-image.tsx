'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  quality?: number
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  sizes?: string
  fill?: boolean
  loading?: 'lazy' | 'eager'
  onLoad?: () => void
  onError?: () => void
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  quality = 85,
  placeholder = 'empty',
  blurDataURL,
  sizes,
  fill = false,
  loading = 'lazy',
  onLoad,
  onError,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  // Generate blur placeholder for better UX
  const generateBlurDataURL = (w: number, h: number) => {
    const canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.fillStyle = '#f3f4f6'
      ctx.fillRect(0, 0, w, h)
    }
    return canvas.toDataURL()
  }

  const handleLoad = () => {
    setIsLoaded(true)
    onLoad?.()
    
    // Mark LCP element for Web Vitals
    if (priority) {
      performance.mark('lcp-image-loaded')
    }
  }

  const handleError = () => {
    setHasError(true)
    onError?.()
  }

  // Determine optimal sizes based on viewport
  const defaultSizes = sizes || (
    fill 
      ? '100vw'
      : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
  )

  // Use WebP format when possible
  const optimizedSrc = src.includes('http') ? src : src

  if (hasError) {
    return (
      <div 
        className={cn(
          'bg-gray-200 flex items-center justify-center text-gray-500',
          className
        )}
        style={{ width, height }}
      >
        <span className="text-sm">Error al cargar imagen</span>
      </div>
    )
  }

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <Image
        src={optimizedSrc}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        priority={priority}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={
          blurDataURL || 
          (placeholder === 'blur' && width && height 
            ? generateBlurDataURL(width, height) 
            : undefined
          )
        }
        sizes={defaultSizes}
        loading={priority ? 'eager' : loading}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          'transition-opacity duration-300',
          isLoaded ? 'opacity-100' : 'opacity-0',
          fill ? 'object-cover' : ''
        )}
        {...props}
      />
      
      {/* Loading placeholder */}
      {!isLoaded && !hasError && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{ width: fill ? '100%' : width, height: fill ? '100%' : height }}
        />
      )}
    </div>
  )
}

// Hook for preloading critical images
export function useImagePreload(src: string, priority: boolean = false) {
  useEffect(() => {
    if (priority && typeof window !== 'undefined') {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = src
      document.head.appendChild(link)
      
      return () => {
        document.head.removeChild(link)
      }
    }
  }, [src, priority])
}

// Utility for generating responsive image sizes
export function generateImageSizes(breakpoints: { [key: string]: string }) {
  return Object.entries(breakpoints)
    .map(([breakpoint, size]) => `(max-width: ${breakpoint}) ${size}`)
    .join(', ')
}