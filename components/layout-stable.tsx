'use client'

import { ReactNode, CSSProperties } from 'react'
import { cn } from '@/lib/utils'

interface LayoutStableProps {
  children: ReactNode
  width?: number | string
  height?: number | string
  aspectRatio?: string
  className?: string
  placeholder?: ReactNode
  loading?: boolean
  minHeight?: number | string
}

// Stable container to prevent CLS
export function LayoutStable({
  children,
  width,
  height,
  aspectRatio,
  className,
  placeholder,
  loading = false,
  minHeight,
}: LayoutStableProps) {
  const containerStyle: CSSProperties = {
    width,
    height,
    aspectRatio,
    minHeight,
  }

  return (
    <div 
      className={cn('relative overflow-hidden', className)}
      style={containerStyle}
    >
      {loading && placeholder ? (
        <div className="absolute inset-0 flex items-center justify-center">
          {placeholder}
        </div>
      ) : (
        children
      )}
    </div>
  )
}

// Skeleton components for different content types
export function TextSkeleton({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn('animate-pulse space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'h-4 bg-gray-200 rounded',
            i === lines - 1 ? 'w-3/4' : 'w-full'
          )}
        />
      ))}
    </div>
  )
}

export function ImageSkeleton({ 
  width, 
  height, 
  aspectRatio = '16/9',
  className 
}: { 
  width?: number | string
  height?: number | string
  aspectRatio?: string
  className?: string 
}) {
  return (
    <div 
      className={cn('bg-gray-200 animate-pulse rounded', className)}
      style={{ 
        width, 
        height, 
        aspectRatio: !width && !height ? aspectRatio : undefined 
      }}
    />
  )
}

export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('animate-pulse', className)}>
      <ImageSkeleton className="w-full h-48 mb-4" />
      <TextSkeleton lines={2} className="mb-2" />
      <div className="h-3 bg-gray-200 rounded w-1/2" />
    </div>
  )
}

// Fixed aspect ratio container
export function AspectRatioContainer({
  children,
  ratio = '16/9',
  className,
}: {
  children: ReactNode
  ratio?: string
  className?: string
}) {
  return (
    <div className={cn('relative w-full', className)} style={{ aspectRatio: ratio }}>
      <div className="absolute inset-0">
        {children}
      </div>
    </div>
  )
}

// Grid container with stable layout
export function StableGrid({
  children,
  columns = 3,
  gap = 4,
  className,
  minItemHeight,
}: {
  children: ReactNode
  columns?: number
  gap?: number
  className?: string
  minItemHeight?: number | string
}) {
  const gridStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: `${gap * 0.25}rem`,
    gridAutoRows: minItemHeight ? `minmax(${minItemHeight}, auto)` : undefined,
  }

  return (
    <div className={className} style={gridStyle}>
      {children}
    </div>
  )
}

// Hook to prevent layout shift during content loading
export function useLayoutStable(initialHeight?: number) {
  const [contentHeight, setContentHeight] = useState(initialHeight || 0)
  const [isLoaded, setIsLoaded] = useState(false)

  const measureRef = useCallback((node: HTMLElement | null) => {
    if (node && !isLoaded) {
      const height = node.getBoundingClientRect().height
      setContentHeight(height)
      setIsLoaded(true)
    }
  }, [isLoaded])

  return {
    measureRef,
    contentHeight,
    isLoaded,
    containerStyle: {
      minHeight: contentHeight || initialHeight,
      transition: 'min-height 0.3s ease-in-out',
    },
  }
}

// Component for stable hero sections
export function StableHero({
  children,
  minHeight = '60vh',
  className,
}: {
  children: ReactNode
  minHeight?: string
  className?: string
}) {
  return (
    <section 
      className={cn('relative flex items-center justify-center', className)}
      style={{ minHeight }}
    >
      {children}
    </section>
  )
}

// Stable button to prevent layout shift
export function StableButton({
  children,
  loading = false,
  className,
  ...props
}: {
  children: ReactNode
  loading?: boolean
  className?: string
  [key: string]: any
}) {
  return (
    <button 
      className={cn(
        'relative inline-flex items-center justify-center',
        'min-h-[2.5rem] px-4 py-2',
        'transition-all duration-200',
        className
      )}
      disabled={loading}
      {...props}
    >
      <span className={cn('transition-opacity', loading ? 'opacity-0' : 'opacity-100')}>
        {children}
      </span>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </button>
  )
}

import { useState, useCallback } from 'react'