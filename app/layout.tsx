import type { Metadata } from "next"
import { Outfit } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import Footer from "../components/Footer"
import WhatsappFloating from "@/components/WhatsappFloating"
import { generateMetadata as generateSiteMetadata } from "@/lib/config"

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" })

export const metadata: Metadata = generateSiteMetadata({
  title: "Terapia de Pareja Medellín | Yolanda Osorio",
  description: "Terapia de pareja en Medellín. Te proporcionamos las herramientas y el apoyo necesarios para que tu relación florezca.",
  path: "/"
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${outfit.className} bg-background text-foreground`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsappFloating />
      </body>
    </html>
  )
}


