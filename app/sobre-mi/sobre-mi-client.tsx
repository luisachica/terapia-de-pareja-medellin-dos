"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, Users, Calendar, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"
import StructuredData from "@/components/StructuredData";

import BreadcrumbNavigation from "@/components/BreadcrumbNavigation";

// Datos Estructurados para la página "Sobre Mí"
const personData = {
    "@context": "https://schema.org",
    "@type": "Psychologist",
    "name": "Yolanda Osorio",
    "image": "https://www.terapiaparejamedellin.com/images/terapia-de-pareja-medellin-yolanda.webp",
    "jobTitle": "Psicóloga y Terapeuta de Pareja",
    "description": "Psicóloga especializada en Terapia de Pareja, Sexualidad y Trauma. Mi enfoque se basa en herramientas terapéuticas con evidencia para comprender conflictos, sanar heridas y desarrollar habilidades de comunicación efectivas.",
    "address": {
        "@type": "PostalAddress",
        "addressLocality": "Medellín",
        "addressRegion": "Antioquia",
        "addressCountry": "CO"
    },
    "alumniOf": [
        "Universidad Católica de Oriente",
        "Instituto Europeo de Formación y Consultoría",
        "Centro Gestáltico de Medellín"
    ],
    "knowsAbout": [
        "Terapia de Pareja",
        "Sexología",
        "Trauma Psicológico",
        "Método Gottman",
        "Terapia Focalizada en Emociones (TFE)"
    ]
};

