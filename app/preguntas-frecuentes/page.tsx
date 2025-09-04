import { Metadata } from 'next'
import { siteConfig } from '@/lib/config'
import FaqClient from './faq-client'

export const metadata: Metadata = {
  title: 'Preguntas Frecuentes - Terapia de Pareja Medellín | Yolanda Osorio',
  description: 'Resuelve todas tus dudas sobre terapia de pareja en Medellín. Preguntas frecuentes sobre sesiones, costos, modalidades y más con la psicóloga Yolanda Osorio.',
  keywords: [
    'preguntas frecuentes terapia pareja',
    'FAQ terapia pareja Medellín',
    'dudas terapia pareja',
    'costo terapia pareja',
    'sesiones terapia pareja',
    'psicóloga pareja Medellín',
    'consultas pareja virtual',
    'terapia pareja presencial'
  ],
  openGraph: {
    title: 'Preguntas Frecuentes - Terapia de Pareja Medellín',
    description: 'Resuelve todas tus dudas sobre terapia de pareja. Información sobre sesiones, costos, modalidades y proceso terapéutico.',
    url: `${siteConfig.url}/preguntas-frecuentes`,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/images/faq-terapia-pareja.webp`,
        width: 1200,
        height: 630,
        alt: 'Preguntas frecuentes sobre terapia de pareja en Medellín'
      }
    ],
    locale: 'es_ES',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Preguntas Frecuentes - Terapia de Pareja Medellín',
    description: 'Resuelve todas tus dudas sobre terapia de pareja con la psicóloga Yolanda Osorio.',
    images: [`${siteConfig.url}/images/faq-terapia-pareja.webp`]
  },
  alternates: {
    canonical: `${siteConfig.url}/preguntas-frecuentes`
  }
}

export default function FaqPage() {
  return <FaqClient />
}