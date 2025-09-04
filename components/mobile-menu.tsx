"use client"

import { Menu, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"
import { useState } from "react"

export default function MobileMenu() {
  const [open, setOpen] = useState(false)
  const [subOpen, setSubOpen] = useState(false)

  const whatsappLink = "https://wa.me/573137415861"

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Abrir menú"
          className="text-foreground hover:text-primary"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[90vw] max-w-[350px] bg-background text-foreground p-6"
      >
        <nav className="flex flex-col space-y-6 mt-4">
          <Link
            href="/"
            className="text-foreground hover:text-primary-foreground transition-colors font-medium text-lg py-2 block"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>

          <Link
            href="/sobre-mi"
            className="text-foreground hover:text-primary-foreground transition-colors font-medium text-lg py-2 block"
            onClick={() => setOpen(false)}
          >
            Sobre mí
          </Link>

          <Link
            href="/blog"
            className="text-foreground hover:text-primary-foreground transition-colors font-medium text-lg py-2 block"
            onClick={() => setOpen(false)}
          >
            Blog
          </Link>

          <Link
            href="/preguntas-frecuentes"
            className="text-foreground hover:text-primary-foreground transition-colors font-medium text-lg py-2 block"
            onClick={() => setOpen(false)}
          >
            FAQ
          </Link>

          {/* Submenú tipo acordeón */}
          <div>
            <button
              onClick={() => setSubOpen(!subOpen)}
              className="flex items-center justify-between w-full text-foreground font-medium hover:text-primary-foreground transition-colors text-lg py-2"
            >
              Servicios
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  subOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {subOpen && (
              <div className="ml-4 mt-2 flex flex-col gap-4 text-base text-muted-foreground">
                <Link
                  href="/consultas-de-pareja"
                  onClick={() => {
                    setOpen(false)
                    setSubOpen(false)
                  }}
                  className="hover:text-primary-foreground py-2 block"
                >
                  Consultas de pareja
                </Link>
                <Link
                  href="/asesorias-de-pareja"
                  onClick={() => {
                    setOpen(false)
                    setSubOpen(false)
                  }}
                  className="hover:text-primary-foreground py-2 block"
                >
                  Asesorías de pareja
                </Link>
                <Link
                  href="/talleres-de-pareja"
                  onClick={() => {
                    setOpen(false)
                    setSubOpen(false)
                  }}
                  className="hover:text-primary-foreground py-2 block"
                >
                  Talleres de pareja
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/contacto"
            className="text-foreground hover:text-primary-foreground transition-colors font-medium text-lg py-2 block"
            onClick={() => setOpen(false)}
          >
            Contacto
          </Link>

          {/* Separador visual */}
          <div className="border-t border-border my-4"></div>

          <Button
            asChild
            className="bg-gradient-to-r from-primary-foreground to-accent text-white hover:opacity-90 rounded-full px-8 py-4 text-lg shadow-md hover:shadow-lg transition-all w-full justify-center"
            onClick={() => setOpen(false)}
          >
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              Agenda tu cita
            </a>
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
