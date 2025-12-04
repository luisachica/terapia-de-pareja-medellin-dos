import type { Metadata } from "next"
import { Outfit } from "next/font/google"
import "../polyfills.js"
import "./globals.css"
import { Header } from "@/components/header"
import Footer from "../components/Footer"
import WhatsappFloating from "@/components/WhatsappFloating"
import { WebVitals } from "@/components/web-vitals"
import { generateMetadata as generateSiteMetadata } from "@/lib/config"

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" })

export const metadata: Metadata = {
  ...generateSiteMetadata({
    title: "Terapia de Pareja Medellín | Yolanda Osorio",
    description: "Terapia de pareja en Medellín. Te proporcionamos las herramientas y el apoyo necesarios para que tu relación florezca.",
    path: "/"
  }),
  icons: {
    icon: [
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      }
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg'
  }
}



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        {/* Google Search Console Verification Meta Tag */}
        <meta name="google-site-verification" content="68ZW-npy0iSve7KgVoyJVPOE8QPILnfFjjFtagnsP2o" />
      </head>
      <body className={`${outfit.className} bg-background text-foreground`} suppressHydrationWarning={true}>
        <WebVitals />
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsappFloating />
      </body>
    </html>
  )
}
