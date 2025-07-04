import Image from "next/image"
import { Heart, Brain, Sparkles, HeartIcon } from "lucide-react"

export default function DificultadesSection() {
  return (
    <section className="py-24 bg-background text-foreground ">
      <div className="container mx-auto px-8">
        <div className="space-y-20">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              ¿Estás pasando por dificultades en tu relación?
            </h2>
            <p className="text-muted-foreground">
              Tu relación merece autenticidad conexión, evolución y ¿por qué no? otra oportunidad
            </p>
          </div>

          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row">
            {/* Columna de texto: 70% en desktop */}
            <div className="w-full lg:w-[60%] px-12 py-16 flex gap-8 items-start">
              <div className="aspect-square w-20 rounded-xl bg-gradient-to-br from-pink-500 to-pink-400 p-3 flex items-center justify-center shadow-md">
                <Heart className="w-full h-full stroke-[2.5] text-white" aria-hidden="true" />
              </div>


              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-4">Problemas de pareja</h3>
                <p className="text-slate-600 mb-3">
                  <strong className="text-pink-500">¿Sientes que la conexión con tu pareja se ha debilitado?</strong>{" "}
                  Los problemas de comunicación son una de las principales causas de conflictos en las relaciones.
                  Cuando la comunicación entre ustedes se vuelve difícil, pueden aparecer malentendidos, discusiones
                  frecuentes y distanciamiento.
                </p>
              </div>
            </div>

            {/* Columna de imagen: 30% en desktop */}
            <div className="w-full lg:w-[40%] relative min-h-[280px]">
              <Image
                src="/images/problemas-de-pareja.jpg"
                alt="Problemas de pareja"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 1024px) 100vw, 30vw"
              />
            </div>
          </div>

          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row">
            <div className="w-full lg:w-[60%] px-12 py-16 flex gap-8 items-start">
              <div className="aspect-square w-20 rounded-xl bg-gradient-to-br from-sky-500 to-sky-400 p-3 flex items-center justify-center shadow-md">
                <Brain className="w-full h-full stroke-[2.5] text-white" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-4">Depresión y ansiedad</h3>
                <p className="text-slate-600 mb-3">
                  <strong className="text-sky-500">¿Te sientes triste, sin energía o desconectado?</strong>{" "}
                  La depresión puede manifestarse como una sensación constante de tristeza, pérdida de interés en actividades que antes disfrutabas, cambios en el apetito y dificultad para dormir.
                </p>
              </div>
            </div>
            <div className="w-full lg:w-[40%] relative min-h-[280px]">
              <Image
                src="/images/depresion-ansiedad.jpg"
                alt="Depresión y ansiedad"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </div>

          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row">
            <div className="w-full lg:w-[60%] px-12 py-16 flex gap-8 items-start">
              <div className="aspect-square w-20 rounded-xl bg-gradient-to-br from-orange-500 to-orange-400 p-3 flex items-center justify-center shadow-md">
                <Sparkles className="w-full h-full stroke-[2.5] text-white" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-4">Trauma</h3>
                <p className="text-slate-600 mb-3">
                  <strong className="text-orange-500">¿Has vivido experiencias dolorosas que siguen afectándote?</strong>{" "}
                  Las experiencias traumáticas pueden manifestarse de diversas formas y afectar tu vida cotidiana. A través de la terapia, puedes aprender a procesar estas experiencias.
                </p>
              </div>
            </div>
            <div className="w-full lg:w-[40%] relative min-h-[280px]">
              <Image
                src="/images/tratar-traumas-pareja.jpg"
                alt="Trauma"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </div>

          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row">
            <div className="w-full lg:w-[60%] px-12 py-16 flex gap-8 items-start">
              <div className="aspect-square w-20 rounded-xl bg-gradient-to-br from-purple-500 to-purple-400 p-3 flex items-center justify-center shadow-md">
                <HeartIcon className="w-full h-full stroke-[2.5] text-white" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-4">Sexualidad</h3>
                <p className="text-slate-600 mb-3">
                  <strong className="text-purple-500">La sexualidad es una parte importante de la vida.</strong>{" "}
                  Problemas en esta área pueden generar frustración, insatisfacción y conflictos en la pareja. Las dificultades en la comunicación o la falta de deseo sexual pueden provocar ansiedad en la intimidad.
                </p>
              </div>
            </div>
            <div className="w-full lg:w-[40%] relative min-h-[280px]">
              <Image
                src="/images/pareja-feliz-en-su-relacion.jpg"
                alt="Sexualidad"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </div>
        </div>



        <div className="flex justify-center mt-16">
          <div className="w-40 h-40 relative">
            <Image
              src="/images/revolucion-en-pareja-logo.png"
              alt="Revolución en Pareja"
              width={160}
              height={160}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
