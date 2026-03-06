import HeroSection from "@/components/hero-section"
import ServicesSection from "@/components/services-section"
import StructuredData from "@/components/structured-data"
import { organizationSchema, websiteSchema } from "@/app/structured-data"
import DificultadesSection from "@/components/dificultades-section"
import TestimoniosSection from "@/components/testimonios-section"
import TerapiaDiferenciaSection from "@/components/terapia-diferencia-section"
import MetodologiaSection from "@/components/metodologia-section"
import CtaSection from "@/components/cta-section"


export default function Home() {
  return (
    <>
      <StructuredData data={[organizationSchema, websiteSchema]} />
      <main className="min-h-screen bg-white">
        {/* Todo el contenido se renderiza en el servidor para mejor SEO */}
        <HeroSection />
        <ServicesSection />
        <DificultadesSection />
        <TestimoniosSection />
        <TerapiaDiferenciaSection />
        <MetodologiaSection />
        <CtaSection />
      </main>
    </>
  )
}
