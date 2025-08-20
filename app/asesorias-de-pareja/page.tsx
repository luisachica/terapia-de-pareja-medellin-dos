import type { Metadata } from 'next';
import AsesoriasPageClient from "./asesorias-client"; // Importa el componente de cliente
import { generateMetadata } from "@/lib/config";

// Metadatos para el <head> que Next.js usará automáticamente
export const metadata: Metadata = generateMetadata({
  title: "Asesorías de pareja en Medellín | Orientación profesional",
  description: "Asesorías puntuales para parejas que necesitan claridad y guía profesional para abordar temas específicos, tomar decisiones o resolver conflictos.",
  path: "/asesorias-de-pareja"
});

// Renderiza el componente de cliente que contiene todo el diseño
export default function AsesoriasDePareja() {
  return <AsesoriasPageClient />;
}