"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { MessageSquare, HeartHandshake, Infinity, Flame, Leaf, Sparkles } from "lucide-react"
import WhatsappFloating  from "@/components/WhatsappFloating"

export default function ConsultasPareja() {
  const whatsappLink = "https://wa.me/573137415861"

  return (
    <main className="min-h-screen bg-background text-foreground">
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
              <Button
                asChild
                className="bg-gradient-to-r from-primary-foreground to-accent text-white hover:opacity-90 rounded-full px-8 py-6 text-lg shadow-md hover:shadow-lg transition-all"
              >
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  Reserva un taller
                </a>
              </Button>
            </div>

          </div>

          <div className="w-full md:w-[40%]">
            <div className="rounded-3xl overflow-hidden border border-border shadow-xl aspect-[3/4] bg-muted">
              <Image
                src="/images/pareja-feliz-manos.jpg" // reemplaza con la imagen real
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
                  <MessageSquare className="w-5 h-5 text-accent-foreground mt-1" />
                  <span>Aprender a comunicarse de manera efectiva</span>
                </li>
                <li className="flex items-start gap-3">
                  <HeartHandshake className="w-5 h-5 text-accent-foreground mt-1" />
                  <span>Resolver conflictos desde el respeto mutuo</span>
                </li>
                <li className="flex items-start gap-3">
                  <Infinity className="w-5 h-5 text-accent-foreground mt-1" />
                  <span>Profundizar en la conexión emocional y afectiva</span>
                </li>
                <li className="flex items-start gap-3">
                  <Flame className="w-5 h-5 text-accent-foreground mt-1" />
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
                  <Leaf className="w-5 h-5 text-accent-foreground mt-1" />
                  <span>No necesitan estar en crisis para trabajar en su relación.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-accent-foreground mt-1" />
                  <span>Sólo tener el deseo de amarse mejor, con más consciencia y conexión.</span>
                </li>
              </ul>
            </li>
          </ol>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-2xl transform md:translate-x-10 p-4 bg-primary">
            <Image
              src="/images/pareja-feliz-bombas-colores.jpg"
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
                Reserva un taller
              </a>
            </Button>
          </div>

        </div>
      </div>
      <WhatsappFloating />
    </main>
  )
}
