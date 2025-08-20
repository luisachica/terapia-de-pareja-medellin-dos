import HeroSection from "@/components/hero-section"
import ServicesSection from "@/components/services-section"
import DificultadesSection from "@/components/dificultades-section"
import TestimoniosSection from "@/components/testimonios-section"
import TerapiaDiferenciaSection from "@/components/terapia-diferencia-section"
import MetodologiaSection from "@/components/metodologia-section"
import CtaSection from "@/components/cta-section"
import WhatsappFloating from "@/components/WhatsappFloating"
import StructuredData from "@/components/structured-data"
import { organizationSchema, websiteSchema } from "@/app/structured-data"


export default function Home() {
  return (
    <>
      <StructuredData data={[organizationSchema, websiteSchema]} />
      <main className="min-h-screen bg-white">
        <HeroSection />
        <ServicesSection />
        <DificultadesSection />
        <TestimoniosSection />
        <TerapiaDiferenciaSection />
        <MetodologiaSection />
        <CtaSection />
        <WhatsappFloating />
      </main>
    </>
  )
}
