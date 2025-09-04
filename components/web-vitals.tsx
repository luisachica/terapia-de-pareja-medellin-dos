'use client'

import { useReportWebVitals } from 'next/web-vitals'

import { useEffect } from 'react'

// Performance thresholds for Core Web Vitals
const THRESHOLDS = {
  LCP: { good: 2500, poor: 4000 },
  FID: { good: 100, poor: 300 },
  CLS: { good: 0.1, poor: 0.25 },
  FCP: { good: 1800, poor: 3000 },
  TTFB: { good: 800, poor: 1800 },
}

function getPerformanceRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const threshold = THRESHOLDS[name as keyof typeof THRESHOLDS]
  if (!threshold) return 'good'
  
  if (value <= threshold.good) return 'good'
  if (value <= threshold.poor) return 'needs-improvement'
  return 'poor'
}

export function WebVitals() {
  useReportWebVitals((metric) => {
    const rating = getPerformanceRating(metric.name, metric.value)
    
    // Enhanced logging in development
    if (process.env.NODE_ENV === 'development') {
      console.group(`🔍 Web Vitals: ${metric.name}`)
      console.log('Value:', metric.value)
      console.log('Rating:', rating)
      console.log('Delta:', metric.delta)
      console.log('ID:', metric.id)
      console.log('Navigation Type:', metric.navigationType)
      console.groupEnd()
      
      // Visual indicator for poor performance
      if (rating === 'poor') {
        console.warn(`⚠️ Poor ${metric.name} performance detected: ${metric.value}`)
      }
    }

    // Send to analytics in production
    if (process.env.NODE_ENV === 'production') {
      // Send to Google Analytics 4
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'web_vitals', {
          event_category: 'Web Vitals',
          event_label: metric.name,
          value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          custom_parameter_1: metric.id,
          custom_parameter_2: rating,
          custom_parameter_3: metric.navigationType,
        })
      }

      // Send to custom analytics endpoint
      fetch('/api/analytics/web-vitals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: metric.name,
          value: metric.value,
          rating,
          id: metric.id,
          delta: metric.delta,
          navigationType: metric.navigationType,
          timestamp: Date.now(),
          url: window.location.href,
          userAgent: navigator.userAgent,
        }),
      }).catch(console.error)
    }
  })

  return null
}

// Type declaration for gtag
declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, any>
    ) => void
  }
}

// Performance monitoring utilities
export const performanceUtils = {
  // Mark performance milestones
  mark: (name: string) => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      performance.mark(name)
    }
  },

  // Measure performance between marks
  measure: (name: string, startMark: string, endMark?: string) => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      try {
        const measurement = performance.measure(name, startMark, endMark)
        console.log(`Performance: ${name} took ${measurement.duration}ms`)
        return measurement
      } catch (error) {
        console.warn('Performance measurement failed:', error)
      }
    }
  },

  // Get navigation timing
  getNavigationTiming: () => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      return {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        firstByte: navigation.responseStart - navigation.requestStart,
        domInteractive: navigation.domInteractive - navigation.fetchStart,
      }
    }
    return null
  },

  // Monitor resource loading
  monitorResources: () => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const resources = performance.getEntriesByType('resource')
      const slowResources = resources.filter(resource => resource.duration > 1000)
      
      if (slowResources.length > 0) {
        console.warn('Slow loading resources detected:', slowResources)
      }
      
      return {
        total: resources.length,
        slow: slowResources.length,
        slowResources: slowResources.map(r => ({ name: r.name, duration: r.duration }))
      }
    }
    return null
  }
}

// Hook for component-level performance monitoring
export function usePerformanceMonitoring(componentName: string) {
  const startTime = Date.now()
  
  return {
    markRender: () => {
      performanceUtils.mark(`${componentName}-render-start`)
    },
    markComplete: () => {
      performanceUtils.mark(`${componentName}-render-complete`)
      performanceUtils.measure(
        `${componentName}-render-duration`,
        `${componentName}-render-start`,
        `${componentName}-render-complete`
      )
    },
    getComponentTime: () => Date.now() - startTime
  }
}