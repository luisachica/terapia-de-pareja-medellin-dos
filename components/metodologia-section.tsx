import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"

export default function MetodologiaSection() {
  const whatsappLink = "https://wa.me/573137415861"

  return (
    <section className="py-24 bg-background text-foreground">
      <div className="container mx-auto px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">
              <span className="bg-primary-foreground text-transparent bg-clip-text">
                Mi metodología
              </span>{" "}
              se basa en 4 niveles
            </h2>
            <p className="text-muted-foreground mb-6">
              Todo el proceso se{" "}
              <strong className="text-accent-foreground">
                adapta a las necesidades específicas de cada pareja
              </strong>, incluyendo de acuerdo con sus desafíos y objetivos. Además, se complementa con herramientas y ejercicios
              implementados individualmente y de la pareja.
            </p>
            <p className="text-muted-foreground mb-6">
              Para ello se trabajan en los siguientes niveles:
            </p>
            <div className="mt-8">
              <Button
                asChild
                className="bg-gradient-to-r from-primary-foreground to-accent text-white hover:opacity-90 rounded-full px-8 py-6 text-lg shadow-md hover:shadow-lg transition-all"
              >
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  Conoce más
                </a>
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {/* Nivel 1 */}
            <div className="bg-card p-6 rounded-2xl shadow-lg border border-border hover:shadow-xl transition-all">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-accent-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  1. Evaluación inicial
                </h3>
              </div>
            </div>

            {/* Nivel 2 */}
            <div className="bg-card p-6 rounded-2xl shadow-lg border border-border hover:shadow-xl transition-all">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  2. Comunicación, conflictos
                </h3>
              </div>
            </div>

            {/* Nivel 3 */}
            <div className="bg-card p-6 rounded-2xl shadow-lg border border-border hover:shadow-xl transition-all">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-secondary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  3. Intimidad, sexualidad, apego
                </h3>
              </div>
            </div>

            {/* Nivel 4 */}
            <div className="bg-card p-6 rounded-2xl shadow-lg border border-border hover:shadow-xl transition-all">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  4. Proyección, acuerdos y expectativas
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
