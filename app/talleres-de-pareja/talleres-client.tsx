"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { MessageSquare, HeartHandshake, Infinity, Flame, Leaf, Sparkles, Calendar, Users } from "lucide-react";

import StructuredData from "@/components/StructuredData";
import BreadcrumbNavigation from "@/components/BreadcrumbNavigation";

// Datos Estructurados (JSON-LD) para esta página
const eventData = {
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Talleres de Pareja",
  "description": "Talleres vivenciales diseñados para fortalecer la conexión de pareja, mejorar la comunicación y profundizar el vínculo emocional en un entorno cuidado y profesional.",
  "eventAttendanceMode": "https://schema.org/MixedEventAttendanceMode",
  "location": {
    "@type": "Place",
    "name": "Consultorio Terapia de Pareja Medellín",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Medellín",
      "addressCountry": "CO"
    }
  },
  "organizer": {
    "@type": "Psychologist",
    "name": "Terapia de Pareja Medellín"
  }
};

const faqData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Para quiénes son estos talleres?",
      "acceptedAnswer": { "@type": "Answer", "text": "Nuestros talleres son para cualquier pareja que desee darle un nuevo impulso a su relación, mejorar su comunicación y reconectar emocionalmente. No es necesario estar en crisis, solo tener el deseo de crecer juntos." }
    },
    {
      "@type": "Question",
      "name": "¿Qué habilidades se aprenden en los talleres?",
      "acceptedAnswer": { "@type": "Answer", "text": "En los talleres aprenderán a comunicarse de manera efectiva, resolver conflictos desde el respeto, profundizar en la conexión emocional y afectiva, y explorar la sexualidad con mayor apertura y confianza." }
    }
  ]
};

