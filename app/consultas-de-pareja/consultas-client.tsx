"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

import StructuredData from "@/components/StructuredData";
import BreadcrumbNavigation from "@/components/BreadcrumbNavigation";
import { Users, BookOpen } from "lucide-react";

// Datos Estructurados (JSON-LD) para esta página
const serviceData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Terapia de Pareja",
  "provider": {
    "@type": "Psychologist",
    "name": "Terapia de Pareja Medellín"
  },
  "name": "Consultas de Pareja",
  "description": "Un espacio seguro y neutral para parejas en crisis que buscan comprender lo que está sucediendo en su relación, sanar heridas abiertas y recuperar el vínculo que los unió.",
  "url": "https://terapiadeparejamedellin.com/consultas-de-pareja"
};

const faqData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Cuándo es momento de buscar una consulta de pareja?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Es momento de buscar ayuda cuando sienten que están en una crisis, el diálogo se ha perdido, los conflictos se repiten constantemente o la conexión emocional se ha debilitado."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué se puede esperar de la terapia de pareja?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pueden esperar un espacio seguro y neutral, sin juicios, donde se busca la comprensión en lugar de la culpa. Es una oportunidad para sanar, reconectar y aprender a comunicarse desde la empatía."
      }
    }
  ]
};

export default function ConsultasPageClient() {
    const whatsappLink: string = "https://wa.me/573137415861";

    return (
        <>
            <StructuredData data={serviceData} />
            <StructuredData data={faqData} />

            <main className="min-h-screen bg-background text-foreground">
                {/* Breadcrumbs */}
                <div className="container mx-auto px-4 pt-4">
                    <BreadcrumbNavigation className="mb-4" />
                </div>
                {/* Hero */}
                <div className="relative w-full bg-secondary">
                    <div className="container mx-auto px-8 py-20 flex flex-col md:flex-row items-center gap-12">
                        <div className="w-full md:w-[60%]">
                            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                                Consultas de pareja
                            </h1>
                            <p className="italic text-xl text-muted-foreground">
                                Transformar tu relación sí es posible.
                            </p>
                            <p className="text-foreground/90 text-xl max-w-xl mt-4">
                                ¿Están atravesando una crisis como pareja? ¿Sienten que el diálogo se ha perdido, que los conflictos se repiten o que la conexión emocional se ha debilitado?
                                No están solos.
                            </p>
                            <p className="text-foreground/90 text-xl max-w-xl mt-4">
                                Las consultas de pareja ofrecen un espacio seguro y neutral para mirar la relación desde otra perspectiva.
                                Aquí no se trata de juzgar ni señalar culpables, sino de comprender lo que está sucediendo, sanar heridas abiertas y recuperar el vínculo que un día los unió.
                            </p>
                            <p className="text-foreground/90 text-xl max-w-xl mt-4">
                                Si están listos para dar un primer paso hacia el cambio, estoy aquí para acompañarlos.
                            </p>
                            <p className="text-foreground/90 text-xl max-w-xl mt-4 font-bold">
                                Tu relación lo vale.
                            </p>

                            <div className="pt-6">
                                <Button asChild className="bg-gradient-to-r from-primary-foreground to-accent text-white hover:opacity-90 rounded-full px-8 py-6 text-lg shadow-md hover:shadow-lg transition-all">
                                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                                        Agenda una consulta
                                    </a>
                                </Button>
                            </div>
                        </div>

                        <div className="w-full md:w-[40%]">
                            <div className="rounded-3xl overflow-hidden border border-border shadow-xl aspect-[3/4] bg-muted">
                                <Image
                                    src="/images/pareja-feliz-bombas.webp"
                                    alt="Pareja feliz celebrando después de superar crisis con terapia de pareja en Medellín"
                                    width={600}
                                    height={800}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Timeline */}
                <div className="container mx-auto px-8 relative z-10">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl font-bold mb-6 text-foreground mt-12 pb-4">
                                Un espacio neutral para tomar decisiones con calma
                            </h2>
                            <ol className="relative border-l-4 border-muted space-y-12 pl-6">
                                <li>
                                    <h3 className="text-xl font-semibold text-foreground mb-1">1. Reconoce la crisis</h3>
                                    <p className="text-muted-foreground text-lg">
                                        ¿Sienten que ya no se entienden o que el amor se ha desgastado? No están solos.
                                    </p>
                                </li>
                                <li>
                                    <h3 className="text-xl font-semibold text-primary-foreground mb-1">2. Terapia, más que palabras</h3>
                                    <p className="text-muted-foreground text-lg">
                                        La terapia de pareja es mucho más que hablar. Es un espacio para sanar, comprender y reconectar.
                                    </p>
                                </li>
                                <li>
                                    <h3 className="text-xl font-semibold text-primary-foreground mb-1">3. Espacio seguro y neutral</h3>
                                    <p className="text-muted-foreground text-lg">
                                        Un acompañamiento profesional donde podrán explorar sus heridas, aprender a comunicarse y reconectar desde la empatía y el amor.
                                    </p>
                                </li>
                                <li>
                                    <h3 className="text-xl font-semibold text-primary-foreground mb-1">4. Comprensión, no culpa</h3>
                                    <p className="text-muted-foreground text-lg">
                                        Aquí no se trata de culpas, sino de comprensión. No se trata de romper, sino de reparar y fortalecer ese vínculo que un día los unió.
                                    </p>
                                </li>
                                <li>
                                    <h3 className="text-xl font-semibold text-primary-foreground mb-1">5. El poder de transformarse juntos</h3>
                                    <p className="text-muted-foreground text-lg">
                                        Después del dolor también puede llegar la transformación. Una relación más consciente, auténtica y sólida es posible.
                                    </p>
                                </li>
                                <li>
                                    <h3 className="text-xl font-semibold text-accent-foreground mb-1">6. Tu relación lo vale</h3>
                                    <p className="text-muted-foreground text-lg">
                                        ¿Están listos para dar el primer paso hacia una nueva forma de amarse?
                                    </p>
                                </li>
                            </ol>
                        </div>

                        <div className="rounded-3xl overflow-hidden shadow-2xl transform md:translate-x-10 p-4 bg-primary">
                            <Image
                                src="/images/pareja-feliz-sonriendo.webp"
                                alt="Pareja sonriendo feliz después de consulta de terapia de pareja exitosa"
                                width={800}
                                height={533}
                                className="w-full h-auto rounded-2xl"
                                priority
                            />
                        </div>
                        <div className="pt-6 pb-12">
                            <Button asChild className="bg-gradient-to-r from-primary-foreground to-accent text-white hover:opacity-90 rounded-full px-8 py-6 text-lg shadow-md hover:shadow-lg transition-all">
                                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                                    Agenda una consulta
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Sección de servicios relacionados */}
                <section className="py-16 bg-secondary">
                    <div className="container mx-auto px-4 sm:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-foreground mb-4">
                                Otros servicios que pueden interesarte
                            </h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Explora nuestros otros servicios especializados en terapia de pareja
                            </p>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            <div className="bg-background rounded-3xl shadow-lg p-8 hover:shadow-xl transition-all group">
                                <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mb-6 group-hover:bg-muted transition-colors">
                                    <Users className="w-8 h-8 text-secondary-foreground" />
                                </div>
                                <h3 className="text-xl font-semibold text-foreground mb-4">Asesorías de pareja</h3>
                                <p className="text-muted-foreground mb-6">
                                    Sesiones personalizadas para mejorar la comunicación y resolver conflictos en tu relación.
                                </p>
                                <Button
                                    asChild
                                    variant="outline"
                                    className="rounded-full border-secondary text-secondary-foreground hover:bg-secondary hover:text-secondary-foreground transition-all"
                                >
                                    <Link href="/asesorias-de-pareja">
                                        Conoce más
                                    </Link>
                                </Button>
                            </div>

                            <div className="bg-background rounded-3xl shadow-lg p-8 hover:shadow-xl transition-all group">
                                <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mb-6 group-hover:bg-muted transition-colors">
                                    <BookOpen className="w-8 h-8 text-accent-foreground" />
                                </div>
                                <h3 className="text-xl font-semibold text-foreground mb-4">Talleres de pareja</h3>
                                <p className="text-muted-foreground mb-6">
                                    Espacios de aprendizaje grupal donde adquirirás herramientas prácticas para mejorar tus relaciones.
                                </p>
                                <Button
                                    asChild
                                    variant="outline"
                                    className="rounded-full border-accent text-accent-foreground hover:bg-accent hover:text-accent-foreground transition-all"
                                >
                                    <Link href="/talleres-de-pareja">
                                        Conoce más
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                
            </main>
        </>
    )
}