"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { PhoneIcon, MapPinIcon, MessageCircle, Instagram, Mail, ArrowRight } from "lucide-react"

export default function Contacto() {
  const whatsappLink = "https://wa.me/573137415861"
  const whatsappNumber = "+57 313 7415861"
  const email = "yolioshe97@gmail.com"
  const instagramUser = "@sinapser"
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <div className="relative w-full bg-secondary">
        <div className="container mx-auto px-8 py-20 flex flex-col md:flex-row items-center gap-12">
          {/* Columna izquierda: texto */}
          <div className="w-full md:w-[60%]">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Contáctatame
            </h1>
            <p className="text-foreground/90 text-xl max-w-xl">
              ¿Quieres agendar una cita o tienes alguna pregunta? Estoy aquí para ayudarte.
            </p>
          </div>

          {/* Columna derecha: imagen */}
          <div className="w-full md:w-[40%]">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-border aspect-[1/1] bg-muted">
              <Image
                src="/images/contacto-yolanda.png"
                alt="Contacto hero"
                width={600}
                height={750}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>


      {/* Fondo decorativo */}
      <div className="absolute top-[400px] right-0 w-64 h-64 bg-muted rounded-full opacity-20 blur-3xl -z-10" />
      <div className="absolute top-[700px] left-0 w-96 h-96 bg-muted rounded-full opacity-20 blur-3xl -z-10" />

      {/* Contenido principal */}
      <div className="container mx-auto py-20 px-4 md:px-8 relative">
        <div className={`text-center mb-16 transition-all duration-700 delay-300 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-primary-foreground">Diferentes formas</span> de contactarme
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Elige la opción que te resulte más cómoda para comunicarte conmigo.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {/* WhatsApp */}
          <div className={`bg-card rounded-3xl p-8 shadow-xl border border-border h-full transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 delay-100 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground shadow-md">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-semibold">Escríbeme a WhatsApp</h2>
            </div>
            <div className="border-b border-border w-full mb-6" />
            <ul className="space-y-4 mb-8 text-muted-foreground">
              <li>• ¿Tienes alguna pregunta? ¡Escríbenos!</li>
              <li>• ¡Agenda tu cita!</li>
              <li>• ¿Necesitas ayuda? ¡WhatsAppea ahora!</li>
            </ul>
            <Button asChild className="bg-gradient-to-r from-primary-foreground to-accent text-white hover:opacity-90 rounded-full px-8 py-6 text-lg shadow-md hover:shadow-lg transition-all">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5 mr-2" />
                Contáctame
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
          {/* Dirección */}
          <div className={`bg-card rounded-3xl p-8 shadow-xl border border-border h-full transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 delay-200 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-secondary-foreground shadow-md">
                <MapPinIcon className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-semibold">Dirección del consultorio</h2>
            </div>
            <div className="border-b border-border w-full mb-6" />
            <div className="rounded-xl overflow-hidden mb-8 h-64 relative shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.645612847551!2d-75.59324002417458!3d6.244193193754308!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e4428dfb80d7cbf%3A0x42137cfcc7b5e610!2sCra.%2073%20%2345f23%20a%2045f%2C%20Laureles%20-%20Estadio%2C%20Medell%C3%ADn%2C%20Antioquia!5e0!3m2!1ses!2sco!4v1716485400000!5m2!1ses!2sco"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-xl"
                title="Ubicación del consultorio"
              />

            </div>
            <div className="space-y-4 text-muted-foreground">
              <div className="flex items-start gap-3">
                <MapPinIcon className="w-5 h-5 text-secondary-foreground flex-shrink-0 mt-1" />
                <span className="font-medium">Cra. 73 #45f23 a 45f, Laureles - Medellín</span>
              </div>
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border">
                <Instagram className="w-5 h-5 text-secondary-foreground" />
                <span className="font-medium">{instagramUser}</span>
              </div>
            </div>
          </div>

          {/* Teléfono */}
          <div className={`bg-card rounded-3xl p-8 shadow-xl border border-border h-full transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 delay-300 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center text-foreground shadow-md">
                <PhoneIcon className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-semibold">Mi número de teléfono</h2>
            </div>
            <div className="border-b border-border w-full mb-6" />
            <ul className="space-y-4 mb-8 text-muted-foreground">
              <li>• ¿Prefieres llamarnos?</li>
              <li>• Atención personalizada por teléfono</li>
              <li>• Estamos para escucharte.</li>
            </ul>
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center shadow-md">
                <PhoneIcon className="w-10 h-10 text-foreground" />
              </div>
            </div>
            <a href={`tel:${whatsappNumber.replace(/\s+/g, "")}`} className="block text-center text-2xl font-bold hover:text-primary transition-colors">
              {whatsappNumber}
            </a>
          </div>
        </div>

        {/* Correo y cita */}
        <div className={`mt-20 rounded-3xl overflow-hidden bg-primary text-foreground p-12 transition-all duration-700 delay-400 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-card flex items-center justify-center text-foreground">
                  <Mail className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-semibold">Mi correo electrónico:</h2>
              </div>
              <a href={`mailto:${email}`} className="text-2xl hover:underline font-medium ml-14">
                {email}
              </a>
            </div>
            <blockquote className="text-xl italic relative pl-6 border-l-4 border-border">
              «Volver a sentir, entenderse y elegir(se) es posible.»

            </blockquote>
          </div>
        </div>

        {/* Horarios */}
        <div className={`mt-20 transition-all duration-700 delay-500 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
          <div className="max-w-4xl mx-auto bg-card rounded-3xl p-8 shadow-xl border border-border">
            <h2 className="text-2xl font-semibold mb-6 text-center">Horarios de atención</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-medium mb-4 flex items-center">
                  <span className="w-3 h-3 bg-accent rounded-full mr-2"></span>
                  Consultas presenciales
                </h3>
                <ul className="space-y-2 text-muted-foreground ml-5">
                  <li className="flex justify-between">
                    <span>Lunes a Viernes:</span>
                    <span className="font-medium">8:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sábados:</span>
                    <span className="font-medium">9:00 AM - 1:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Domingos:</span>
                    <span className="font-medium">Cerrado</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-4 flex items-center">
                  <span className="w-3 h-3 bg-muted rounded-full mr-2"></span>
                  Consultas virtuales
                </h3>
                <ul className="space-y-2 text-muted-foreground ml-5">
                  <li className="flex justify-between">
                    <span>Lunes a Viernes:</span>
                    <span className="font-medium">7:00 AM - 8:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sábados:</span>
                    <span className="font-medium">9:00 AM - 3:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Domingos:</span>
                    <span className="font-medium">Previa cita</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Formulario */}
        <div className={`mt-20 transition-all duration-700 delay-600 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
          <h2 className="text-3xl font-bold mb-10 text-center">
            Envíame un <span className="text-primary-foreground">mensaje</span>
          </h2>
          <div className="max-w-2xl mx-auto bg-card rounded-3xl p-10 shadow-xl border border-border">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium mb-2">
                    Nombre
                  </label>
                  <Input id="nombre" placeholder="Tu nombre" className="rounded-xl py-6" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="Tu email" className="rounded-xl py-6" />
                </div>
              </div>
              <div>
                <label htmlFor="asunto" className="block text-sm font-medium mb-2">
                  Asunto
                </label>
                <Input id="asunto" placeholder="Asunto del mensaje" className="rounded-xl py-6" />
              </div>
              <div>
                <label htmlFor="mensaje" className="block text-sm font-medium mb-2">
                  Mensaje
                </label>
                <Textarea id="mensaje" placeholder="Tu mensaje" rows={5} className="rounded-xl" />
              </div>
              <Button asChild className="w-full bg-gradient-to-r from-primary-foreground to-accent text-white rounded-full py-6 mt-4 shadow-md hover:shadow-lg transition-all">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  Enviar Mensaje
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