export default function TalleresPageClient() {
    const whatsappLink: string = "https://wa.me/573137415861";

    return (
        <>
            <StructuredData data={eventData} />
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
                                Talleres de pareja
                            </h1>
                            <p className="italic text-xl text-muted-foreground">
                                Reconectar, comunicar, sanar.
                            </p>
                            <p className="text-foreground/90 text-xl max-w-xl mt-4">
                                ¿Sienten que su relación necesita un nuevo impulso?
                                ¿Quieren comunicarse mejor, profundizar su vínculo emocional y reencontrarse desde el amor?
                            </p>
                            <p className="text-foreground/90 text-xl max-w-xl mt-4">
                                Nuestros talleres de pareja son espacios vivenciales, diseñados para fortalecer la conexión en un entorno cuidado, respetuoso y sin juicios.
                            </p>
                            <p className="text-foreground/90 text-xl max-w-xl mt-4">
                                A través de dinámicas guiadas y momentos de reflexión, podrán descubrir nuevas formas de escucharse, comprenderse y acompañarse.
                            </p>
                            <p className="text-foreground/90 text-xl max-w-xl mt-4">
                                No es necesario estar en crisis para trabajar en la relación.
                                Solo hace falta el deseo genuino de amarse mejor, con más conciencia, empatía y compromiso.
                            </p>
                            <p className="text-foreground/90 text-xl max-w-xl mt-4">
                                Cada encuentro es una oportunidad para crecer juntos y volver a elegirse desde un lugar más profundo y real.
                            </p>

                            <div className="pt-6">
                                <Button asChild className="bg-gradient-to-r from-primary-foreground to-accent text-white hover:opacity-90 rounded-full px-8 py-6 text-lg shadow-md hover:shadow-lg transition-all">
                                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                                        Reserva un taller
                                    </a>
                                </Button>
                            </div>
                        </div>

                        <div className="w-full md:w-[40%]">
                            <div className="rounded-3xl overflow-hidden border border-border shadow-xl aspect-[3/4] bg-muted">
                                <Image
                                    src="/images/taller-pareja-medellin.webp"
                                    alt="Grupo de parejas participando en taller de relaciones en Medellín"
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
                                Hablar sin herir, escuchar sin juzgar
                            </h2>

                            <ol className="relative border-l-4 border-muted space-y-12 pl-6">
                                <li>
                                    <h3 className="text-xl font-semibold text-foreground mb-1">1. Un nuevo impulso para la relación</h3>
                                    <p className="text-muted-foreground text-lg">
                                        ¿Sienten que su relación necesita renovarse? ¿Quieren volver a sentirse realmente conectados?
                                    </p>
                                </li>
                                <li>
                                    <h3 className="text-xl font-semibold text-primary-foreground mb-1">2. Talleres vivenciales para crecer</h3>
                                    <p className="text-muted-foreground text-lg mb-4">
                                        Nuestros talleres están diseñados para nutrir la relación desde el amor consciente, en un entorno cuidado y profesional.
                                    </p>
                                    <ul className="space-y-4 text-muted-foreground text-lg">
                                        <li className="flex items-start gap-3">
                                            <MessageSquare className="w-5 h-5 text-accent-foreground mt-1 flex-shrink-0" />
                                            <span>Aprender a comunicarse de manera efectiva</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <HeartHandshake className="w-5 h-5 text-accent-foreground mt-1 flex-shrink-0" />
                                            <span>Resolver conflictos desde el respeto mutuo</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <Infinity className="w-5 h-5 text-accent-foreground mt-1 flex-shrink-0" />
                                            <span>Profundizar en la conexión emocional y afectiva</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <Flame className="w-5 h-5 text-accent-foreground mt-1 flex-shrink-0" />
                                            <span>Explorar la sexualidad con apertura y confianza</span>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <h3 className="text-xl font-semibold text-foreground mb-1">3. Crecer y sanar juntos</h3>
                                    <p className="text-muted-foreground text-lg">
                                        Cada encuentro es una oportunidad para redescubrirse, sanar heridas y construir una relación más consciente.
                                    </p>
                                </li>
                                <li>
                                    <h3 className="text-xl font-semibold text-accent-foreground mb-1">4. No necesitan estar en crisis</h3>
                                    <ul className="space-y-4 text-muted-foreground text-lg mt-4">
                                        <li className="flex items-start gap-3">
                                            <Leaf className="w-5 h-5 text-accent-foreground mt-1 flex-shrink-0" />
                                            <span>No necesitan estar en crisis para trabajar en su relación.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <Sparkles className="w-5 h-5 text-accent-foreground mt-1 flex-shrink-0" />
                                            <span>Sólo tener el deseo de amarse mejor, con más consciencia y conexión.</span>
                                        </li>
                                    </ul>
                                </li>
                            </ol>
                        </div>

                        <div className="rounded-3xl overflow-hidden shadow-2xl transform md:translate-x-10 p-4 bg-primary">
                            <Image
                                src="/images/dinamica-taller-pareja.webp"
                                alt="Parejas realizando ejercicios dinámicos en taller de fortalecimiento de relaciones"
                                width={800}
                                height={533}
                                className="w-full h-auto rounded-2xl"
                                priority
                            />
                        </div>
                        <div className="pt-6 pb-12">
                            <Button asChild className="bg-gradient-to-r from-primary-foreground to-accent text-white hover:opacity-90 rounded-full px-8 py-6 text-lg shadow-md hover:shadow-lg transition-all">
                                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                                    Reserva un taller
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
                                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-6 group-hover:bg-muted transition-colors">
                                    <Users className="w-8 h-8 text-primary-foreground" />
                                </div>
                                <h3 className="text-xl font-semibold text-foreground mb-4">Consultas de pareja</h3>
                                <p className="text-muted-foreground mb-6">
                                    Un espacio seguro para parejas en crisis que buscan comprender y sanar su relación.
                                </p>
                                <Button
                                    asChild
                                    variant="outline"
                                    className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                                >
                                    <Link href="/consultas-de-pareja">
                                        Conoce más
                                    </Link>
                                </Button>
                            </div>

                            <div className="bg-background rounded-3xl shadow-lg p-8 hover:shadow-xl transition-all group">
                                <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mb-6 group-hover:bg-muted transition-colors">
                                    <Calendar className="w-8 h-8 text-accent-foreground" />
                                </div>
                                <h3 className="text-xl font-semibold text-foreground mb-4">Asesorías de pareja</h3>
                                <p className="text-muted-foreground mb-6">
                                    Orientación profesional puntual para abordar temas específicos y tomar decisiones importantes.
                                </p>
                                <Button
                                    asChild
                                    variant="outline"
                                    className="rounded-full border-accent text-accent-foreground hover:bg-accent hover:text-accent-foreground transition-all"
                                >
                                    <Link href="/asesorias-de-pareja">
                                        Conoce más
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                
            </main>
        </>
    );
}