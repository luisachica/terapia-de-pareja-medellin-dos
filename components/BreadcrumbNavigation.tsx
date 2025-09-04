"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { breadcrumbSchema } from "@/app/structured-data"
import StructuredData from "@/components/StructuredData"
import { siteConfig } from "@/lib/config"

// Configuración de rutas y sus títulos
const routeConfig: Record<string, { title: string; parent?: string }> = {
  '/': { title: 'Inicio' },
  '/consultas-de-pareja': { title: 'Consultas de Pareja' },
  '/asesorias-de-pareja': { title: 'Asesorías de Pareja' },
  '/talleres-de-pareja': { title: 'Talleres de Pareja' },
  '/sobre-mi': { title: 'Sobre Mí' },
  '/contacto': { title: 'Contacto' },
  '/blog': { title: 'Blog' },
  '/blog/categoria': { title: 'Categorías', parent: '/blog' },
  '/blog/etiqueta': { title: 'Etiquetas', parent: '/blog' },
}

interface BreadcrumbNavigationProps {
  customItems?: Array<{ label: string; href: string }>
  className?: string
}

export default function BreadcrumbNavigation({ customItems, className }: BreadcrumbNavigationProps) {
  const pathname = usePathname()
  
  // Si estamos en la página de inicio, no mostrar breadcrumbs
  if (pathname === '/') {
    return null
  }

  // Generar breadcrumbs automáticamente o usar los personalizados
  const breadcrumbItems = customItems ? customItems.map(item => ({ name: item.label, url: item.href })) : generateBreadcrumbs(pathname)
  
  // Siempre incluir "Inicio" como primer elemento
  const fullBreadcrumbs = [
    { name: 'Inicio', url: siteConfig.url },
    ...breadcrumbItems
  ]

  return (
    <>
      <StructuredData data={breadcrumbSchema(fullBreadcrumbs)} />
      <nav className={className} aria-label="Navegación de migas de pan">
        <Breadcrumb>
          <BreadcrumbList>
            {fullBreadcrumbs.map((item, index) => {
              const isLast = index === fullBreadcrumbs.length - 1
              
              return (
                <BreadcrumbItem key={index}>
                  {isLast ? (
                    <BreadcrumbPage>{item.name}</BreadcrumbPage>
                  ) : (
                    <>
                      <BreadcrumbLink asChild>
                        <Link href={item.url}>{item.name}</Link>
                      </BreadcrumbLink>
                      <BreadcrumbSeparator />
                    </>
                  )}
                </BreadcrumbItem>
              )
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </nav>
    </>
  )
}

// Función para generar breadcrumbs automáticamente basado en la ruta
function generateBreadcrumbs(pathname: string): Array<{ name: string; url: string }> {
  const segments = pathname.split('/').filter(Boolean)
  const breadcrumbs: Array<{ name: string; url: string }> = []
  
  let currentPath = ''
  
  for (let i = 0; i < segments.length; i++) {
    currentPath += `/${segments[i]}`
    
    // Obtener configuración de la ruta
    const config = routeConfig[currentPath]
    
    if (config) {
      breadcrumbs.push({
        name: config.title,
        url: `${siteConfig.url}${currentPath}`
      })
    } else {
      // Para rutas dinámicas como /blog/[slug]
      const title = generateDynamicTitle(segments[i], currentPath)
      breadcrumbs.push({
        name: title,
        url: `${siteConfig.url}${currentPath}`
      })
    }
  }
  
  return breadcrumbs
}

// Función para generar títulos dinámicos
function generateDynamicTitle(segment: string, fullPath: string): string {
  // Para posts del blog
  if (fullPath.startsWith('/blog/') && !fullPath.includes('/categoria/') && !fullPath.includes('/etiqueta/')) {
    // Convertir slug a título legible
    return segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }
  
  // Para categorías
  if (fullPath.includes('/categoria/')) {
    return segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }
  
  // Para etiquetas
  if (fullPath.includes('/etiqueta/')) {
    return `#${segment}`
  }
  
  // Por defecto, capitalizar y reemplazar guiones
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// Hook personalizado para generar breadcrumbs específicos
export function useBreadcrumbs(customItems?: Array<{ label: string; href: string }>) {
  const pathname = usePathname()
  
  if (pathname === '/') {
    return []
  }
  
  const breadcrumbItems = customItems ? customItems.map(item => ({ name: item.label, url: item.href })) : generateBreadcrumbs(pathname)
  
  return [
    { name: 'Inicio', url: siteConfig.url },
    ...breadcrumbItems
  ]
}