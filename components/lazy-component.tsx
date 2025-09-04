'use client'

import { Suspense, lazy, ComponentType, ReactNode, useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface LazyComponentProps {
  children: ReactNode
  fallback?: ReactNode
  className?: string
  threshold?: number
  rootMargin?: string
}

// Generic lazy loading wrapper
export function LazyComponent({
  children,
  fallback = <ComponentSkeleton />,
  className,
}: LazyComponentProps) {
  return (
    <Suspense fallback={fallback}>
      <div className={className}>
        {children}
      </div>
    </Suspense>
  )
}

// Intersection Observer based lazy loading
export function LazyIntersection({
  children,
  fallback = <ComponentSkeleton />,
  className,
  threshold = 0.1,
  rootMargin = '50px',
}: LazyComponentProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [ref, setRef] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!ref) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(ref)

    return () => observer.disconnect()
  }, [ref, threshold, rootMargin])

  return (
    <div ref={setRef} className={className}>
      {isVisible ? children : fallback}
    </div>
  )
}

// Default skeleton component
function ComponentSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    </div>
  )
}

// Lazy load specific components
export const LazyWhatsappFloating = lazy(() => 
  import('./WhatsappFloating')
)

// LazyBlogCard removed - component doesn't exist

// HOC for lazy loading any component
export function withLazyLoading<T extends object>(
  Component: ComponentType<T>,
  fallback?: ReactNode
) {
  return function LazyWrappedComponent(props: T) {
    return (
      <Suspense fallback={fallback || <ComponentSkeleton />}>
        <Component {...props} />
      </Suspense>
    )
  }
}

// Hook for dynamic imports with error handling
export function useDynamicImport<T>(importFunc: () => Promise<{ default: T }>) {
  const [component, setComponent] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let mounted = true

    importFunc()
      .then((module) => {
        if (mounted) {
          setComponent(module.default)
          setLoading(false)
        }
      })
      .catch((err) => {
        if (mounted) {
          setError(err)
          setLoading(false)
        }
      })

    return () => {
      mounted = false
    }
  }, [])

  return { component, loading, error }
}

// Performance monitoring for lazy loaded components
export function measureComponentLoad(componentName: string) {
  return function <T extends object>(Component: ComponentType<T>) {
    return function MeasuredComponent(props: T) {
      useEffect(() => {
        performance.mark(`${componentName}-start`)
        
        return () => {
          performance.mark(`${componentName}-end`)
          performance.measure(
            `${componentName}-load-time`,
            `${componentName}-start`,
            `${componentName}-end`
          )
        }
      }, [])

      return <Component {...props} />
    }
  }
}