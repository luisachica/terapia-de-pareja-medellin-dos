"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import WhatsappFloating from "@/components/WhatsappFloating"

export default function ConsultasPareja() {
    const whatsappLink = "https://wa.me/573137415861"

    return (
        <main className="min-h-screen bg-background text-foreground">
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
                            <Button
                                asChild
                                className="bg-gradient-to-r from-primary-foreground to-accent text-white hover:opacity-90 rounded-full px-8 py-6 text-lg shadow-md hover:shadow-lg transition-all"
                            >
                                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                                    Agenda una asesoría
                                </a>
                            </Button>
                        </div>

                    </div>

                    <div className="w-full md:w-[40%]">
                        <div className="rounded-3xl overflow-hidden border border-border shadow-xl aspect-[3/4] bg-muted">
                            <Image
                                src="/images/pareja-feliz-bombas.jpg" // reemplaza con la imagen real
                                alt="Asesoría de pareja"
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
                        {/* Título con color fuerte */}
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
                            src="/images/pareja-feliz-sonriendo.jpg"
                            alt="Asesoria de pareja"
                            width={800}
                            height={533}
                            className="w-full h-auto rounded-2xl"
                            priority
                        />
                    </div>
                    {/* Botón con degradado y color blanco, separado visualmente del texto */}
                    <div className="pt-6 pb-12">
                        <Button
                            asChild
                            className="bg-gradient-to-r from-primary-foreground to-accent text-white hover:opacity-90 rounded-full px-8 py-6 text-lg shadow-md hover:shadow-lg transition-all"
                        >
                            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                                Agenda una asesoría
                            </a>
                        </Button>
                    </div>

                </div>
            </div>
            <WhatsappFloating />
        </main>
    )
}
