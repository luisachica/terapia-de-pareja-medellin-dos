"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import WhatsappFloating from "@/components/WhatsappFloating"

export default function AsesoriasDePareja() {
    const whatsappLink = "https://wa.me/573137415861"

    return (
        <main className="min-h-screen bg-background text-foreground">
            {/* Hero */}
            <div className="relative w-full bg-secondary">
                <div className="container mx-auto px-8 py-20 flex flex-col md:flex-row items-center gap-12">
                    <div className="w-full md:w-[60%]">
                        <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                            Asesorías de pareja
                        </h1>
                        <p className="text-foreground/90 text-xl max-w-xl font-bold">
                            ¿Necesitan claridad en un momento difícil de su relación?
                        </p>
                        <p className="text-foreground/90 text-xl max-w-xl mt-4">
                            Hay momentos en los que no hace falta comenzar un proceso terapéutico largo, sino simplemente contar con un espacio puntual para hablar, comprender y tomar decisiones con mayor serenidad.
                        </p>
                        <p className="text-foreground/90 text-xl max-w-xl mt-4">
                            Las asesorías de pareja están diseñadas para abordar temas específicos que les generan duda, malestar o desconexión.
                        </p>
                        <p className="text-foreground/90 text-xl max-w-xl mt-4">
                            Ya sea una conversación pendiente, una diferencia que no logran resolver, o una decisión importante que deben tomar juntos, este espacio les permitirá encontrar guía profesional desde el respeto y la neutralidad.
                        </p>
                        <p className="text-foreground/90 text-xl max-w-xl mt-4">
                            A veces, una sola conversación con enfoque terapéutico puede marcar la diferencia.
                            Este es un espacio seguro, sin juicios, donde podrán verse, escucharse y clarificar el camino a seguir.
                        </p>

                        <div className="pt-6">
                            <Button
                                asChild
                                className="bg-gradient-to-r from-primary-foreground to-accent text-white hover:opacity-90 rounded-full px-8 py-6 text-lg shadow-md hover:shadow-lg transition-all"
                            >
                                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                                Reserva una asesoría
                                </a>
                            </Button>
                        </div>

                    </div>

                    <div className="w-full md:w-[40%]">
                        <div className="rounded-3xl overflow-hidden border border-border shadow-xl aspect-[3/4] bg-muted">
                            <Image
                                src="/images/pareja-feliz-en-la-playa.jpg" // reemplaza con la imagen real
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
                            Una guía profesional en momentos clave
                        </h2>

                        <ol className="relative border-l-4 border-muted space-y-12 pl-6">
                            <li>
                                <h3 className="text-xl font-semibold text-foreground mb-1">1. Un momento para detenerse</h3>
                                <p className="text-muted-foreground text-lg">
                                    No siempre es necesario un proceso terapéutico largo. A veces, solo se necesita un espacio profesional y seguro para abordar un tema puntual.
                                </p>
                            </li>
                            <li>
                                <h3 className="text-xl font-semibold text-primary-foreground mb-1">2. Comunicación bloqueada</h3>
                                <p className="text-muted-foreground text-lg">
                                    💬 Problemas de comunicación que generan malentendidos y distancia emocional.
                                </p>
                            </li>
                            <li>
                                <h3 className="text-xl font-semibold text-primary-foreground mb-1">3. Decisiones importantes</h3>
                                <p className="text-muted-foreground text-lg">
                                    💬 Dudas sobre decisiones que afectan a ambos, como mudarse, comprometerse o separarse.
                                </p>
                            </li>
                            <li>
                                <h3 className="text-xl font-semibold text-primary-foreground mb-1">4. Conflictos recientes</h3>
                                <p className="text-muted-foreground text-lg">
                                    💬 Situaciones recientes que han generado tensión y no han sido resueltas de forma saludable.
                                </p>
                            </li>
                            <li>
                                <h3 className="text-xl font-semibold text-primary-foreground mb-1">5. Crianza y futuro</h3>
                                <p className="text-muted-foreground text-lg">
                                    💬 Diferencias en la crianza o dudas sobre el rumbo que tomará la relación.
                                </p>
                            </li>
                            <li>
                                <h3 className="text-xl font-semibold text-accent-foreground mb-1">6. Una mirada profesional y sin juicio</h3>
                                <p className="text-muted-foreground text-lg">
                                    La asesoría es una oportunidad para encontrar claridad, contención y guía concreta desde el respeto mutuo.
                                </p>
                            </li>
                        </ol>
                    </div>

                    <div className="rounded-3xl overflow-hidden shadow-2xl transform md:translate-x-10 p-4 bg-primary">
                        <Image
                            src="/images/pareja-mujeres-feliz.jpg"
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
                                Reserva una asesoría
                            </a>
                        </Button>
                    </div>

                </div>
            </div>
            <WhatsappFloating />
        </main>
    )
}
