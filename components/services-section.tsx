import { Button } from "@/components/ui/button"
import { Calendar, Users, BookOpen } from "lucide-react"

export default function ServicesSection() {
  const whatsappLink = "https://wa.me/573137415861"

  return (
    <section id="servicios" className="py-24 bg-secondary text-foreground">
      <div className="container mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            <span className="bg-gradient-to-r from-primary-foreground to-accent bg-clip-text text-transparent">
              Lo que te puedo brindar
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            ¿Listos para comenzar una nueva etapa juntos?

          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-4 mb-16">
          <Button
            asChild
            className="bg-gradient-to-r from-primary-foreground to-accent text-white hover:opacity-90 rounded-full px-8 py-6 text-lg shadow-md hover:shadow-lg transition-all"
          >
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              Agenda tu cita presencial
            </a>
          </Button>
          <Button
            asChild
            className="bg-card text-foreground hover:bg-muted border border-border rounded-full px-8 py-6 text-lg shadow-md hover:shadow-lg transition-all"
          >
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              Agenda tu cita virtual
            </a>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-background rounded-3xl shadow-lg p-8 hover:shadow-xl transition-all group,">
            <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mb-6 group-hover:bg-muted transition-colors">
              <Users className="w-8 h-8 text-secondary-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-4 ">Asesorias de pareja</h3>
            <p className="text-muted-foreground mb-6">
              Sesiones personalizadas para mejorar la comunicación y resolver conflictos en tu relación.
            </p>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-secondary text-secondary-foreground hover:bg-secondary hover:text-secondary-foreground transition-all"
            >
              <a href="asesorias-de-pareja" target="_blank" rel="noopener noreferrer">
                Conoce más
              </a>
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
              <a href="talleres-de-pareja" target="_blank" rel="noopener noreferrer">
                Conoce más
              </a>
            </Button>
          </div>

          <div className="bg-background rounded-3xl shadow-lg p-8 hover:shadow-xl transition-all group">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-6 group-hover:bg-muted transition-colors">
              <Calendar className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-4">Consultas de pareja</h3>
            <p className="text-muted-foreground mb-6">
              Orientación profesional para situaciones específicas que requieren atención inmediata.
            </p>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all"
            >
              <a href="consultas-de-pareja" target="_blank" rel="noopener noreferrer">
                ¡Conoce más!
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