export default function SobreMiPageClient() {
    const whatsappLink: string = "https://wa.me/573137415861";

    return (
        <>
            <StructuredData data={personData} />

            <main className="min-h-screen bg-background text-foreground">
                {/* Breadcrumbs */}
                <div className="container mx-auto px-4 pt-4">
                    <BreadcrumbNavigation className="mb-4" />
                </div>
                {/* Hero Section */}
                <div className="relative w-full bg-secondary">
                    <div className="container mx-auto px-8 py-20 flex flex-col md:flex-row items-center gap-12">
                        <div className="w-full md:w-[60%]">
                            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                                Conoce un poco más sobre mí
                            </h1>
                            <p className="text-foreground/90 text-xl max-w-xl">
                                «He acompañado a muchas parejas que estaban a punto de rendirse… y las he visto volver a mirarse con amor, desde un lugar más real y profundo»
                            </p>
                        </div>
                        <div className="w-full md:w-[40%]">
                            <div className="rounded-3xl overflow-hidden shadow-2xl border border-border aspect-[1/1] bg-muted">
                                <Image
                                    src="/images/sobre-mi.webp"
                                    alt="Yolanda Osorio, psicóloga especialista en terapia de pareja en Medellín"
                                    width={600}
                                    height={750}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contenido Principal */}
                <div className="container mx-auto py-16 px-4 md:px-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-12 leading-tight py-6">
                        Soy psicóloga profesional con énfasis en{" "}
                        <span className="bg-primary-foreground text-transparent bg-clip-text block mt-2">
                            Terapia de Pareja, Sexualidad y Trauma
                        </span>
                    </h1>
                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        <div className="space-y-6">
                            <div className="bg-card rounded-3xl p-8 shadow-lg border border-border">
                                <h2 className="text-2xl font-semibold text-foreground mb-4">Mi enfoque terapéutico</h2>
                                <p className="text-muted-foreground mb-4">
                                    <strong className="text-primary-foreground">
                                        Como psicóloga especializada en terapia de pareja y trauma, mi objetivo es acompañarte a ti y a tu pareja en la construcción de una relación más sana y satisfactoria.
                                    </strong>
                                </p>
                                <p className="text-muted-foreground mb-4">
                                    A través de herramientas terapéuticas basadas en la evidencia, te ayudaré a comprender las raíces de los conflictos, a sanar heridas del pasado y a desarrollar habilidades de comunicación y resolución de problemas más efectivas.
                                </p>
                                <p className="text-muted-foreground mb-4">
                                    Si han experimentado un trauma individual o de pareja, te guiaré en un proceso de sanación que les permita fortalecer su vínculo y superar juntos los desafíos.
                                </p>
                            </div>
                            <div className="bg-card rounded-3xl p-8 shadow-lg border border-border">
                                <h2 className="text-2xl font-semibold text-foreground mb-4">Mi formación académica</h2>
                                <ul className="space-y-3 text-muted-foreground">
                                    {[
                                        "Psicóloga Universidad Católica de Oriente",
                                        "Master en Sexología y Terapia de Pareja. Instituto Europeo de Formación y Consultoría",
                                        "Diplomada en Sexualidad Mirada Integral con Perspectiva de Género. CEPI",
                                        "Diplomada en Sexualidad Y Pareja, Mirada Integral. CEPI",
                                        "Diplomada en Psicología Clínica Humanista-Existencial. Parinama",
                                        "Diplomada en Perspectivas y Comprensiones Clínicas. Parinama",
                                        "Diplomada en Cuerpo y Psicoterapia. Parinama",
                                        "Entrenada en Método Gottman de Terapia de Pareja nivel I",
                                        "Seminario Psicoterapia de Pareja. Parinama",
                                        "Diplomada en Psicología Clínica de la Sexualidad. Líderes Latinoamérica",
                                        "Diplomatura en Estrategias de Intervención en Trauma. Centro Gestáltico de Medellín",
                                        "Core Skills (Entrenamiento 1,2,3 y 4) Terapia de Pareja Focalizada en Emociones)",
                                        "Entrenamiento de Terapia Focalizada en Emociones Individual (EFIT Essentials)",
                                        "Master Class de la infidelidad al perdón- Entrenamiento TFE Argentina",
                                        "La infidelidad y su trauma en comunidades Latinas"

                                    ].map((texto, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <CheckCircle2 className="w-5 h-5 text-accent-foreground mt-0.5 flex-shrink-0" />
                                            <span>{texto}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-card rounded-3xl p-8 shadow-lg border border-border">
                                <Image
                                    src="/images/pareja-feliz-terapia-yolanda.webp"
                                    alt="Pareja sonriente en sesión de terapia exitosa con psicóloga especializada"
                                    width={800}
                                    height={600}
                                    className="w-full h-auto rounded-xl"
                                />
                            </div>
                            <div className="pt-4">
                                <Button asChild className="bg-gradient-to-r from-primary-foreground to-accent text-white hover:opacity-90 rounded-full px-8 py-6 text-lg shadow-md hover:shadow-lg transition-all">
                                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                                        Contáctame
                                    </a>
                                </Button>
                            </div>
                        </div>
                        <div className="space-y-8">
                            <div className="bg-card rounded-3xl p-8 shadow-lg border border-border text-center">
                                <div className="w-40 h-40 mx-auto relative mb-6">
                                    <Image
                                        src="/images/terapia-de-pareja-medellin-yolanda.webp"
                                        alt="Yolanda Osorio, psicóloga clínica especializada en terapia de pareja"
                                        layout="fill"
                                        className="rounded-full object-cover"
                                    />
                                </div>
                                <h2 className="text-2xl font-semibold text-foreground mb-2">Yolanda Osorio</h2>
                                <p className="text-xl text-primary-foreground mb-6">Psicóloga y Terapeuta</p>
                                <p className="text-muted-foreground italic">
                                    «Tu relación merece autenticidad, conexión, evolución y ¿por qué no? otra oportunidad»
                                </p>
                                <div className="mt-8 flex justify-center">
                                    <Image
                                        src="/images/revolucion-en-pareja-logo.png"
                                        alt="Logo profesional de terapia de pareja Revolución en Pareja"
                                        width={100}
                                        height={100}
                                        className="w-30 h-auto"
                                    />
                                </div>
                            </div>
                            <div className="bg-card rounded-3xl p-8 shadow-lg border border-border">
                                <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">
                                    Mi enfoque terapéutico: Terapia de Pareja Focalizada en Emociones{" "}
                                    <span className="bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">
                                        (EFT)

                                    </span>
                                </h2>

                                <Tabs defaultValue="etapa1" className="w-full">
                                    <TabsList className="grid grid-cols-3 mb-8 bg-muted text-foreground">

                                        {["etapa1", "etapa2", "etapa3"].map((etapa, index) => (

                                            <TabsTrigger

                                                key={etapa}

                                                value={etapa}

                                                className={cn(

                                                    "data-[state=active]:bg-accent data-[state=active]:text-accent-foreground transition-all"

                                                )}

                                            >

                                                Etapa #{index + 1}

                                            </TabsTrigger>

                                        ))}

                                    </TabsList>



                                    <TabsContent value="etapa1" className="space-y-4">

                                        <h3 className="text-xl font-semibold text-foreground">Etapa de Desescalada</h3>

                                        <div className="space-y-4">

                                            <div>

                                                <h4 className="font-medium text-accent-foreground mb-2">Comprender el conflicto</h4>

                                                <p className="text-muted-foreground">

                                                    En esta primera fase, identificamos los patrones negativos que generan distancia, dolor o desconexión.
                                                    Ayudo a cada uno a reconocer las emociones ocultas detrás de la reacción, para que comprendan lo que realmente están sintiendo y necesitando.
                                                    <br />
                                                    <br />
                                                    🔍 El objetivo: dejar de verse como enemigos y empezar a entender el ciclo que los atrapa.
                                                </p>

                                            </div>
                                        </div>
                                    </TabsContent>



                                    <TabsContent value="etapa2" className="space-y-4">

                                        <h3 className="text-xl font-semibold text-foreground">Etapa de Reestructuración</h3>

                                        <div className="space-y-4">

                                            <div>

                                                <h4 className="font-medium text-accent-foreground mb-2">Reconectar desde la emoción</h4>

                                                <p className="text-muted-foreground">

                                                    Aquí aprendemos a expresar las emociones con seguridad y empatía, creando nuevas formas de acercarse y responder al otro.
                                                    La pareja empieza a verse y sentirse de nuevo como aliados, fortaleciendo el vínculo afectivo.
                                                    <br />
                                                    <br />
                                                    💬 El objetivo: construir una comunicación emocionalmente segura.

                                                </p>

                                            </div>



                                        </div>

                                    </TabsContent>



                                    <TabsContent value="etapa3" className="space-y-4">

                                        <h3 className="text-xl font-semibold text-foreground">Etapa de Consolidación</h3>

                                        <div className="space-y-4">

                                            <div>

                                                <h4 className="font-medium text-accent-foreground mb-2">Fortalecer el vínculo y mantener el cambio</h4>

                                                <p className="text-muted-foreground">

                                                    En la última etapa, consolidamos lo aprendido, reforzando la confianza, la intimidad y la unión emocional.
                                                    Las parejas adquieren herramientas para mantener su conexión a lo largo del tiempo.
                                                    <br />
                                                    <br />
                                                    🌱 El objetivo: una relación sólida, consciente y emocionalmente cercana.
                                                </p>
                                            </div>
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sección de servicios */}
                <section className="py-16 bg-secondary">
                    <div className="container mx-auto px-4 sm:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-foreground mb-4">
                                Mis servicios especializados
                            </h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Descubre cómo puedo ayudarte a fortalecer tu relación de pareja
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
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

                            <div className="bg-background rounded-3xl shadow-lg p-8 hover:shadow-xl transition-all group">
                                <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mb-6 group-hover:bg-muted transition-colors">
                                    <BookOpen className="w-8 h-8 text-secondary-foreground" />
                                </div>
                                <h3 className="text-xl font-semibold text-foreground mb-4">Talleres de pareja</h3>
                                <p className="text-muted-foreground mb-6">
                                    Espacios vivenciales para fortalecer la conexión y mejorar la comunicación en pareja.
                                </p>
                                <Button
                                    asChild
                                    variant="outline"
                                    className="rounded-full border-secondary text-secondary-foreground hover:bg-secondary hover:text-secondary-foreground transition-all"
                                >
                                    <Link href="/talleres-de-pareja">
                                        Conoce más
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

            </main >
        </>
    )
}