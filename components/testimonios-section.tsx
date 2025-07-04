"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const testimonios = [
  {
    id: 1,
    nombre: "Laura y Karlos",
    texto:
      "Fue una experiencia muy cómoda! Nos sentimos capaces de hablar y resolver los conflictos de manera tranquila. Quedamos super satisfechos con lo que aprendimos y aprendimos a ser mejor pareja! Nos sirvió de mucho el acercamiento.",
    color: "accent", // ← lo cambiamos a usar una clase tailwind global
    imagen: "/images/testimonio-laura-carlos.jpg",
  },
  {
    id: 2,
    nombre: "Cristian y Dana",
    texto:
      "Durante el tiempo que hemos trabajado hemos sentido una mejoría en nuestra relación de pareja y de manera individual. Tanto durante de las sesiones individuales como en pareja hemos aprendido a comunicarnos mejor, a experimentar nuestras emociones y transitarlas. Nos hemos sentido en un lugar seguro, en el que no se nos juzga y podemos hablar libremente. Después de las sesiones hemos aprendido a resolver nuestros problemas de manera asertiva",
    color: "primary",
    imagen: "/images/testimonio-cristian-dana.jpg",
  },
  {
    id: 3,
    nombre: "John Edison y Ana Maria",
    texto:
      "Nuestro tiempo en pareja después y durante la terapia ha sido mucho más comprensivo, más amable entre los dos. Pudimos descubrir el poder de la palabra y el silencio, nos dió sabiduría para actuar rápidamente y de la mejor manera para no permitir que las barreras entre los dos crezcan por falta de escucha...",
    color: "secondary",
    imagen: "/images/testimonio-jhon.jpg",
  },
]

export default function TestimoniosSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const getSlidesToShow = () => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 640 ? 1 : 2
    }
    return 2
  }

  const nextTestimonio = useCallback(() => {
    setActiveIndex((current) => (current >= testimonios.length - 1 ? 0 : current + 1))
  }, [])

  const prevTestimonio = useCallback(() => {
    setActiveIndex((current) => (current <= 0 ? testimonios.length - 1 : current - 1))
  }, [])

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        nextTestimonio()
      }, 6000)
      return () => clearInterval(interval)
    }
  }, [isPaused, nextTestimonio])

  const getColorClasses = (color: string) => {
    return {
      bg: `bg-${color}`,
      text: `text-${color}-foreground`,
    }
  }

  return (
    <section className="pt-16 pb-24 bg-secondary">
      <div className="container mx-auto px-8 ">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            <span className="bg-gradient-to-r from-primary-foreground to-accent bg-clip-text text-transparent">
              Pacientes satisfechos
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Crecer y ser feliz en pareja SÍ es posible. Aquí tienes algunos testimonios de personas que han
            pasado por el proceso de terapia de pareja y han encontrado nuevas formas de amarse.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {testimonios.map((testimonio, index) => {
              const slidesToShow = getSlidesToShow()
              const isVisible = index >= activeIndex && index < activeIndex + slidesToShow
              if (!isVisible) return null

              const colorClasses = getColorClasses(testimonio.color)

              return (
                <div key={testimonio.id} className="px-1">
                  <div className="bg-background rounded-3xl p-8 shadow-lg border border-border relative h-full">
                    <div
                      className={cn(
                        "absolute -top-5 -left-5 w-12 h-12 rounded-full flex items-center justify-center",
                        colorClasses.bg,
                      )}
                    >
                      <Quote className={cn("w-6 h-6", colorClasses.text)} />
                    </div>
                   <div className="flex items-center gap-4 mb-6 pt-2">
  {/* Contenedor que fuerza la forma cuadrada y circular */}
  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full shadow-md">
    <Image
      src={testimonio.imagen}
      alt={testimonio.nombre}
      layout="fill"
      objectFit="cover"
    />
  </div>
  <div>
    <h3 className="font-semibold text-foreground">{testimonio.nombre}</h3>
    <p className="text-muted-foreground text-sm">Pareja</p>
  </div>
  <div className="ml-auto flex text-yellow-400">★★★★★</div>
</div>
                    <p className="text-muted-foreground mb-4 italic">"{testimonio.texto}"</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Controles */}
          <button
            onClick={prevTestimonio}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-card rounded-full p-2 shadow-md hover:shadow-lg transition-all z-10"
            aria-label="Testimonio anterior"
          >
            <ChevronLeft className="w-5 h-5 text-muted-foreground" />
          </button>
          <button
            onClick={nextTestimonio}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-card rounded-full p-2 shadow-md hover:shadow-lg transition-all z-10"
            aria-label="Siguiente testimonio"
          >
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>

          {/* Indicadores */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonios.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "h-3 rounded-full transition-all",
                  activeIndex === index
                    ? "bg-gradient-to-r from-primary to-accent w-8"
                    : "bg-border w-3 hover:bg-muted",
                )}
                aria-label={`Ir al testimonio ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
