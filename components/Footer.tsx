// components/Footer.tsx

'use client';

import Link from "next/link";
import { MessageCircle } from "lucide-react";

const whatsappLink = "https://wa.me/573001112233"; // O pásalo como prop si cambia dinámicamente

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-slate-50 to-sky-50 py-20">
      <div className="container mx-auto px-8">
        <div className="flex justify-center mb-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="text-slate-800 font-bold flex items-center">
                <span className="text-3xl mr-2 bg-gradient-to-r from-pink-500 to-orange-400 text-transparent bg-clip-text">
                  YO
                </span>
                <span className="text-lg">
                  YOLANDA
                  <br />
                  OSORIO
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-12 mb-10">
          <Link href="/" className="text-slate-700 hover:text-pink-500 transition-colors font-medium">
            Home
          </Link>
          <Link href="/sobre-mi" className="text-slate-700 hover:text-pink-500 transition-colors font-medium">
            Sobre mí
          </Link>
          <Link href="/contacto" className="text-slate-700 hover:text-pink-500 transition-colors font-medium">
            Contacto
          </Link>
        </div>

        <div className="border-t border-slate-200 mt-8 pt-8 text-center text-slate-600">
          <p>© {new Date().getFullYear()} Terapia de Pareja Medellín. Todos los derechos reservados.</p>
          <div className="flex justify-center mt-4">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:text-green-700 transition-colors bg-white p-3 rounded-full shadow-sm"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
