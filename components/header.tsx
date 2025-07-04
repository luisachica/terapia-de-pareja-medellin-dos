"use client"

import Link from "next/link"
import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import MobileMenu from "@/components/mobile-menu"

const whatsappLink = "https://wa.me/573137415861"

export function Header() {
    return (
        <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border shadow-sm">
            <div className="container mx-auto py-6 px-8">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center mr-4">
                        <div className="font-bold flex items-center text-foreground">
                            <span className="text-2xl md:text-3xl mr-2 bg-gradient-to-r from-primary-foreground to-accent text-transparent bg-clip-text">YO</span>
                            <span className="text-sm md:text-lg leading-tight">
                                YOLANDA
                                <br />
                                OSORIO
                            </span>
                        </div>
                    </Link>


                    {/* Navegación desktop */}
                    <nav className="hidden md:flex items-center space-x-12">
                        <Link
                            href="/"
                            className="text-foreground hover:text-primary-foreground transition-colors font-medium"
                        >
                            Home
                        </Link>
                        <div className="relative group">
                            <div className="flex items-center gap-1 text-foreground hover:text-primary-foreground transition-colors font-medium cursor-pointer">
                                Servicios
                                <svg
                                    className="w-4 h-4 transform group-hover:rotate-180 transition-transform"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>

                            {/* Contenedor con padding para evitar cierre rápido */}
                            <div className="absolute top-full left-0 pt-4 z-50">
                                <div className="bg-white border border-border rounded-xl shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-300 w-64"
                                    onMouseEnter={(e) => e.currentTarget.classList.add("pointer-events-auto")}
                                    onMouseLeave={(e) => e.currentTarget.classList.remove("pointer-events-auto")}>
                                    <ul className="py-2">
                                        <li>
                                            <Link
                                                href="/consultas-de-pareja"
                                                className="block px-5 py-3 text-sm text-foreground hover:bg-primary hover:text-white transition-colors"
                                            >
                                                Consultas de pareja
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/asesorias-de-pareja"
                                                className="block px-5 py-3 text-sm text-foreground hover:bg-primary hover:text-white transition-colors"
                                            >
                                                Asesorías de pareja
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/talleres-de-pareja"
                                                className="block px-5 py-3 text-sm text-foreground hover:bg-primary hover:text-white transition-colors"
                                            >
                                                Talleres de pareja
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <Link
                            href="/sobre-mi"
                            className="text-foreground hover:text-primary-foreground transition-colors font-medium"
                        >
                            Sobre mí
                        </Link>
                        <Link
                            href="/contacto"
                            className="text-foreground hover:text-primary-foreground transition-colors font-medium"
                        >
                            Contacto
                        </Link>
                    </nav>

                    {/* Acciones */}
                    <div className="flex items-center gap-x-3 md:gap-x-4">
                        {/* WhatsApp icon */}
                        <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary-foreground transition-colors"
                            aria-label="WhatsApp"
                        >
                            <MessageCircle className="w-6 h-6" />
                        </a>

                        {/* CTA botón */}
                        <Button
                            asChild
                            className="bg-gradient-to-r from-primary-foreground to-accent text-white hover:opacity-90 rounded-full px-8 py-6 text-lg shadow-md hover:shadow-lg transition-all"
                        >
                            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                                Agenda tu cita
                            </a>
                        </Button>

                        {/* Mobile menu */}
                        <div className="md:hidden">
                            <MobileMenu />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
