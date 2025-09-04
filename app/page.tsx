import HeroSection from "@/components/hero-section"
import ServicesSection from "@/components/services-section"
import StructuredData from "@/components/structured-data"
import { organizationSchema, websiteSchema } from "@/app/structured-data"
import { LazyComponent } from "@/components/lazy-component"
import { Suspense, lazy } from "react"
import { TextSkeleton, CardSkeleton } from "@/components/layout-stable"

// Lazy load non-critical components for better FID
const DificultadesSection = lazy(() => import("@/components/dificultades-section"))
const TestimoniosSection = lazy(() => import("@/components/testimonios-section"))
const TerapiaDiferenciaSection = lazy(() => import("@/components/terapia-diferencia-section"))
const MetodologiaSection = lazy(() => import("@/components/metodologia-section"))
const CtaSection = lazy(() => import("@/components/cta-section"))


export default function Home() {
  return (
    <>
      <StructuredData data={[organizationSchema, websiteSchema]} />
      <main className="min-h-screen bg-white">
        {/* Critical above-the-fold content - load immediately */}
        <HeroSection />
        <ServicesSection />
        
        {/* Non-critical content - lazy load for better FID */}
        <Suspense fallback={<div className="py-16"><CardSkeleton className="max-w-4xl mx-auto px-4" /></div>}>
          <DificultadesSection />
        </Suspense>
        
        <Suspense fallback={<div className="py-16"><TextSkeleton lines={4} className="max-w-4xl mx-auto px-4" /></div>}>
          <TestimoniosSection />
        </Suspense>
        
        <Suspense fallback={<div className="py-16"><CardSkeleton className="max-w-4xl mx-auto px-4" /></div>}>
          <TerapiaDiferenciaSection />
        </Suspense>
        
        <Suspense fallback={<div className="py-16"><TextSkeleton lines={3} className="max-w-4xl mx-auto px-4" /></div>}>
          <MetodologiaSection />
        </Suspense>
        
        <Suspense fallback={<div className="py-8"><TextSkeleton lines={2} className="max-w-2xl mx-auto px-4" /></div>}>
          <CtaSection />
        </Suspense>
        

      </main>
    </>
  )
}
