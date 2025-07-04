import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  const whatsappLink = "https://wa.me/573137415861"

  return (
    <section className="pt-24 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-background text-foreground">
      <div className="container mx-auto px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 -mt-16">
            <div className="inline-block px-4 py-2 bg-secondary text-primary-foreground rounded-full font-medium text-sm mb-2">
              ¿Estás buscando fortalecer tu relación?
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
              <span className="block">Yolanda</span>
              <span className="block bg-gradient-to-r from-primary-foreground to-accent text-transparent bg-clip-text">
                Osorio
              </span>
            </h1>

            <div className="flex items-center gap-6 pt-6 border-t border-border">
              <div className="w-36 h-36 relative flex-shrink-0">
                <Image
                  src="/images/revolucion-en-pareja-logo.png"
                  alt="Revolución en Pareja"
                  width={144}
                  height={144}
                  className="w-full h-auto"
                />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-2">Terapia de Pareja Medellín</h2>
                <p className="text-muted-foreground">
                  «He visto muchas parejas al borde de rendirse… y también he sido testigo de nuevas formas de amarse.»

                </p>
              </div>
            </div>

            <div className="pt-4">
              <Button
                asChild
                className="bg-gradient-to-r from-primary-foreground to-accent text-white hover:opacity-90 rounded-full px-8 py-6 text-lg shadow-md hover:shadow-lg transition-all"
              >
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  Descubre cómo
                </a>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-accent opacity-30 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-secondary opacity-30 rounded-full blur-3xl"></div>
            <div className="relative bg-card rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="/images/yolanda-osorio.jpg"
                alt="Yolanda Osorio - Terapeuta de Pareja"
                width={500}
                height={600}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
