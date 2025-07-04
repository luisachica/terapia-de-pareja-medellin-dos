"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"


export default function SobreMi() {
  const whatsappLink = "https://wa.me/573137415861"

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <div className="relative w-full bg-secondary">
        <div className="container mx-auto px-8 py-20 flex flex-col md:flex-row items-center gap-12">
          {/* Columna izquierda: texto */}
          <div className="w-full md:w-[60%]">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Conoce un poco más sobre mí, <br />
            </h1>
            <p className="text-foreground/90 text-xl max-w-xl">
               «He acompañado a muchas parejas que estaban a punto de rendirse… y las he visto volver a mirarse con amor, desde un lugar más real y profundo»
            </p>
          </div>

          {/* Columna derecha: imagen */}
          <div className="w-full md:w-[40%]">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-border aspect-[1/1] bg-muted">
              <Image
                src="/images/sobre-mi.jpg"
                alt="Sobre mí - Yolanda Osorio"
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
                  Como psicóloga especializada en terapia de pareja y trauma, mi objetivo es acompañarte a ti y a tu
                  pareja en la construcción de una relación más sana y satisfactoria.
                </strong>
              </p>
              <p className="text-muted-foreground mb-4">
                A través de herramientas terapéuticas basadas en la evidencia, te ayudaré a comprender las raíces de los
                conflictos, a sanar heridas del pasado y a desarrollar habilidades de comunicación y resolución de
                problemas más efectivas.
              </p>
              <p className="text-muted-foreground mb-4">
                Si han experimentado un trauma individual o de pareja, te guiaré en un proceso de sanación que les
                permita fortalecer su vínculo y superar juntos los desafíos.
              </p>
            </div>

            <div className="bg-card rounded-3xl p-8 shadow-lg border border-border">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Mi formación académica</h2>
              <ul className="space-y-3 text-muted-foreground">
                {[
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
                  "Psicóloga Universidad Católica de Oriente",
                  "TFE (Terapia Focalizada en Emociones para parejas) nivel 1 Externship",
                  "TFE (Terapia Focalizada en Emociones para parejas) Nivel 2 Core Skills"

                  
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
                src="/images/pareja-feliz-terapia-yolanda.png"
                alt="Pareja feliz en terapia"
                width={800}
                height={600}
                className="w-full h-auto rounded-xl"
              />
            </div>

            <div className="pt-4">
              <Button
                asChild
                className="bg-gradient-to-r from-primary-foreground to-accent text-white hover:opacity-90 rounded-full px-8 py-6 text-lg shadow-md hover:shadow-lg transition-all"
              >
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
                  src="/images/terapia-de-pareja-medellin-yolanda.jpg"
                  alt="Yolanda Osorio"
                  width={200}
                  height={200}
                  className="rounded-full object-cover"
                />
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">Yolanda Osorio</h2>
              <p className="text-xl text-primary-foreground mb-6">Psicóloga y Terapeuta</p>
              <p className="text-muted-foreground italic">
                «Tu relación merece   autenticidad conexión, evolución y ¿por qué no? otra oportunidad»
              </p>

              <div className="mt-8 flex justify-center">
                <Image
                  src="/images/revolucion-en-pareja-logo.png"
                  alt="Logo Terapia"
                  width={100}
                  height={100}
                  className="w-30 h-auto"
                />
              </div>
            </div>

            <div className="bg-card rounded-3xl p-8 shadow-lg border border-border">
              <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">
                Mi estrategia se basa en{" "}
                <span className="bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">
                  4 niveles
                </span>
              </h2>

              <Tabs defaultValue="nivel1" className="w-full">
                <TabsList className="grid grid-cols-4 mb-8 bg-muted text-foreground">
                  {["nivel1", "nivel2", "nivel3", "nivel4"].map((nivel, index) => (
                    <TabsTrigger
                      key={nivel}
                      value={nivel}
                      className={cn(
                        "data-[state=active]:bg-accent data-[state=active]:text-accent-foreground transition-all"
                      )}
                    >
                      Nivel #{index + 1}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value="nivel1" className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">Evaluación integral</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-accent-foreground mb-2">Reconociendo los obstáculos</h4>
                      <p className="text-muted-foreground">
                        En este nivel, te ayudaré a identificar y comprender las dificultades que enfrentas en tu
                        relación. Desde la comunicación hasta los conflictos no resueltos, exploraremos juntos las
                        barreras que pueden obstaculizar tu conexión emocional.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-accent-foreground mb-2">La importancia de la conciencia</h4>
                      <p className="text-muted-foreground">
                        Descubre cómo la conciencia de las dificultades puede ser el primer paso hacia una relación más
                        sólida.
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="nivel2" className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">Comunicación y confianza</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-accent-foreground mb-2">Comunicación efectiva</h4>
                      <p className="text-muted-foreground">
                        Exploraremos cómo la comunicación abierta y sincera sienta las bases para una relación saludable. Aprenderás técnicas prácticas para expresar tus necesidades y emociones de manera clara y respetuosa.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-accent-foreground mb-2">Confianza y compromiso</h4>
                      <p className="text-muted-foreground">
                        Profundizaremos en la importancia de la confianza y el compromiso mutuo en una pareja. Descubrirás cómo construir y mantener la confianza, así como comprometerte con el crecimiento individual y compartido dentro de la relación.
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="nivel3" className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">Intimidad, sexualidad y apoyo</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-accent-foreground mb-2">Cultivando la intimidad emocional y sexualidad</h4>
                      <p className="text-muted-foreground">
                        Explora cómo la intimidad emocional fortalece los lazos entre tú y tu pareja. Además, cultivar una mirada intima con tu pareja que permita la satisfacción de encuentros sexuales significativos y placenteros
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-accent-foreground mb-2">Apoyo mutuo en los desafíos</h4>
                      <p className="text-muted-foreground">
                        Descubre la importancia de estar presente y apoyarse mutuamente durante los momentos difíciles. Exploraremos cómo trabajar juntos como equipo puede superar obstáculos y fortalecer la relación.
                      </p>
                    </div>
                  </div>
                </TabsContent>



                <TabsContent value="nivel4" className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">Aceptación, autenticidad y expectativas</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-accent-foreground mb-2">Aceptación incondicional</h4>
                      <p className="text-muted-foreground">
                        Aprende a practicar la aceptación incondicional tanto hacia ti mismo como hacia tu pareja. Descubre cómo el amor genuino y la comprensión pueden transformar tu relación.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-accent-foreground mb-2">Vivir con autenticidad</h4>
                      <p className="text-muted-foreground">
                        Exploraremos la importancia de ser auténticos y genuinos en nuestra relación. Descubre cómo honrar tus verdaderos seres puede crear un espacio para la conexión y la intimidad verdadera.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium text-accent-foreground mb-2">Manejo de expectativas</h4>
                      <p className="text-muted-foreground">
                        Aprende a manejar de manera saludable las expectativas en tu relación. Descubre cómo comunicar tus necesidades y expectativas de manera clara y realista puede evitar conflictos y fomentar la satisfacción mutua. <br /> <span className="block h-4" />
                        En nuestra página de Terapia de Pareja, te invitamos a explorar estos elementos fundamentales para construir una relación sólida y satisfactoria. <br /> <span className="block h-4" /> Ya sea que estés enfrentando dificultades o simplemente buscando fortalecer tu conexión, estamos aquí para guiarte en tu viaje hacia la autenticidad, la aceptación y la felicidad compartida. <br /> <span className="block h-4" /> Juntos, podemos superar los desafíos y construir una relación que perdure en el tiempo
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
